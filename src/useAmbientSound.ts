import { useCallback, useEffect, useRef, useState } from 'react';

type AmbientNodes = {
  context: AudioContext;
  master: GainNode;
  musicBus: GainNode;
  airBus: GainNode;
  sources: AudioScheduledSourceNode[];
};

const TARGET_MASTER_GAIN = 0.24;

export function useAmbientSound() {
  const [enabled, setEnabled] = useState(false);
  const [supported] = useState(() => typeof window !== 'undefined' && ('AudioContext' in window || 'webkitAudioContext' in window));
  const nodesRef = useRef<AmbientNodes | null>(null);

  const buildSoundscape = useCallback(() => {
    const AudioContextCtor = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) return null;

    const context = new AudioContextCtor();
    const master = context.createGain();
    master.gain.setValueAtTime(0.0001, context.currentTime);
    master.connect(context.destination);

    const musicBus = context.createGain();
    musicBus.gain.value = 0.27;
    musicBus.connect(master);

    const airBus = context.createGain();
    airBus.gain.value = 0.075;
    airBus.connect(master);

    const sources: AudioScheduledSourceNode[] = [];
    const frequencies = [130.81, 196.0, 261.63, 329.63, 440.0];

    frequencies.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const filter = context.createBiquadFilter();
      oscillator.type = index % 3 === 1 ? 'triangle' : 'sine';
      oscillator.frequency.value = frequency;
      oscillator.detune.value = [-7, 3, -3, 5, -5][index] ?? 0;
      filter.type = 'lowpass';
      filter.frequency.value = 920 + index * 180;
      filter.Q.value = 0.2;
      gain.gain.value = index === 0 ? 0.23 : index < 3 ? 0.145 : 0.072;
      oscillator.connect(filter);
      filter.connect(gain);
      gain.connect(musicBus);
      oscillator.start();
      sources.push(oscillator);
    });

    const duration = 6;
    const frameCount = Math.floor(context.sampleRate * duration);
    const buffer = context.createBuffer(1, frameCount, context.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < frameCount; i += 1) {
      const white = Math.random() * 2 - 1;
      last = last * 0.993 + white * 0.007;
      data[i] = last * 0.45;
    }

    const air = context.createBufferSource();
    air.buffer = buffer;
    air.loop = true;
    const airFilter = context.createBiquadFilter();
    airFilter.type = 'bandpass';
    airFilter.frequency.value = 760;
    airFilter.Q.value = 0.26;
    air.connect(airFilter);
    airFilter.connect(airBus);
    air.start();
    sources.push(air);

    const lfo = context.createOscillator();
    const lfoGain = context.createGain();
    lfo.type = 'sine';
    lfo.frequency.value = 0.043;
    lfoGain.gain.value = 0.032;
    lfo.connect(lfoGain);
    lfoGain.connect(musicBus.gain);
    lfo.start();
    sources.push(lfo);

    const airLfo = context.createOscillator();
    const airLfoGain = context.createGain();
    airLfo.type = 'sine';
    airLfo.frequency.value = 0.026;
    airLfoGain.gain.value = 0.014;
    airLfo.connect(airLfoGain);
    airLfoGain.connect(airBus.gain);
    airLfo.start();
    sources.push(airLfo);

    const nodes = { context, master, musicBus, airBus, sources };
    nodesRef.current = nodes;
    return nodes;
  }, []);

  const playActivationTone = useCallback((context: AudioContext, destination: AudioNode) => {
    const now = context.currentTime;
    [523.25, 659.25, 783.99].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, now + index * 0.055);
      gain.gain.exponentialRampToValueAtTime(0.055, now + 0.04 + index * 0.055);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.72 + index * 0.07);
      oscillator.connect(gain);
      gain.connect(destination);
      oscillator.start(now + index * 0.055);
      oscillator.stop(now + 0.85 + index * 0.07);
    });
  }, []);

  const enable = useCallback(async () => {
    if (!supported) return;
    const existing = nodesRef.current;
    const nodes = existing ?? buildSoundscape();
    if (!nodes) return;

    try {
      if (nodes.context.state !== 'running') await nodes.context.resume();
      if (nodes.context.state !== 'running') return;

      nodes.master.gain.cancelScheduledValues(nodes.context.currentTime);
      nodes.master.gain.setValueAtTime(Math.max(0.0001, nodes.master.gain.value), nodes.context.currentTime);
      nodes.master.gain.exponentialRampToValueAtTime(TARGET_MASTER_GAIN, nodes.context.currentTime + 0.9);
      playActivationTone(nodes.context, nodes.master);
      setEnabled(true);
    } catch {
      setEnabled(false);
    }
  }, [buildSoundscape, playActivationTone, supported]);

  const disable = useCallback(() => {
    const nodes = nodesRef.current;
    if (!nodes) {
      setEnabled(false);
      return;
    }

    nodes.master.gain.cancelScheduledValues(nodes.context.currentTime);
    nodes.master.gain.setValueAtTime(Math.max(0.0001, nodes.master.gain.value), nodes.context.currentTime);
    nodes.master.gain.exponentialRampToValueAtTime(0.0001, nodes.context.currentTime + 0.28);
    window.setTimeout(() => {
      if (nodes.context.state === 'running') void nodes.context.suspend();
    }, 360);
    setEnabled(false);
  }, []);

  const toggle = useCallback(() => {
    if (enabled) disable();
    else void enable();
  }, [disable, enable, enabled]);

  useEffect(() => () => {
    const nodes = nodesRef.current;
    if (!nodes) return;
    nodes.sources.forEach((source) => {
      try { source.stop(); } catch { /* source may already be stopped */ }
    });
    void nodes.context.close();
    nodesRef.current = null;
  }, []);

  return { enabled, supported, toggle };
}
