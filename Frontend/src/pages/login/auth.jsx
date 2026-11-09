import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxesStacked, faChartLine, faReceipt } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/logo1.png";
import "./auth.css";

const FEATURES = [
  { icon: faReceipt, title: "Receipts & payments", text: "Sales, returns and money still due" },
  { icon: faBoxesStacked, title: "Live stock", text: "Updates with every sale and purchase" },
  { icon: faChartLine, title: "Reports", text: "Dashboard and sales closing in one tap" },
];

// Sign-in screen: brand panel on the left, form card on the right.
const LoginSignup = () => {
  useEffect(() => {
    document.body.classList.add("no-overflow");
  }, []);
  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
      <div className="auth">
        <section className="auth-brand">
          <div className="auth-id">
            <div className="auth-logo">
              <img src={logo} alt="MS Enterprise" />
            </div>
            <div>
              <b>MS Enterprise</b>
              <span>Point of Sale</span>
            </div>
          </div>
          <div className="auth-copy">
            <h1>
              Run your shop
              <br />
              <em>with confidence.</em>
            </h1>
            <p>Everything your counter needs — sales, stock and reports — in one simple place.</p>
          </div>
          <div className="auth-feats">
            {FEATURES.map((f, i) => (
              <div className="auth-feat" key={f.title} style={{ animationDelay: `${0.15 + i * 0.1}s` }}>
                <span>
                  <FontAwesomeIcon icon={f.icon} />
                </span>
                <div>
                  <b>{f.title}</b>
                  <small>{f.text}</small>
                </div>
              </div>
            ))}
          </div>
          <small className="auth-copy-r">© {new Date().getFullYear()} MS Enterprise</small>
        </section>
        <section className="auth-form">
          <Outlet />
        </section>
      </div>
    </>
  );
};

export default LoginSignup;
