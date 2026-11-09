// Keyboard helpers shared by the data tables.

// On a row: Enter / Space opens it, ↑ ↓ move to the row above / below.
export const rowKeys = (onOpen) => (e) => {
  if (e.target !== e.currentTarget) return; // a button or checkbox inside the row handles its own keys
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onOpen();
  } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault();
    const row = e.key === "ArrowDown" ? e.currentTarget.nextElementSibling : e.currentTarget.previousElementSibling;
    row?.focus();
  }
};

// On the table card: ← → change page (not while typing).
export const pagerKeys = ({ prev, next, canPrev, canNext }) => (e) => {
  if (e.target.closest("input, textarea, select")) return;
  if (e.key === "ArrowLeft" && canPrev) {
    e.preventDefault();
    prev();
  } else if (e.key === "ArrowRight" && canNext) {
    e.preventDefault();
    next();
  }
};
