import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import img from "../../../assets/auth.svg";
import FloatingBackground from "./floatingBg";

const LoginSignup = () => {
  useEffect(() => {
    document.body.classList.add("no-overflow");

    // return () => {
    //   document.body.classList.remove("no-overflow");
    // };
  }, []);
  return (
    <>
      <FloatingBackground />
      <div className="w-100 hv-100 d-flex justify-content-center flex-wrap align-items-center ">
        <div className="w-37rem  d-flex justify-content-center align-items-center flex-column">
          <img className="w-50 h-50 auth-pic" alt="" src={img} />

          <h1 className="x-font fw-bold text-dgreen">POS SYSTEM</h1>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default LoginSignup;
