import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  FaWhatsapp,
  FaArrowRight,
  FaCheckCircle,
  FaShieldAlt,
  FaTags,
  FaTruck,
  FaHeadset,
  FaStar,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaChevronDown,
  FaPaperPlane,
} from "react-icons/fa";
import { fetchWebsiteProducts } from "../../functions/website";
import SiteLayout from "./siteLayout";
import ItemCard from "./itemCard/itemCard.jsx";
import StoreMap from "./map/map";
import video from "../../../assets/ceramics.mp4";
import { CONTACT, FAQS, REVIEWS, whatsappLink } from "./siteData";

const FEATURES = [
  { icon: <FaShieldAlt />, title: "Trusted brands", text: "Products from reputable manufacturers, built for durability and daily use." },
  { icon: <FaTags />, title: "Honest prices", text: "Clear pricing on every item, with the best value for your budget." },
  { icon: <FaTruck />, title: "Home delivery", text: "Our delivery team brings your order to your doorstep on time." },
  { icon: <FaHeadset />, title: "Expert advice", text: "Not sure what fits your bathroom? Message us and we'll help you choose." },
];

const STATS = [
  { value: "500+", label: "Happy clients" },
  { value: "300+", label: "Products" },
  { value: "150+", label: "Categories" },
];

const Hero = () => (
  <section className="s-hero">
    <video src={video} muted loop autoPlay playsInline aria-hidden="true" />
    <div className="s-container">
      <div className="s-hero-content">
        <span className="s-eyebrow">Ceramics &amp; Sanitary · Karachi</span>
        <h1>
          Beautiful bathrooms <em>start here.</em>
        </h1>
        <p className="lead">
          MS Enterprise brings you premium commodes, vanities, showers and fittings, all in one
          place, with honest prices and delivery to your door.
        </p>
        <div className="s-hero-actions">
          <Link to="/item" className="s-btn s-btn-gold">
            Browse products <FaArrowRight />
          </Link>
          <a className="s-btn s-btn-ghost" href={whatsappLink()} target="_blank" rel="noreferrer">
            <FaWhatsapp /> Chat on WhatsApp
          </a>
        </div>
        <div className="s-trust">
          <span>
            <FaCheckCircle /> Genuine products
          </span>
          <span>
            <FaCheckCircle /> Delivery available
          </span>
          <span>
            <FaCheckCircle /> Easy WhatsApp ordering
          </span>
        </div>
      </div>
    </div>
    <div className="s-scroll">Scroll</div>
  </section>
);

const Categories = ({ products }) => {
  const counts = new Map();
  products.forEach((p) => {
    const c = String(p?.category ?? "").trim().toLowerCase();
    if (c) counts.set(c, (counts.get(c) ?? 0) + 1);
  });
  const cats = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8);
  if (cats.length === 0) return null;
  return (
    <section className="s-section tight">
      <div className="s-container">
        <div className="s-head s-reveal">
          <div>
            <span className="s-eyebrow">Shop by category</span>
            <h2>Find what your space needs</h2>
          </div>
          <Link to="/item" className="s-link">
            All products <FaArrowRight />
          </Link>
        </div>
        <div className="s-cats s-reveal">
          {cats.map(([name, count]) => (
            <Link key={name} to={`/item?category=${encodeURIComponent(name)}`} className="s-cat">
              <strong>{name}</strong>
              <small>
                {count} item{count === 1 ? "" : "s"}
              </small>
              <span className="arrow">
                <FaArrowRight />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const Featured = ({ products, loading }) => (
  <section className="s-section s-alt">
    <div className="s-container">
      <div className="s-head s-reveal">
        <div>
          <span className="s-eyebrow">Featured</span>
          <h2>Our popular products</h2>
          <p>Tap “Order” on any product to send us a WhatsApp message with its details.</p>
        </div>
        <Link to="/item" className="s-btn s-btn-line">
          View all products <FaArrowRight />
        </Link>
      </div>
      <div className="s-grid">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <div key={i} className="s-skeleton" />)
          : products.slice(0, 8).map((item, i) => <ItemCard key={item?._id ?? i} item={item} />)}
      </div>
    </div>
  </section>
);

const Why = () => (
  <section className="s-section">
    <div className="s-container">
      <div className="s-head s-center s-reveal">
        <span className="s-eyebrow">Why MS Enterprise</span>
        <h2>Quality you can see, service you can count on</h2>
      </div>
      <div className="s-features">
        {FEATURES.map((f) => (
          <div key={f.title} className="s-feature s-reveal">
            <div className="s-feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="s-section s-alt">
    <div className="s-container s-about">
      <div className="s-reveal">
        <span className="s-eyebrow">About us</span>
        <h2>Your trusted partner for ceramics and sanitary ware</h2>
        <p>
          MS Enterprise is a Karachi-based supplier of sanitary and ceramics products. With a wide range of
          styles and finishes, we make it easy to find exactly what you're looking for, whether you're
          building a new home or renovating a single bathroom.
        </p>
        <p>
          Every step of our journey has been about progress and growth, and we're committed to delivering
          excellence with every order.
        </p>
        <Link to="/item" className="s-link" style={{ marginTop: 10 }}>
          Explore the collection <FaArrowRight />
        </Link>
      </div>
      <div className="s-stats s-reveal">
        {STATS.map((s) => (
          <div key={s.label} className="s-stat">
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Reviews = () => (
  <section id="reviews" className="s-section">
    <div className="s-container">
      <div className="s-head s-center s-reveal">
        <span className="s-eyebrow">Testimonials</span>
        <h2>What our customers say</h2>
      </div>
      <div className="s-reviews">
        {REVIEWS.map((r) => (
          <figure key={r.name} className="s-review s-reveal" style={{ margin: 0 }}>
            <div className="s-stars" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p>“{r.body}”</p>
            <figcaption className="s-person">
              <img src={r.img} alt="" />
              <span>
                {r.name}
                <small>Customer</small>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

const CtaBand = () => (
  <section className="s-section tight" style={{ paddingTop: 0 }}>
    <div className="s-container">
      <div className="s-cta s-reveal">
        <div>
          <h2>Planning a new bathroom? Let's make it beautiful.</h2>
          <p>Send us a photo or a list on WhatsApp and we'll suggest the right products and price.</p>
        </div>
        <a className="s-btn s-btn-gold" href={whatsappLink()} target="_blank" rel="noreferrer">
          <FaWhatsapp /> Start on WhatsApp
        </a>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="s-section s-alt">
    <div className="s-container">
      <div className="s-head s-reveal">
        <div>
          <span className="s-eyebrow">Contact</span>
          <h2>Get in touch</h2>
          <p>Questions, prices or bulk orders? Call, WhatsApp or send us a message.</p>
        </div>
      </div>
      <div className="s-contact">
        <div className="s-info s-reveal">
          <div className="s-info-item">
            <span className="s-info-icon">
              <FaMapMarkerAlt />
            </span>
            <div>
              <small>Visit us</small>
              <b>{CONTACT.address}</b>
            </div>
          </div>
          <a className="s-info-item" href={CONTACT.phoneHref}>
            <span className="s-info-icon">
              <FaPhoneAlt />
            </span>
            <div>
              <small>Call us</small>
              <b>{CONTACT.phone}</b>
            </div>
          </a>
          <a className="s-info-item" href={whatsappLink()} target="_blank" rel="noreferrer">
            <span className="s-info-icon">
              <FaWhatsapp />
            </span>
            <div>
              <small>WhatsApp orders</small>
              <b>Chat with us now</b>
            </div>
          </a>
          <a className="s-info-item" href={`mailto:${CONTACT.email}`}>
            <span className="s-info-icon">
              <FaEnvelope />
            </span>
            <div>
              <small>Email</small>
              <b>{CONTACT.email}</b>
            </div>
          </a>
        </div>
        <form className="s-form s-reveal" action={`https://formsubmit.co/${CONTACT.email}`} method="POST">
          <h3>Send us a message</h3>
          <p>We usually reply within a few hours.</p>
          <div className="s-row2">
            <div className="s-field">
              <label htmlFor="c-name">Full name</label>
              <input id="c-name" name="name" required placeholder="Your name" />
            </div>
            <div className="s-field">
              <label htmlFor="c-email">Email</label>
              <input id="c-email" name="email" type="email" required placeholder="you@example.com" />
            </div>
          </div>
          <div className="s-field">
            <label htmlFor="c-msg">Message</label>
            <textarea id="c-msg" name="message" rows={5} required placeholder="Tell us what you're looking for" />
          </div>
          <button type="submit" className="s-btn s-btn-dark" style={{ width: "100%" }}>
            <FaPaperPlane /> Send message
          </button>
        </form>
      </div>
    </div>
  </section>
);

const Faqs = () => {
  const [open, setOpen] = useState(0);
  return (
    <section id="faqs" className="s-section">
      <div className="s-container">
        <div className="s-head s-center s-reveal">
          <span className="s-eyebrow">FAQs</span>
          <h2>Frequently asked questions</h2>
        </div>
        <div className="s-faq s-reveal">
          {FAQS.map((f, i) => (
            <div key={f.q} className={`s-faq-item ${open === i ? "open" : ""}`}>
              <button className="s-faq-q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                {f.q}
                <FaChevronDown />
              </button>
              {open === i ? <div className="s-faq-a">{f.a}</div> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Location = () => (
  <section id="location" className="s-section s-alt">
    <div className="s-container">
      <div className="s-head s-reveal">
        <div>
          <span className="s-eyebrow">Our store</span>
          <h2>Where to find us</h2>
          <p>{CONTACT.address}</p>
        </div>
      </div>
      <div className="s-map s-reveal">
        <StoreMap />
      </div>
    </div>
  </section>
);

const Website = () => {
  const { data, isLoading } = useQuery(["fetchWebsiteProducts"], fetchWebsiteProducts);
  const products = data?.data?.data ?? [];
  return (
    <SiteLayout title="MS Enterprise | Ceramics & Sanitary Ware, Karachi" overHero>
      <Hero />
      <Categories products={products} />
      <Featured products={products} loading={isLoading} />
      <Why />
      <About />
      <Reviews />
      <CtaBand />
      <Contact />
      <Faqs />
      <Location />
    </SiteLayout>
  );
};

export default Website;
