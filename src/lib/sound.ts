/**
 * UI Sound System — Web Audio API (zero asset files needed)
 *
 * Generates a short synthetic futuristic blip programmatically.
 * No external audio file, no heavy library, no autoplay.
 * Respects prefers-reduced-motion and localStorage preference.
 */

const STORAGE_KEY = "ui-sounds-enabled";
const TOGGLE_EVENT = "ui-sounds-toggle";

// ─── AudioContext singleton (lazy init after first user gesture) ─────────────
let _ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!_ctx) {
    try {
      _ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch {
      return null;
    }
  }
  // Resume suspended context (browser autoplay policy)
  if (_ctx.state === "suspended") {
    _ctx.resume().catch(() => {});
  }
  return _ctx;
}

// ─── Read / write preference ─────────────────────────────────────────────────
function readPref(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "on";
  } catch {
    return false;
  }
}

function writePref(val: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, val ? "on" : "off");
  } catch {}
}

// ─── Module-level state ───────────────────────────────────────────────────────
let _enabled = readPref();

// ─── Public API ──────────────────────────────────────────────────────────────

/** Play a single subtle futuristic UI blip for primary interactive actions. */
export function playUISound() {
  if (!_enabled) return;

  // Respect prefers-reduced-motion
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) return;

  const ctx = getCtx();
  if (!ctx) return;

  try {
    const t = ctx.currentTime;

    // Oscillator — brief frequency sweep for digital "blip" character
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(820, t);
    osc.frequency.exponentialRampToValueAtTime(1080, t + 0.055);

    // Gain envelope — soft attack, fast decay (total ~90ms)
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(0.10, t + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.090);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.095);
  } catch {
    // Silently fail — audio must never break the UI
  }
}



/** Toggle UI sounds on/off, persist preference, and broadcast to all listeners. */
export function toggleUISound() {
  _enabled = !_enabled;
  writePref(_enabled);
  // Broadcast to all toggle-button instances
  window.dispatchEvent(new CustomEvent(TOGGLE_EVENT, { detail: _enabled }));

  // Play a confirmation blip when turning ON
  if (_enabled) {
    // Brief delay so the context has time to resume
    setTimeout(playUISound, 60);
  }
}

/** Returns current enabled state. */
export function isSoundEnabled(): boolean {
  return _enabled;
}

/** Subscribe to toggle changes. Returns unsubscribe function. */
export function onSoundToggle(cb: (enabled: boolean) => void): () => void {
  const handler = (e: Event) => cb((e as CustomEvent<boolean>).detail);
  window.addEventListener(TOGGLE_EVENT, handler);
  return () => window.removeEventListener(TOGGLE_EVENT, handler);
}
