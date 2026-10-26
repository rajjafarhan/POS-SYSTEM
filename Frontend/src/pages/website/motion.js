// Small pointer-driven effects for the website. They only run for a real mouse
// (not touch) and stay off when the visitor prefers reduced motion.
const enabled = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(pointer: fine)").matches &&
  !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Moves a glow to the cursor: sets --mx / --my (px) on the element.
export const spot = (e) => {
  if (!enabled()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
};

// Parallax: sets --px / --py between -1 and 1 based on cursor position in the element.
export const parallax = (e) => {
  if (!enabled()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5) * 2);
  el.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5) * 2);
};

// 3D tilt for cards: spread onto the element as event handlers.
export const tilt = {
  onMouseMove: (e) => {
    if (!enabled()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
  },
  onMouseLeave: (e) => {
    const el = e.currentTarget;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  },
};
