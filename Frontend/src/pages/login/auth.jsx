import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faFileInvoiceDollar, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/logo1.png";
import "./auth.css";

// Sign-in screen: brand panel on the left, form card on the right.
const LoginSignup = () => {
  useEffect(() => {
    document.body.classList.add("no-overflow");
  }, []);
  return (
    <div className="auth">
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
      <section className="auth-brand">
        <div className="auth-logo">
          <img src={logo} alt="MS Enterprise" />
        </div>
        <h1>
          Run your shop
          <br />
          <em>with confidence.</em>
        </h1>
        <p>Sales, stock and reports for MS Enterprise, all in one place.</p>
        <ul>
          <li>
            <span>
              <FontAwesomeIcon icon={faFileInvoiceDollar} />
            </span>
            Receipts, returns and pending payments
          </li>
          <li>
            <span>
              <FontAwesomeIcon icon={faWarehouse} />
            </span>
            Live stock that updates with every sale
          </li>
          <li>
            <span>
              <FontAwesomeIcon icon={faChartLine} />
            </span>
            Dashboard and sales closing reports
          </li>
        </ul>
        <small>© {new Date().getFullYear()} MS Enterprise · Point of Sale</small>
      </section>
      <section className="auth-form">
        <Outlet />
      </section>
    </div>
  );
};

export default LoginSignup;
