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

const SideBar = () => {
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
        <div className="offcanvas-body">
          <Link to={"/pos/dashboard"}>
            <div className="h-3rem d-flex align-items-center cursor-pointer opt-hover">
              <p className="ms-4 fs-5 side">
                <FontAwesomeIcon icon={faChartLine} />
                <span className="ms-3">Dashboard</span>
              </p>
            </div>
          </Link>
          <Link to={"/pos/vendor"}>
            <div className="h-3rem d-flex align-items-center cursor-pointer opt-hover">
              <p className="ms-4 fs-5 side">
                <FontAwesomeIcon icon={faArrowTrendUp} />
                <span className="ms-3">Vendor </span>
              </p>
            </div>
          </Link>
          <div className="h-3rem d-flex align-items-center cursor-pointer opt-hover">
            <p className="ms-4 fs-5 side">
              <FontAwesomeIcon icon={faFileInvoice} />
              <span className="ms-3">Invoice </span>
            </p>
          </div>
          <div className="h-3rem d-flex align-items-center cursor-pointer opt-hover">
            <p className="ms-4 fs-5 side">
              <FontAwesomeIcon icon={faWarehouse} />
              <span className="ms-3">Inventory </span>
            </p>
          </div>
          <div className="h-3rem d-flex align-items-center cursor-pointer opt-hover">
            <p className="ms-4 fs-5 side">
              <FontAwesomeIcon icon={faChartLine} />
              <span className="ms-3">Report </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
