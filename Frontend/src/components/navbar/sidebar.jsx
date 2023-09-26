import "./sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faChartLine,
  faArrowTrendUp,
  faFileInvoice,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const [currSec, setCurrSec] = useState("dashboard");
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/auth/login");
  };
  return (
    <>
      <div
        className="offcanvas offcanvas-start bg-dgreen text-light"
        data-bs-scroll="true"
        tabIndex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div className="offcanvas-header">
          <h4 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            <FontAwesomeIcon icon={faCartPlus} /> POS System
          </h4>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body d-flex flex-column justify-content-between">
          <div>
            <Link
              to={"/pos/dashboard"}
              onClick={() => {
                setCurrSec("dashboard");
              }}
            >
              <div
                className={`${
                  currSec === "dashboard" ? "bg-hover" : ""
                } h-3rem d-flex align-items-center cursor-pointer opt-hover`}
              >
                <p className="ms-4 fs-5 side">
                  <FontAwesomeIcon icon={faChartLine} />
                  <span className="ms-3">Dashboard</span>
                </p>
              </div>
            </Link>
            <Link
              to={"/pos/vendor"}
              onClick={() => {
                setCurrSec("vendor");
              }}
            >
              <div
                className={`${
                  currSec === "vendor" ? "bg-hover" : ""
                } h-3rem d-flex align-items-center cursor-pointer opt-hover`}
              >
                <p className="ms-4 fs-5 side">
                  <FontAwesomeIcon icon={faArrowTrendUp} />
                  <span className="ms-3">Vendor </span>
                </p>
              </div>
            </Link>
            <Link
              to={"/pos/customer"}
              onClick={() => {
                setCurrSec("invoice");
              }}
            >
              <div
                className={`${
                  currSec === "invoice" ? "bg-hover" : ""
                } h-3rem d-flex align-items-center cursor-pointer opt-hover`}
              >
                <p className="ms-4 fs-5 side">
                  <FontAwesomeIcon icon={faFileInvoice} />
                  <span className="ms-3">Invoice </span>
                </p>
              </div>
            </Link>
            <Link
              to={"/pos/inventory"}
              onClick={() => {
                setCurrSec("inventory");
              }}
            >
              <div
                className={`${
                  currSec === "inventory" ? "bg-hover" : ""
                } h-3rem d-flex align-items-center cursor-pointer opt-hover`}
              >
                <p className="ms-4 fs-5 side">
                  <FontAwesomeIcon icon={faWarehouse} />
                  <span className="ms-3">Inventory </span>
                </p>
              </div>
            </Link>
            <Link
              to={"/pos/settings/basicinfo"}
              onClick={() => {
                setCurrSec("settings");
              }}
            >
              <div
                className={`${
                  currSec === "settings" ? "bg-hover" : ""
                } h-3rem d-flex align-items-center cursor-pointer opt-hover`}
              >
                <p className="ms-4 fs-5 side">
                  <FontAwesomeIcon icon={faChartLine} />
                  <span className="ms-3">Report </span>
                </p>
              </div>
            </Link>
          </div>

          <button className="in-btn text-lgreen" onClick={logout}>
            <div
              className={`
               h-3rem d-flex align-items-center logout cursor-pointer opt-hover`}
            >
              <p className="ms-4 fs-5 side">
                <FontAwesomeIcon icon={faChartLine} />
                <span className="ms-3">Logout</span>
              </p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
