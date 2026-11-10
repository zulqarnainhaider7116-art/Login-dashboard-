/**
 * Sound Effects Utility and Audio Data URIs for 'use-sound'
 * Generates tactile 3D clicks, cheerful pops, and uplifting chimes
 */

function createWavDataUri(sampleRate: number, duration: number, sampleFn: (t: number) => number): string {
  const numSamples = Math.floor(sampleRate * duration);
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);

  function writeString(offset: number, string: string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true); // Block align
  view.setUint16(34, 16, true); // Bits per sample
  writeString(36, 'data');
  view.setUint32(40, numSamples * 2, true);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const s = Math.max(-1, Math.min(1, sampleFn(t)));
    const val = s < 0 ? s * 0x8000 : s * 0x7FFF;
    view.setInt16(44 + i * 2, Math.floor(val), true);
  }

  // Convert buffer to base64
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  const b64 = typeof btoa !== 'undefined' ? btoa(binary) : Buffer.from(binary, 'binary').toString('base64');
  return 'data:audio/wav;base64,' + b64;
}

// 1. Gentle cheerful pop (for cards and pills)
export const POP_SOUND_URI = createWavDataUri(22050, 0.14, (t) => {
  const freq = 550 * Math.exp(-t * 18);
  const env = Math.exp(-t * 22);
  return Math.sin(2 * Math.PI * freq * t) * env;
});

// 2. Tactile 3D button push (with mechanical down-click and soft bass thump)
export const PUSH_SOUND_URI = createWavDataUri(22050, 0.16, (t) => {
  const f = 220 * Math.exp(-t * 14);
  const click = t < 0.015 ? Math.sin(2 * Math.PI * 1200 * t) * 0.45 : 0;
  const env = Math.exp(-t * 16);
  return (Math.sin(2 * Math.PI * f * t) * 0.75 + click) * env;
});

// 3. Cheerful marimba chime (for gender select and pose switch)
export const CHIME_SOUND_URI = createWavDataUri(22050, 0.28, (t) => {
  const f1 = 523.25; // C5
  const f2 = 659.25; // E5
  const f3 = 783.99; // G5
  const env = Math.exp(-t * 9);
  return (
    Math.sin(2 * Math.PI * f1 * t) * 0.4 +
    Math.sin(2 * Math.PI * f2 * t) * 0.35 +
    Math.sin(2 * Math.PI * f3 * t) * 0.3
  ) * env;
});

// 4. Cheerful uplifting celebration jingle (for login success)
export const SUCCESS_SOUND_URI = createWavDataUri(22050, 0.4, (t) => {
  let f = 523.25; // C5
  if (t > 0.08) f = 659.25; // E5
  if (t > 0.16) f = 783.99; // G5
  if (t > 0.24) f = 1046.5; // C6
  const env = Math.exp(-((t % 0.08) * 20)) * Math.exp(-t * 2.5);
  return Math.sin(2 * Math.PI * f * t) * env;
});

export const SOUND_DATA_URIS = {
  pop: POP_SOUND_URI,
  push: PUSH_SOUND_URI,
  chime: CHIME_SOUND_URI,
  success: SUCCESS_SOUND_URI,
};

// Web Audio synthesizer for immediate, zero-latency tactile feedback
class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Initialized lazily on first user interaction
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playPop() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Audio autoplay policy catch
    }
  }

  public playPush() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // Audio autoplay policy catch
    }
  }

  public playChime() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.04);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.04 + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.04);
        osc.stop(ctx.currentTime + i * 0.04 + 0.25);
      });
    } catch {
      // Audio autoplay policy catch
    }
  }

  public playSuccess() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C, E, G, C
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.07);
        gain.gain.setValueAtTime(0.25, ctx.currentTime + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.07 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.07);
        osc.stop(ctx.currentTime + i * 0.07 + 0.35);
      });
    } catch {
      // Audio autoplay policy catch
    }
  }
}

export const soundManager = new SoundSynthesizer();
