/** Tiny WebAudio synth — no audio assets, just oscillators. */

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") {
    void ctx.resume();
  }
  return ctx;
}

function tone(
  freq: number,
  duration: number,
  type: OscillatorType,
  delay = 0,
  volume = 0.08
): void {
  const audio = getCtx();
  if (!audio) return;
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  const t0 = audio.currentTime + delay;
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  gain.gain.setValueAtTime(volume, t0);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(gain).connect(audio.destination);
  osc.start(t0);
  osc.stop(t0 + duration);
}

export const sfx = {
  /** UI hover/move blip. */
  blip(): void {
    tone(520, 0.08, "square");
  },
  /** Panel open. */
  open(): void {
    tone(392, 0.1, "triangle");
    tone(587, 0.12, "triangle", 0.07);
  },
  /** Panel close. */
  close(): void {
    tone(440, 0.1, "triangle");
    tone(294, 0.12, "triangle", 0.06);
  },
  /** Quest completed — little fanfare. */
  quest(): void {
    tone(523, 0.12, "square", 0, 0.07);
    tone(659, 0.12, "square", 0.1, 0.07);
    tone(784, 0.2, "square", 0.2, 0.07);
  },
  /** Game start. */
  start(): void {
    tone(262, 0.1, "sawtooth", 0, 0.05);
    tone(392, 0.1, "sawtooth", 0.08, 0.05);
    tone(523, 0.25, "sawtooth", 0.16, 0.05);
  },
} as const;
