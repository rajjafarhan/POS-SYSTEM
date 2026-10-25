import "./footer.css";

const Footer = ({ shopName }) => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer_inner">
        <span>
          © {year} {shopName || "POS System"}. All rights reserved.
        </span>
        <span className="footer_brand">POS System</span>
      </div>
    </footer>
  );
};

export default Footer;
