import { useEffect, useRef, useState } from "react";
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
  FaPaperPlane,
  FaGem,
  FaDirections,
} from "react-icons/fa";
import { fetchWebsiteProducts } from "../../functions/website";
import SiteLayout from "./siteLayout";
import ItemCard from "./itemCard/itemCard.jsx";
import StoreMap from "./map/map";
import { parallax, spot } from "./motion";
import video from "../../../assets/ceramics.mp4";
import { CONTACT, FAQS, REVIEWS, directionsLink, money, usableImage, whatsappLink } from "./siteData";

const STATS = [
  { value: 500, suffix: "+", label: "Happy clients across Karachi" },
  { value: 300, suffix: "+", label: "Products" },
  { value: 150, suffix: "+", label: "Categories" },
];

const categoryCounts = (products) => {
  const counts = new Map();
  products.forEach((p) => {
    const c = String(p?.category ?? "").trim().toLowerCase();
    if (c) counts.set(c, (counts.get(c) ?? 0) + 1);
  });
  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
};

// Counts up to `to` the first time it scrolls into view.
const CountUp = ({ to, suffix = "" }) => {
  const ref = useRef(null);
  const [n, setN] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let raf;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - start) / 1600);
          setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        setN(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);
  return (
    <strong ref={ref}>
      {n}
      {suffix}
    </strong>
  );
};

const Hero = ({ products }) => {
  const shots = products.filter((p) => usableImage(p?.imgUrl)).slice(0, 3);
  return (
    <section className="s-hero" onMouseMove={parallax}>
      <video src={video} muted loop autoPlay playsInline aria-hidden="true" />
      <div className="s-blob a" />
      <div className="s-blob b" />
      <div className="s-grain" />
      <div className="s-container s-hero-grid">
        <div>
          <span className="s-eyebrow s-fade-up">
            <i /> Ceramics &amp; Sanitary · Karachi
          </span>
          <h1>
            <span className="line">
              <span>Beautiful</span>
            </span>
            <span className="line">
              <span>bathrooms</span>
            </span>
            <span className="line">
              <em>start here.</em>
            </span>
          </h1>
          <p className="lead s-fade-up s-d1">
            Premium commodes, vanities, showers and fittings, all in one place, with honest prices and
            delivery to your door.
          </p>
          <div className="s-hero-actions s-fade-up s-d2">
            <Link to="/item" className="s-btn s-btn-gold">
              Browse products <FaArrowRight />
            </Link>
            <a className="s-btn s-btn-ghost" href={whatsappLink()} target="_blank" rel="noreferrer">
              <FaWhatsapp /> Chat on WhatsApp
            </a>
          </div>
          <div className="s-trust s-fade-up s-d3">
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

        {shots.length > 0 ? (
          <div className="s-collage" aria-label="Featured products">
            {shots.map((p, i) => (
              <div key={p._id ?? i} className={`s-tile t${i + 1}`}>
                <div className="img">
                  <img src={usableImage(p.imgUrl)} alt={p.label} />
                </div>
                <div className="cap">
                  <b>{String(p.label).toLowerCase()}</b>
                  <span>Rs {money(p.sellingPrice)}</span>
                </div>
              </div>
            ))}
            <div className="s-chip c1">
              <FaStar /> 5-star rated by our clients
            </div>
            <div className="s-chip c2">
              <FaTruck /> Delivery across Karachi
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
      <div className="s-scroll" aria-hidden="true" />
    </section>
  );
};

const Marquee = ({ products }) => {
  const words = categoryCounts(products).slice(0, 12).map(([c]) => c);
  const list = (words.length ? words : ["Commodes", "Vanities", "Showers", "Basins", "Fittings"]).concat(
    "Premium quality",
    "Delivery in Karachi"
  );
  const track = [...list, ...list]; // doubled so the loop is seamless
  return (
    <div className="s-marquee" aria-hidden="true">
      <div className="s-marquee-track">
        {track.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>
    </div>
  );
};

const Categories = ({ products }) => {
  const all = categoryCounts(products);
  const cats = all.slice(0, 8); // biggest categories; the rest are one tap away
  const more = all.length - cats.length;
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
        <div className="s-cats">
          {cats.map(([name, count], i) => (
            <Link key={name} to={`/item?category=${encodeURIComponent(name)}`} className="s-cat s-reveal">
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <strong>{name}</strong>
              <small>
                {count} item{count === 1 ? "" : "s"}
              </small>
              <span className="arrow">
                <FaArrowRight />
              </span>
            </Link>
          ))}
          {more > 0 ? (
            <Link to="/item" className="s-cat s-cat-more s-reveal">
              <span className="num">+{more}</span>
              <strong>More categories</strong>
              <small>Browse all {all.length} categories</small>
              <span className="arrow">
                <FaArrowRight />
              </span>
            </Link>
          ) : null}
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
          <p>Tap any product for details, or “Order” to send us its details on WhatsApp.</p>
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
  <section className="s-section s-dark s-spotlit" onMouseMove={spot}>
    <div className="s-spot" aria-hidden="true" />
    <div className="s-container">
      <div className="s-head s-reveal">
        <div>
          <span className="s-eyebrow">Why MS Enterprise</span>
          <h2>
            Quality you can see,
            <br />
            service you can count on
          </h2>
        </div>
        <p>From a single tap to a full bathroom fit-out, we help you choose well and pay fairly.</p>
      </div>
      <div className="s-bento">
        <div className="s-feature big s-reveal">
          <div className="s-feature-icon">
            <FaGem />
          </div>
          <h3>Premium ceramics for every budget</h3>
          <p>
            Commodes, vanities, urinals, showers and all the fittings that go with them, from brands
            known for durability and finish.
          </p>
          <Link to="/item" className="s-btn s-btn-gold">
            Explore the range <FaArrowRight />
          </Link>
        </div>
        <div className="s-feature s-reveal">
          <div className="s-feature-icon">
            <FaShieldAlt />
          </div>
          <h3>Trusted brands</h3>
          <p>Products from reputable manufacturers, built to last.</p>
        </div>
        <div className="s-feature s-reveal">
          <div className="s-feature-icon">
            <FaTags />
          </div>
          <h3>Honest prices</h3>
          <p>Clear pricing on every item and the best value for you.</p>
        </div>
        <div className="s-feature s-reveal">
          <div className="s-feature-icon">
            <FaTruck />
          </div>
          <h3>Delivered to your door</h3>
          <p>Our delivery team brings your order safely and on time, anywhere in Karachi.</p>
        </div>
        <div className="s-feature s-reveal">
          <div className="s-feature-icon">
            <FaHeadset />
          </div>
          <h3>Expert advice</h3>
          <p>Send us a photo of your space and we'll suggest the right products.</p>
        </div>
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="s-section">
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
        <Link to="/item" className="s-link" style={{ marginTop: 12 }}>
          Explore the collection <FaArrowRight />
        </Link>
      </div>
      <div className="s-stats">
        {STATS.map((s) => (
          <div key={s.label} className="s-stat s-reveal">
            <CountUp to={s.value} suffix={s.suffix} />
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ReviewCard = ({ r }) => (
  <figure className="s-review">
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
        <small>Verified customer</small>
      </span>
    </figcaption>
  </figure>
);

const Reviews = () => {
  const half = Math.ceil(REVIEWS.length / 2);
  const rowA = REVIEWS.slice(0, half);
  const rowB = REVIEWS.slice(half);
  return (
    <section id="reviews" className="s-section s-dark" style={{ overflow: "hidden" }}>
      <div className="s-container">
        <div className="s-head s-center s-reveal">
          <span className="s-eyebrow">Testimonials</span>
          <h2>Loved by homes across Karachi</h2>
        </div>
      </div>
      <div className="s-wall">
        {[rowA, rowB].map((row, i) => (
          <div key={i} className={`s-wall-row ${i ? "rev" : ""}`}>
            {[...row, ...row, ...row, ...row].map((r, j) => (
              <ReviewCard key={`${r.name}-${j}`} r={r} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

const CtaBand = () => (
  <section className="s-section tight">
    <div className="s-container">
      <div className="s-cta s-reveal">
        <div>
          <span className="s-eyebrow">
            <i /> We reply fast
          </span>
          <h2 style={{ marginTop: 16 }}>Planning a new bathroom? Let's make it beautiful.</h2>
          <p>Send us a photo or a list on WhatsApp and we'll suggest the right products and price.</p>
        </div>
        <a className="s-btn s-btn-gold" href={whatsappLink()} target="_blank" rel="noreferrer">
          <FaWhatsapp /> Start on WhatsApp <FaArrowRight />
        </a>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="s-contact-scene" onMouseMove={spot}>
    <video src={video} muted loop autoPlay playsInline aria-hidden="true" />
    <div className="s-tiles" aria-hidden="true" />
    <div className="s-spot" aria-hidden="true" />
    <div className="s-blob a" />
    <div className="s-blob b" />
    <div className="s-container">
      <div className="s-contact">
        <div>
          <div className="s-reveal">
            <span className="s-eyebrow">
              <i /> Contact us
            </span>
            <h2 className="s-contact-title">
              Let's build your <em className="s-gold">dream bathroom</em>
            </h2>
            <p className="s-contact-lead">
              Questions, prices or bulk orders? Call, WhatsApp or send a message. We usually reply within a
              few hours.
            </p>
          </div>
          <div className="s-info">
            <a className="s-info-item wa s-reveal" href={whatsappLink()} target="_blank" rel="noreferrer">
              <span className="s-info-icon">
                <FaWhatsapp />
              </span>
              <div>
                <small>Fastest reply</small>
                <b>Chat on WhatsApp</b>
              </div>
              <FaArrowRight className="go" />
            </a>
            <a className="s-info-item s-reveal" href={CONTACT.phoneHref}>
              <span className="s-info-icon">
                <FaPhoneAlt />
              </span>
              <div>
                <small>Call us</small>
                <b>{CONTACT.phone}</b>
              </div>
              <FaArrowRight className="go" />
            </a>
            <a className="s-info-item s-reveal" href={directionsLink} target="_blank" rel="noreferrer">
              <span className="s-info-icon">
                <FaMapMarkerAlt />
              </span>
              <div>
                <small>Visit our store</small>
                <b>{CONTACT.address}</b>
              </div>
              <FaArrowRight className="go" />
            </a>
            <a className="s-info-item s-reveal" href={`mailto:${CONTACT.email}`}>
              <span className="s-info-icon">
                <FaEnvelope />
              </span>
              <div>
                <small>Email</small>
                <b>{CONTACT.email}</b>
              </div>
              <FaArrowRight className="go" />
            </a>
          </div>
        </div>
        <div className="s-form-wrap s-reveal">
          <form className="s-form" action={`https://formsubmit.co/${CONTACT.email}`} method="POST">
            <h3>Send us a message</h3>
            <p>Tell us what you need and we'll get back to you with options and prices.</p>
            <div className="s-row2">
              <div className="s-field">
                <input id="c-name" name="name" required placeholder=" " />
                <label htmlFor="c-name">Full name</label>
              </div>
              <div className="s-field">
                <input id="c-email" name="email" type="email" required placeholder=" " />
                <label htmlFor="c-email">Email</label>
              </div>
            </div>
            <div className="s-field">
              <textarea id="c-msg" name="message" rows={5} required placeholder=" " />
              <label htmlFor="c-msg">What are you looking for?</label>
            </div>
            <button type="submit" className="s-btn s-btn-gold" style={{ width: "100%" }}>
              <FaPaperPlane /> Send message
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const Faqs = () => {
  const [open, setOpen] = useState(0);
  return (
    <section id="faqs" className="s-section">
      <div className="s-container s-faq-wrap">
        <div className="s-head s-reveal">
          <div>
            <span className="s-eyebrow">FAQs</span>
            <h2>Questions, answered</h2>
            <p>Can't find what you need? Message us on WhatsApp and we'll help right away.</p>
            <a
              className="s-btn s-btn-wa"
              style={{ marginTop: 22 }}
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp /> Ask a question
            </a>
          </div>
        </div>
        <div className="s-faq">
          {FAQS.map((f, i) => (
            <div key={f.q} className={`s-faq-item s-reveal ${open === i ? "open" : ""}`}>
              <button className="s-faq-q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                {f.q}
                <span className="pm" aria-hidden="true" />
              </button>
              <div className="s-faq-a">
                <div>
                  <p>{f.a}</p>
                </div>
              </div>
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
          <h2>Come and see it in person</h2>
        </div>
      </div>
      <div className="s-map s-reveal">
        <StoreMap />
        <div className="s-map-card">
          <h3>MS Enterprise</h3>
          <p>{CONTACT.address}</p>
          <a className="s-btn s-btn-gold" href={directionsLink} target="_blank" rel="noreferrer">
            <FaDirections /> Get directions
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Website = () => {
  const { data, isLoading } = useQuery(["fetchWebsiteProducts"], fetchWebsiteProducts);
  const products = data?.data?.data ?? [];
  return (
    <SiteLayout title="MS Enterprise | Ceramics & Sanitary Ware, Karachi" overHero>
      <Hero products={products} />
      <Marquee products={products} />
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
