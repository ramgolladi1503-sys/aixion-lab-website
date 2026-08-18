import { useCallback, useEffect, useRef, useState } from 'react';

type AmbientNodes = {
  context: AudioContext;
  master: GainNode;
  musicBus: GainNode;
  airBus: GainNode;
  sources: AudioScheduledSourceNode[];
};

const TARGET_MASTER_GAIN = 0.18;

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
    musicBus.gain.value = 0.22;
    musicBus.connect(master);

    const airBus = context.createGain();
    airBus.gain.value = 0.055;
    airBus.connect(master);

    const sources: AudioScheduledSourceNode[] = [];

    // Soft open fifth + major ninth. Deliberately slow, calm and non-rhythmic.
    const frequencies = [130.81, 196.0, 261.63, 329.63, 440.0];
    frequencies.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const filter = context.createBiquadFilter();

      oscillator.type = index % 3 === 1 ? 'triangle' : 'sine';
      oscillator.frequency.value = frequency;
      oscillator.detune.value = [-7, 3, -3, 5, -5][index] ?? 0;

      filter.type = 'lowpass';
      filter.frequency.value = 900 + index * 170;
      filter.Q.value = 0.22;

      gain.gain.value = index === 0 ? 0.22 : index < 3 ? 0.14 : 0.075;
      oscillator.connect(filter);
      filter.connect(gain);
      gain.connect(musicBus);
      oscillator.start();
      sources.push(oscillator);
    });

    // Soft filtered air layer. Generated locally; no streamed/copyrighted asset.
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
    airFilter.frequency.value = 720;
    airFilter.Q.value = 0.28;
    air.connect(airFilter);
    airFilter.connect(airBus);
    air.start();
    sources.push(air);

    // Extremely slow breathing. The visitor should perceive space, not a loop.
    const lfo = context.createOscillator();
    const lfoGain = context.createGain();
    lfo.type = 'sine';
    lfo.frequency.value = 0.043;
    lfoGain.gain.value = 0.035;
    lfo.connect(lfoGain);
    lfoGain.connect(musicBus.gain);
    lfo.start();
    sources.push(lfo);

    // A second slow modulation gently opens/closes the air layer.
    const airLfo = context.createOscillator();
    const airLfoGain = context.createGain();
    airLfo.type = 'sine';
    airLfo.frequency.value = 0.026;
    airLfoGain.gain.value = 0.012;
    airLfo.connect(airLfoGain);
    airLfoGain.connect(airBus.gain);
    airLfo.start();
    sources.push(airLfo);

    const nodes = { context, master, musicBus, airBus, sources };
    nodesRef.current = nodes;
    return nodes;
  }, []);

  const enable = useCallback(async () => {
    if (!supported) return;
    const existing = nodesRef.current;
    const nodes = existing ?? buildSoundscape();
    if (!nodes) return;

    if (nodes.context.state === 'suspended') await nodes.context.resume();
    nodes.master.gain.cancelScheduledValues(nodes.context.currentTime);
    nodes.master.gain.setValueAtTime(Math.max(0.0001, nodes.master.gain.value), nodes.context.currentTime);
    nodes.master.gain.exponentialRampToValueAtTime(TARGET_MASTER_GAIN, nodes.context.currentTime + 1.25);
    setEnabled(true);
  }, [buildSoundscape, supported]);

  const disable = useCallback(() => {
    const nodes = nodesRef.current;
    if (!nodes) {
      setEnabled(false);
      return;
    }

    nodes.master.gain.cancelScheduledValues(nodes.context.currentTime);
    nodes.master.gain.setValueAtTime(Math.max(0.0001, nodes.master.gain.value), nodes.context.currentTime);
    nodes.master.gain.exponentialRampToValueAtTime(0.0001, nodes.context.currentTime + 0.32);
    window.setTimeout(() => {
      if (nodes.context.state === 'running') void nodes.context.suspend();
    }, 420);
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
