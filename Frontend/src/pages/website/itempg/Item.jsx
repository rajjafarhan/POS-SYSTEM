import { Link } from "react-router-dom";
import SiteLayout from "../siteLayout";
import ItemsSection from "../itemsection";

const Item = () => (
  <SiteLayout title="Products | MS Enterprise">
    <section className="s-page-hero">
      <div className="s-container">
        <div className="s-crumbs">
          <Link to="/">Home</Link> / Products
        </div>
        <span className="s-eyebrow">Our collection</span>
        <h1>Products</h1>
        <p>Browse our ceramics and sanitary range. Tap “Order” to ask about any item on WhatsApp.</p>
      </div>
    </section>
    <ItemsSection />
  </SiteLayout>
);

export default Item;
