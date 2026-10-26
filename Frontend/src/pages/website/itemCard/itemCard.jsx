import { useCallback, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import fallback from "../../../../assets/MSimg1.avif";
import QuickView from "../quickView";
import { describe, money, openWhatsapp, usableImage } from "../siteData";
import { tilt } from "../motion";

// Product tile: photo, category, name, short description, price and a WhatsApp order button.
// Clicking the card opens the quick-view popup.
const ItemCard = ({ item }) => {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const desc = describe(item);
  return (
    <>
      <article
        className="s-card"
        {...tilt}
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        aria-label={`${item?.label}, view details`}
      >
        <div className="s-card-media">
          <img
            src={usableImage(item?.imgUrl) || fallback}
            alt={item?.label ?? "Product"}
            loading="lazy"
            onError={(e) => {
              if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
            }}
          />
          {item?.category ? <span className="s-badge">{item.category}</span> : null}
          <span className="s-card-view">Quick view</span>
        </div>
        <div className="s-card-body">
          <h3 className="s-card-title">{String(item?.label ?? "").toLowerCase()}</h3>
          <p className={`s-card-desc ${desc ? "" : "soft"}`}>
            {desc || "Tap to see details, or message us for size, colour and stock."}
          </p>
          <div className="s-card-foot">
            <span className="s-price">
              <small>Rs</small>
              {money(item?.sellingPrice)}
            </span>
            <button
              type="button"
              className="s-btn s-btn-wa"
              onClick={(e) => {
                e.stopPropagation();
                openWhatsapp(item);
              }}
            >
              <FaWhatsapp /> <span className="s-btn-label">Order</span>
            </button>
          </div>
        </div>
      </article>
      {open ? <QuickView item={item} onClose={close} /> : null}
    </>
  );
};

export default ItemCard;
