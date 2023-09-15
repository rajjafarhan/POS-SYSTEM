import { Link } from "react-router-dom";
import { useState } from "react";
import { validateEmail, validatePass } from "../../helpers/validate";

const SignupFrame = () => {
  const [data, setData] = useState({
    name: "",
    lname: "",
    password: "",
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    if (name === "email") {
      console.log(validateEmail(value));
    } else {
      console.log(validatePass(value));
    }
  };

  return (
    <div className="bg-white shadow p-5  pt-5 mx-5">
      <div>
        <h1 className="text-dgreen x-font">SignUp</h1>
        <div className="mt-5">
          <div>
            <div className="input-container">
              <input
                value={data.name}
                onChange={(e) => handleChange(e)}
                type="text"
                className="text-black inp_u"
                name="name"
              />
              <label className={`${data.name === "" ? "" : "inp_d"}`}>
                Name
              </label>
            </div>
            <div className="input-container">
              <input
                value={data.lname}
                onChange={(e) => handleChange(e)}
                type="text"
                className="text-black"
                name="lname"
              />
              <label className={`${data.lname === "" ? "" : "inp_d"}`}>
                {" "}
                Last Name
              </label>
            </div>
            <div className="input-container">
              <input
                value={data.email}
                onChange={(e) => handleChange(e)}
                type="email"
                className="text-black"
                name="email"
              />
              <label className={`${data.email === "" ? "" : "inp_d"}`}>
                Email
              </label>
            </div>
            <div className="input-container">
              <input
                value={data.password}
                onChange={(e) => handleChange(e)}
                type="password"
                className="text-black"
                name="password"
              />
              <label className={`${data.password === "" ? "" : "inp_d"}`}>
                Password
              </label>
            </div>
          </div>
          <div>
            <button className=" my-3 w-50 mx-auto mustard std-btn">
              SignUp
            </button>
            <p>
              Already have an Account? <Link to={"/auth/login"}>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupFrame;
