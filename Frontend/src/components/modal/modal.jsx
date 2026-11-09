import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import "./modal.css";

const FOCUSABLE =
  'input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

// The popup's own close control: the ✕ button, else a Close / Cancel / No button.
const findClose = (root) =>
  root.querySelector('[aria-label="Close"], .btn-close') ||
  [...root.querySelectorAll("button")].find((b) => /^(close|cancel|no)$/i.test(b.textContent.trim()));

const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("DIV");
  }

  useEffect(() => {
    const modalNode = document.getElementById("modal");
    const el = elRef.current;
    const opener = document.activeElement;
    modalNode.appendChild(el);

    // start on the first field, or on the first button when there is no field
    const t = setTimeout(() => {
      const first =
        el.querySelector('input:not([disabled]):not([type="hidden"]):not([type="checkbox"]), textarea, select') ||
        [...el.querySelectorAll(FOCUSABLE)].find((n) => !n.matches('[aria-label="Close"], .btn-close'));
      first?.focus({ preventScroll: true });
    }, 30);

    const onKey = (e) => {
      if (modalNode.lastElementChild !== el) return; // only the top popup reacts
      if (e.key === "Escape") {
        // let an open dropdown or date picker close first
        if (document.querySelector(".MuiPopover-root, .MuiPickersPopper-root, [role='listbox']")) return;
        const close = findClose(el);
        if (close) {
          e.preventDefault();
          close.click();
        }
      } else if (e.key === "Tab") {
        // keep Tab inside the popup
        const items = [...el.querySelectorAll(FOCUSABLE)].filter((n) => n.offsetParent !== null);
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (!el.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      modalNode.removeChild(el);
      if (opener && document.contains(opener)) opener.focus({ preventScroll: true });
    };
  }, []);

  return createPortal(
    <div role="dialog" aria-modal="true">
      {children}
    </div>,
    elRef.current
  );
};

export default Modal;
