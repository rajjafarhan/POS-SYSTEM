import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaBars, FaTimes, FaWhatsapp, FaPhoneAlt, FaFacebookF, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import logo from "../../../assets/logo1.png";
import { CONTACT, whatsappLink } from "./siteData";
import "./site.css";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/item" },
  { label: "About", to: "/#about" },
  { label: "Reviews", to: "/#reviews" },
  { label: "Contact", to: "/#contact" },
];

// Scroll to "#section" after navigating (also when coming from another page).
const useHashScroll = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    // content above the section (products, images) can still be loading and push it
    // down, so line it up again a few times while the page settles
    const go = (behavior) =>
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior, block: "start" });
    const timers = [60, 600, 1400].map((ms, i) => setTimeout(() => go(i === 0 ? "smooth" : "auto"), ms));
    return () => timers.forEach(clearTimeout);
  }, [pathname, hash]);
};

const Header = ({ overHero }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname, hash]);

  const isActive = (to) => {
    const [path, h] = to.split("#");
    return h ? pathname === "/" && hash === `#${h}` : pathname === path && (path !== "/" || !hash);
  };
  const solid = !overHero || scrolled || open;

  return (
    <>
      <header className={`s-header ${solid ? "solid" : ""}`}>
        <div className="s-container s-header-inner">
          <Link to="/" className="s-logo" aria-label="MS Enterprise home">
            <img src={logo} alt="MS Enterprise" />
          </Link>
          <nav className="s-nav" aria-label="Main">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className={isActive(n.to) ? "active" : ""}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="s-header-cta">
            <a className="s-phone" href={CONTACT.phoneHref}>
              <FaPhoneAlt /> {CONTACT.phone}
            </a>
            <a className="s-btn s-btn-gold" href={whatsappLink()} target="_blank" rel="noreferrer">
              <FaWhatsapp /> Order on WhatsApp
            </a>
            <button className="s-burger" aria-label="Menu" onClick={() => setOpen(!open)}>
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>
      <div className={`s-mobile ${open ? "open" : ""}`}>
        {NAV.map((n) => (
          <Link key={n.to} to={n.to}>
            {n.label}
          </Link>
        ))}
        <a className="s-phone-link" href={CONTACT.phoneHref}>
          <FaPhoneAlt /> {CONTACT.phone}
        </a>
        <a className="s-btn s-btn-wa" href={whatsappLink()} target="_blank" rel="noreferrer">
          <FaWhatsapp /> Order on WhatsApp
        </a>
      </div>
    </>
  );
};

const Footer = () => (
  <footer className="s-footer">
    <div className="s-container">
      <div className="s-footer-grid">
        <div>
          <span className="s-footer-logo"><img src={logo} alt="MS Enterprise" /></span>
          <p>
            Ceramics and sanitary ware for modern homes in Karachi. Quality brands, honest prices and
            friendly advice.
          </p>
          <div className="s-social">
            <a href={CONTACT.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
          </div>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to}>{n.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/#faqs">FAQs</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Shop</h4>
          <ul>
            <li>
              <Link to="/item">All products</Link>
            </li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noreferrer">
                Place an order
              </a>
            </li>
            <li>
              <Link to="/#location">Visit our store</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>
              <FaMapMarkerAlt /> {CONTACT.address}
            </li>
            <li>
              <a href={CONTACT.phoneHref}>
                <FaPhoneAlt /> {CONTACT.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`}>
                <FaEnvelope /> {CONTACT.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="s-bigword" aria-hidden="true">
        MS Enterprise
      </div>
      <div className="s-footer-bottom">
        <span>© {new Date().getFullYear()} MS Enterprise. All rights reserved.</span>
        <span>Ceramics &amp; Sanitary · Karachi</span>
      </div>
    </div>
  </footer>
);

const SiteLayout = ({ title = "MS Enterprise", overHero = false, children }) => {
  useHashScroll();
  return (
    <div className="site">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta
          name="description"
          content="MS Enterprise, Karachi: ceramics and sanitary ware. Commodes, vanities, showers and more, with delivery and WhatsApp ordering."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap"
        />
      </Helmet>
      <div className="s-progress" aria-hidden="true" />
      <Header overHero={overHero} />
      <main>{children}</main>
      <Footer />
      <a className="s-fab" href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <FaWhatsapp />
        <span className="s-fab-tip">Chat with us</span>
      </a>
      {/* popups (product quick view) render here so they keep the site styles */}
      <div id="s-portal" />
    </div>
  );
};

export default SiteLayout;
