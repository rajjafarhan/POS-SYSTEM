import { Outlet } from "react-router-dom";

const LoginSignup = () => {
  return (
    <div className="w-100 hv-100 d-flex justify-content-center flex-wrap align-items-center ">
      <div className="w-37rem  d-flex justify-content-center align-items-center flex-column">
        <img
          className="w-50 h-50 auth-pic"
          src="https://img.freepik.com/free-vector/cloud-pos-abstract-concept-illustration_335657-3903.jpg?w=826&t=st=1693063907~exp=1693064507~hmac=417ec5fd9efa0bbd56d649cf1ebca36aed568ab703bc40a38ecfd51d5a2e8a82"
          alt=""
        />

        <h1 className="x-font fw-bold text-dgreen">POS SYSTEM</h1>
      </div>
      <Outlet />
    </div>
  );
};

export default LoginSignup;

