import "./login.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const LoginFrame = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="bg-white shadow p-5  pt-5 mx-5 ">
      <div>
        <h1 className="text-dgreen x-font">Login</h1>
        <div className="mt-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div>
              <div className="input-container">
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  className={`text-black inp_u`}
                  name="email"
                />
                <label className={`${email === "" ? "" : "inp_d"}`}>Email</label>
              </div>
              <div className="input-container">
                <input type="password" className="text-black" name="password" />
                <label>Password</label>
              </div>
            </div>
            <div>
              <button className=" my-3 w-50 mx-auto mustard std-btn">
                Login
              </button>
              <p>
                Don't have an Account? <Link to={"/auth/signup"}>Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginFrame;
