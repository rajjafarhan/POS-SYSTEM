import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FaTimes, FaWhatsapp, FaPhoneAlt, FaCheckCircle } from "react-icons/fa";
import fallback from "../../../assets/MSimg1.avif";
import { CONTACT, describe, money, openWhatsapp, usableImage } from "./siteData";

// Product details popup: big photo, price, description and order buttons.
// Rendered into #s-portal (inside .site) so it isn't trapped by a hovered card's transform.
const QuickView = ({ item, onClose }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const target = document.getElementById("s-portal");
  if (!item || !target) return null;
  const img = usableImage(item.imgUrl) || fallback;
  const desc = describe(item);

  return createPortal(
    <div className="s-qv-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={item.label}>
      <div className="s-qv" onClick={(e) => e.stopPropagation()}>
        <button className="s-qv-close" onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>
        <div className="s-qv-media">
          <img src={img} alt={item.label} />
        </div>
        <div className="s-qv-body">
          {item.category ? <span className="s-eyebrow">{item.category}</span> : null}
          <h3>{String(item.label ?? "").toLowerCase()}</h3>
          <div className="s-qv-price">
            <small>Rs</small>
            {money(item.sellingPrice)}
          </div>
          {desc ? <p className="s-qv-desc">{desc}</p> : null}
          <ul className="s-qv-points">
            <li>
              <FaCheckCircle /> Genuine product
            </li>
            <li>
              <FaCheckCircle /> Delivery available in Karachi
            </li>
            <li>
              <FaCheckCircle /> Ask us for sizes, colours and stock
            </li>
          </ul>
          <div className="s-qv-actions">
            <button type="button" className="s-btn s-btn-wa" onClick={() => openWhatsapp(item)}>
              <FaWhatsapp /> Order on WhatsApp
            </button>
            <a className="s-btn s-btn-line" href={CONTACT.phoneHref}>
              <FaPhoneAlt /> Call
            </a>
          </div>
        </div>
      </div>
    </div>,
    target
  );
};

export default QuickView;
