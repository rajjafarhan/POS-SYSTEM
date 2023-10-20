import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo1 from "../../../assets/logo1.png";
import "./navbarstyle.css";

const CustomNavbar = () => {
  const [navbarBackground, setNavbarBackground] = useState("transparent");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setNavbarBackground("rgb(166, 111, 1)");
      } else {
        setNavbarBackground("transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarStyle = {
    backgroundColor: navbarBackground,
    position: window.scrollY > 0 ? "fixed" : "absolute", // Set to 'fixed' when scrolled
    top: "0",
    width: "100%",
    left: "0",
    zIndex: "1000",
    height: "3.5rem",
    padding:"0",
    margin:"0"
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark " style={navbarStyle}>
      <div className="container-fluid colorfixed">
   
      
      <Link to={'/'}>

        <a className="navbar-brand text-black space  spaceneeded" href="#">
     
          <img src={logo1} alt="ooo" style={{ width: "5rem" }} />
        </a>
      </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
      <Link to={'/'}>

              <a
                className="nav-link active text-light mx-5 fw-bold borderNav"
                aria-current="page"
                href="#"
              ><i className="fa-solid fa-house mx-2"></i>
                Home
              </a>
      </Link>
            </li>

            <li className="nav-item ">
              <a
                className="nav-link text-light fw-bold borderNav mx-5"
                href="#aboutus"
              ><i className="fa-solid fa-circle-info mx-2"></i>
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-light fw-bold borderNav mx-5"
                href="#contactus"
              ><i className="fa-solid fa-phone mx-2"></i>
                Contact Us
              </a>
            </li>
            <li className="nav-item">
      <Link to={'/item'}>

              <a
                className="nav-link text-light fw-bold borderNav mx-5"
                href="#"
              ><i className="fa-solid fa-cubes-stacked mx-2"></i>
                Products
              </a>
      </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;
