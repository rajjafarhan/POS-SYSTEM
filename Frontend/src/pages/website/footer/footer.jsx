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
              <h3 style={{fontSize:"1.5rem",fontWeight:"3rem"}} className="f-caprasimo text-white"> MS <span className="text-mustard f-caprasimo">ENTERPRISE</span></h3>
              <ul>
                
              <li  style={{fontSize:"1rem",color:"black",fontWeight:"4rem"}}> <Link style={{color:"black"}} href="/"> Ceramics and Sanitary</Link></li>

                <li><Link to={'/'}><img style={{height:"7rem",width:"50%"}} src={logo} alt="" /></Link></li>
              </ul>
            </div>
            <div className="col-sm-4 col-md-3 items">
              <h3 className="fs-4">HOME</h3>
              <ul>
                <li><a className="fs-5" href="#aboutus">About Us</a></li>
                <li><a className="fs-5" href="#contactus">Contact Us</a></li>
                <li><a className="fs-5" href="#reviews">Reviews</a></li>
                <li><a className="fs-5" href="#faqs">Faqs</a></li>
                <li><a className="fs-5" href="#location">Our Location</a></li>
              </ul>
            </div>
            <div className="col-sm-4 col-md-3 items">
              <h3 className="fs-4">OUR ITEM&apos;S </h3>
              <ul>
                <li> <Link className="text-black fs-5 " to={`/item`}>Popular category  </Link></li>
                <li><Link className="text-black fs-5" to={`/item`}> Place your Order</Link> </li>
              
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
