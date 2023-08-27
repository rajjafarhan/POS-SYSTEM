import "./sidebar.css";
import SideBar from "./sidebar";

const NavBar = () => {
  return (
    <div>
      <SideBar />
      <nav className="d-flex bg-dgreen justify-content-between align-items-center py-3 text-light">
        <div className="ms-5">
          <h2 className="x-font">
            POS <span className="text-yellow">System</span>
          </h2>
        </div>
        <div className="d-flex align-items-center justify-content-around me-5">
          <img src="" alt="" />
          <h5 className="px-4 fs-4">
            Hi, <span className="x-font text-yellow">Usman</span>
          </h5>
          <div className="background_hm bg-yello">
            <button
              className="menu__icon hmbtn"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithBothOptions"
              aria-controls="offcanvasWithBothOptions"
            >
              <span className="bg-yellow"></span>
              <span className="bg-yellow"></span>
              <span className="bg-yellow"></span>
            </button>
          </div>
        </div>
      </nav>
      <div className="my-3"></div>
    </div>
  );
};

export default NavBar;
