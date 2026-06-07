/**
 * 8-bit retro sound effects using the Web Audio API.
 *
 * No external files, no API calls — pure oscillator-generated blips,
 * ticks, and chiptune-style sounds.  Respects prefers-reduced-motion
 * (treated as a proxy for reduced sensory input).
 *
 * Usage:
 *   import { sfx } from "@/lib/sfx";
 *   sfx.blip();        // cartridge select
 *   sfx.click();       // button click
 *   sfx.coin();        // PRESS START / coin insert
 *   sfx.boot();        // power-on boot sequence
 *   sfx.hover();       // subtle hover tick
 */

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let isMuted = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (audioCtx) return audioCtx;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return null;

  audioCtx = new AudioContext();
  masterGain = audioCtx.createGain();
  masterGain.gain.value = 0.15; // 15% master volume
  masterGain.connect(audioCtx.destination);
  return audioCtx;
}

function playOsc(
  type: OscillatorType,
  freq: number,
  durationSec: number,
  vol = 1,
  slideTo?: number
) {
  const ctx = getCtx();
  if (!ctx || isMuted) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  if (slideTo !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(slideTo, ctx.currentTime + durationSec);
  }

  gain.gain.setValueAtTime(vol, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationSec);

  osc.connect(gain);
  gain.connect(masterGain!);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + durationSec);
}

export const sfx = {
  /** Cartridge / card select — short square blip */
  blip() {
    playOsc("square", 880, 0.06, 0.8);
  },

  /** Button click — crisp tick */
  click() {
    playOsc("square", 1200, 0.04, 0.6);
  },

  /** Hover — very subtle, low volume */
  hover() {
    playOsc("square", 600, 0.03, 0.25);
  },

  /** Coin insert / PRESS START — classic 8-bit coin sound */
  coin() {
    const ctx = getCtx();
    if (!ctx || isMuted) return;
    // two-note arpeggio: B5 → E6
    playOsc("square", 987, 0.1, 0.7);
    setTimeout(() => playOsc("square", 1318, 0.15, 0.7), 80);
  },

  /** Boot-up — power-on slide */
  boot() {
    playOsc("square", 220, 0.25, 0.5, 880);
  },

  /** Toggle on */
  toggleOn() {
    playOsc("square", 660, 0.08, 0.5);
  },

  /** Toggle off */
  toggleOff() {
    playOsc("square", 440, 0.08, 0.5);
  },
};

/** Global mute / unmute */
export function setSfxMute(mute: boolean) {
  isMuted = mute;
  if (masterGain) {
    masterGain.gain.setTargetAtTime(mute ? 0 : 0.15, audioCtx!.currentTime, 0.05);
  }
}

export function getSfxMuted() {
  return isMuted;
}
