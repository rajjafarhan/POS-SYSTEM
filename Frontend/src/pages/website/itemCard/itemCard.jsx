import { FaWhatsapp } from "react-icons/fa";
import fallback from "../../../../assets/MSimg1.avif";
import { money, openWhatsapp } from "../siteData";

// Product tile for the website: photo, category, name, price and a WhatsApp order button.
const ItemCard = ({ item }) => (
  <article className="s-card">
    <div className="s-card-media">
      <img
        src={item?.imgUrl ? item.imgUrl : fallback}
        alt={item?.label ?? "Product"}
        loading="lazy"
        onError={(e) => {
          // old Firebase images no longer exist; show the shop placeholder instead
          if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
        }}
      />
      {item?.category ? <span className="s-badge">{item.category}</span> : null}
    </div>
    <div className="s-card-body">
      <h3 className="s-card-title">{String(item?.label ?? "").toLowerCase()}</h3>
      <div className="s-card-foot">
        <span className="s-price">
          <small>Rs</small>
          {money(item?.sellingPrice)}
        </span>
        <button type="button" className="s-btn s-btn-wa" onClick={() => openWhatsapp(item)}>
          <FaWhatsapp /> Order
        </button>
      </div>
    </div>
  </article>
);

export default ItemCard;
