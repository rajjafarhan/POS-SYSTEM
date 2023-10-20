import React from "react";
import "./footer.css";
import logo from "../../../../assets/logo1.png";
import { Link } from "react-router-dom";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    
    faArrowRight 
  } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className="footer-clean anim  my-2 mt-5">
      <footer className="">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-4 col-md-3 items">
              <h3 style={{fontSize:"2rem",fontWeight:"3rem"}} className="f-caprasimo text-white"> MS <span className="text-mustard f-caprasimo">ENTERPRISE</span></h3>
              <ul>
                
              <li  style={{fontSize:"1rem",color:"white",fontWeight:"4rem"}}> <a href="/"> Ceramics and Sanitary</a></li>

                <li><a href="/"><img style={{height:"7rem",width:"50%"}} src={logo} alt="" /></a></li>
              </ul>
            </div>
            <div className="col-sm-4 col-md-3 items">
              <h3 className="fs-4">HOME</h3>
              <ul>
                <li><a className="fs-5" href="/">About Us</a></li>
                <li><a className="fs-5" href="/">Contact Us</a></li>
                <li><a className="fs-5" href="/">Reviews</a></li>
                <li><a className="fs-5" href="/">Faqs</a></li>
                <li><a className="fs-5" href="/">Our Location</a></li>
              </ul>
            </div>
            <div className="col-sm-4 col-md-3 items">
              <h3 className="fs-4">OUR ITEM&apos;S </h3>
              <ul>
                <li> <Link className="text-black fs-5 " to={`/`}>Popular category  </Link></li>
                <li><Link className="text-black fs-5" to={`/`}> Place your Order</Link> </li>
              
              </ul>
            </div>
            <div className="col-lg-3 items socials">
              <a href="https://www.facebook.com/sobi.rider"><i style={{color:"blue"}} className="fa-brands fa-facebook"></i></a>
              <a href="/"><i style={{color:"red"}} className="fa-brands fa-instagram"></i></a>
              <a href="/"><i style={{color:"yellow"}} className="fa-brands fa-snapchat"></i></a>
              <a href="/"><i style={{color:"blue"}} className="fa-brands fa-twitter"></i></a>
              <p  style={{fontSize:"1.2rem"}}className="copyright">MS ENTERPRISE </p>
              <p  style={{fontSize:"1.2rem"}}className="copyright">Copy Rights Reserved </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
