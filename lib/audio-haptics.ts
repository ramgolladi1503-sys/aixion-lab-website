/**
 * Aixion Web Audio Micro-Haptic Synthesizer
 * Produces subtle, crisp mechanical ticks without external sound files.
 * Zero-dependency, memory-safe, and respects user audio preferences.
 */

class HapticAudioEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;
  private listeners: Set<(enabled: boolean) => void> = new Set();

  constructor() {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("aixion-sound-enabled");
      this.enabled = stored === "true";
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (typeof window !== "undefined") {
      sessionStorage.setItem("aixion-sound-enabled", String(this.enabled));
      if (this.enabled) {
        this.initCtx();
        this.playTick(1200, 0.04);
      }
    }
    this.listeners.forEach((fn) => fn(this.enabled));
    return this.enabled;
  }

  public subscribe(fn: (enabled: boolean) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  public playTick(frequency: number = 1800, gainLevel: number = 0.03): void {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, now);
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.4, now + 0.025);

      gain.gain.setValueAtTime(gainLevel, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {
      // Graceful fallback for restricted environments
    }
  }

  public playStage(): void {
    this.playTick(2200, 0.035);
  }

  public playToggle(): void {
    this.playTick(1600, 0.03);
  }

  public playCommit(): void {
    this.playTick(2800, 0.04);
  }
}

export const haptics = new HapticAudioEngine();
