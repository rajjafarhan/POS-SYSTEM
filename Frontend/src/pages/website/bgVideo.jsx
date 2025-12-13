/* eslint-disable react/display-name */
import React from "react";
import { Link } from 'react-router-dom'
import "./showcase.css";
import video from "../../../assets/ceramics.mp4";

const VideoPlayer = React.memo(() => (
  <video src={video} muted loop autoPlay></video>
));

const Showcase = () => {
  return (
    <>
      <section className="showcase">
        <VideoPlayer />
        <div className="overlay"></div>
        <div className="text">
          <h2>Your Source for </h2>
          <h3>All Things Ceramics and Sanitary.</h3>
          <p>
            MS Enterprise is your trusted partner for all things sanitary and
            ceramics. With a wide array of products catering to various styles
            and preferences, we ensure you find exactly what you're looking for.
          </p>
          <Link to={'/item'}>
            Explore
          </Link>
        </div>
        {/* <ul className="social">
          <li>
            <a href="https://www.facebook.com/sobi.rider">
              <i style={{ color: "blue", fontSize: "4rem" }} className="fa-brands fa-facebook"></i>
            </a>

          </li>
        </ul> */}
      </section>
    </>
  );
};

export default Showcase;
