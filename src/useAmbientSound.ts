import { useCallback, useEffect, useRef, useState } from 'react';

type AmbientNodes = {
  context: AudioContext;
  master: GainNode;
  sources: AudioScheduledSourceNode[];
};

export function useAmbientSound() {
  const [enabled, setEnabled] = useState(false);
  const [supported] = useState(() => typeof window !== 'undefined' && 'AudioContext' in window);
  const nodesRef = useRef<AmbientNodes | null>(null);

  const buildSoundscape = useCallback(() => {
    const context = new AudioContext();
    const master = context.createGain();
    master.gain.setValueAtTime(0.0001, context.currentTime);
    master.connect(context.destination);

    const padBus = context.createGain();
    padBus.gain.value = 0.012;
    padBus.connect(master);

    const frequencies = [174.61, 261.63, 392.0];
    const sources: AudioScheduledSourceNode[] = [];

    frequencies.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const filter = context.createBiquadFilter();
      oscillator.type = index === 1 ? 'triangle' : 'sine';
      oscillator.frequency.value = frequency;
      oscillator.detune.value = index === 2 ? -7 : index * 4;
      filter.type = 'lowpass';
      filter.frequency.value = 720 + index * 180;
      filter.Q.value = 0.3;
      gain.gain.value = index === 1 ? 0.16 : 0.11;
      oscillator.connect(filter);
      filter.connect(gain);
      gain.connect(padBus);
      oscillator.start();
      sources.push(oscillator);
    });

    // A very soft filtered air layer. Generated locally; no streamed or licensed audio asset.
    const duration = 4;
    const frameCount = Math.floor(context.sampleRate * duration);
    const buffer = context.createBuffer(1, frameCount, context.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < frameCount; i += 1) {
      const white = Math.random() * 2 - 1;
      last = last * 0.985 + white * 0.015;
      data[i] = last * 0.38;
    }
    const air = context.createBufferSource();
    air.buffer = buffer;
    air.loop = true;
    const airFilter = context.createBiquadFilter();
    airFilter.type = 'bandpass';
    airFilter.frequency.value = 520;
    airFilter.Q.value = 0.32;
    const airGain = context.createGain();
    airGain.gain.value = 0.014;
    air.connect(airFilter);
    airFilter.connect(airGain);
    airGain.connect(master);
    air.start();
    sources.push(air);

    // Slow amplitude breathing so the sound never feels like a static loop.
    const lfo = context.createOscillator();
    const lfoGain = context.createGain();
    lfo.type = 'sine';
    lfo.frequency.value = 0.055;
    lfoGain.gain.value = 0.0032;
    lfo.connect(lfoGain);
    lfoGain.connect(padBus.gain);
    lfo.start();
    sources.push(lfo);

    master.gain.exponentialRampToValueAtTime(0.034, context.currentTime + 1.6);
    const nodes = { context, master, sources };
    nodesRef.current = nodes;
    return nodes;
  }, []);

  const enable = useCallback(async () => {
    if (!supported) return;
    const existing = nodesRef.current;
    const nodes = existing ?? buildSoundscape();
    if (nodes.context.state === 'suspended') await nodes.context.resume();
    nodes.master.gain.cancelScheduledValues(nodes.context.currentTime);
    nodes.master.gain.setTargetAtTime(0.034, nodes.context.currentTime, 0.42);
    setEnabled(true);
  }, [buildSoundscape, supported]);

  const disable = useCallback(async () => {
    const nodes = nodesRef.current;
    if (!nodes) {
      setEnabled(false);
      return;
    }
    nodes.master.gain.cancelScheduledValues(nodes.context.currentTime);
    nodes.master.gain.setTargetAtTime(0.0001, nodes.context.currentTime, 0.2);
    window.setTimeout(() => {
      if (nodes.context.state === 'running') void nodes.context.suspend();
    }, 480);
    setEnabled(false);
  }, []);

  const toggle = useCallback(() => {
    if (enabled) void disable();
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
