import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faFileInvoice,
  faFileInvoiceDollar,
  faWarehouse,
  faFileArrowDown,
  faGear,
  faRightFromBracket,
  faBars,
  faXmark,
  faKeyboard,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/logo1.png";
import "./shell.css";

// Same menu as before, in the same order.
const NAV = [
  { to: "/pos/dashboard", label: "Dashboard", icon: faChartLine, match: "/pos/dashboard" },
  { to: "/pos/vendor", label: "Vendor Invoice", icon: faFileInvoice, match: "/pos/vendor" },
  { to: "/pos/customer", label: "Customer Invoice", icon: faFileInvoiceDollar, match: "/pos/customer" },
  { to: "/pos/inventory", label: "Stock", icon: faWarehouse, match: "/pos/inventory" },
  { to: "/pos/report", label: "Sales Closing", icon: faFileArrowDown, match: "/pos/report" },
  { to: "/pos/settings/basicinfo", label: "Settings", icon: faGear, match: "/pos/settings" },
];

const TITLES = {
  "/pos/dashboard": "Dashboard",
  "/pos/vendor": "Vendor Invoices",
  "/pos/customer": "Customer Invoices",
  "/pos/inventory": "Stock",
  "/pos/report": "Sales Closing",
  "/pos/settings": "Settings",
};

// Keyboard shortcuts, shown with "?" or the keyboard button in the top bar.
const SHORTCUTS = [
  ["Alt + 1 … 6", "Go to a menu page"],
  ["/", "Search this page"],
  ["N", "New receipt / Add product"],
  ["← →", "Previous / next page of a table"],
  ["↑ ↓ then Enter", "Move between rows and open one"],
  ["Esc", "Close a popup or clear the search"],
  ["?", "Show these shortcuts"],
];

// typing in a field, or a popup is open: leave the keys alone
const busy = (e) =>
  e.target.closest?.("input, textarea, select, [contenteditable='true'], [role='listbox']") ||
  document.getElementById("modal")?.childElementCount > 0;

const today = () =>
  new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

// App frame for the POS: sidebar (always visible on wide screens, a drawer on phones)
// and a top bar with the page title and the user.
const Shell = ({ shopName, children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [help, setHelp] = useState(false);
  const name = localStorage.getItem("name") ?? "";

  useEffect(() => setOpen(false), [pathname]); // close the drawer after choosing a page
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey) return;
      // Alt + 1..6 opens the menu pages in order
      if (e.altKey && /^Digit[1-6]$/.test(e.code)) {
        e.preventDefault();
        navigate(NAV[Number(e.code.slice(5)) - 1].to);
        return;
      }
      if (e.altKey) return;
      if (e.key === "Escape") {
        setHelp(false);
        setOpen(false);
        return;
      }
      if (busy(e)) return;
      if (e.key === "/") {
        const box = document.querySelector(".pos-content [data-search]");
        if (box) {
          e.preventDefault();
          box.focus();
        }
      } else if (e.key === "n" || e.key === "N") {
        const add = document.querySelector(".pos-content [data-add]");
        if (add) {
          e.preventDefault();
          add.click();
        }
      } else if (e.key === "?") {
        setHelp((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/auth/login");
  };
  const title = Object.entries(TITLES).find(([p]) => pathname.startsWith(p))?.[1] ?? "POS";
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    <div className="pos">
      <aside className={`pos-side ${open ? "open" : ""}`} aria-label="Main menu">
        <div className="pos-brand">
          <span className="pos-logo">
            <img src={logo} alt="" />
          </span>
          <div>
            <b>{shopName || "MS Enterprise"}</b>
            <small>Point of Sale</small>
          </div>
          <button className="pos-close" onClick={() => setOpen(false)} aria-label="Close menu">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <nav className="pos-nav">
          <span className="pos-nav-label">Menu</span>
          {NAV.map((n, i) => (
            <Link
              key={n.to}
              to={n.to}
              className={`pos-link ${pathname.startsWith(n.match) ? "active" : ""}`}
              aria-current={pathname.startsWith(n.match) ? "page" : undefined}
              aria-keyshortcuts={`Alt+${i + 1}`}
              title={`${n.label} (Alt+${i + 1})`}
            >
              <span className="ico">
                <FontAwesomeIcon icon={n.icon} />
              </span>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="pos-side-foot">
          <button className="pos-link logout" onClick={logout}>
            <span className="ico">
              <FontAwesomeIcon icon={faRightFromBracket} />
            </span>
            Logout
          </button>
        </div>
      </aside>
      <div className={`pos-scrim ${open ? "open" : ""}`} onClick={() => setOpen(false)} />

      <div className="pos-main">
        <header className="pos-top">
          <button className="pos-burger" onClick={() => setOpen(true)} aria-label="Open menu">
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div className="pos-title">
            <h1>{title}</h1>
            <small>{today()}</small>
          </div>
          <button
            className="pos-keys"
            onClick={() => setHelp(true)}
            aria-label="Keyboard shortcuts"
            title="Keyboard shortcuts (?)"
          >
            <FontAwesomeIcon icon={faKeyboard} />
          </button>
          <div className="pos-user">
            <div className="pos-user-text">
              <small>Welcome back</small>
              <b>{name || "User"}</b>
            </div>
            <span className="pos-avatar">{initials || "U"}</span>
          </div>
        </header>
        <main className="pos-content">{children}</main>
        {help && (
          <div className="pos-help-scrim" onClick={() => setHelp(false)}>
            <div
              className="pos-help"
              role="dialog"
              aria-modal="true"
              aria-label="Keyboard shortcuts"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pos-help-head">
                <b>
                  <FontAwesomeIcon icon={faKeyboard} /> Keyboard shortcuts
                </b>
                <button onClick={() => setHelp(false)} aria-label="Close" autoFocus>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
              <ul>
                {SHORTCUTS.map(([k, d]) => (
                  <li key={k}>
                    <span>{d}</span>
                    <kbd>{k}</kbd>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <footer className="pos-foot">
          © {new Date().getFullYear()} {shopName || "MS Enterprise"} · Point of Sale
        </footer>
      </div>
    </div>
  );
};

export default Shell;
