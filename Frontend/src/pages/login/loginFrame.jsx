import "./login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { validateEmail, validatePass } from "../../helpers/validate";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../functions/signup";
import { useNavigate } from "react-router-dom";

const LoginFrame = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data, variables, context) => {

      localStorage.setItem("token", data.data.token);
	    localStorage.setItem("name",data?.data?.name )
      navigate("/pos/dashboard");
      console.log(data);
    },
    onError: (error, variables) => {
      console.log(error);
    },
  });
  const [data, setData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    if (name === "email") {
      console.log(validateEmail(value));
    } else {
      console.log(validatePass(value));
    }
  };

  const submit = (e) => {
    e.preventDefault();
    mutation.mutate(data);
  };
  return (
    <div className="bg-white shadow p-5  pt-5 mx-5 ">
      <div>
        <h1 className="text-dgreen x-font">Login</h1>
        <div className="mt-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const { email, pass } = data;
            }}
          >
            <div>
              <div className="input-container">
                <input
                  value={data.email}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  type="email"
                  className={` text-black inp_u`}
                  name="email"
                />
                <label className={`${data.email === "" ? "" : "inp_d"}`}>
                  Email
                </label>
              </div>
              <div className="input-container">
                <input
                  value={data.password}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  type="password"
                  className={` text-black`}
                  name="password"
                />
                <label className={`${data.password === "" ? "" : "inp_d"}`}>
                  Password
                </label>
              </div>
            </div>
            <div>
              <button
                onClick={submit}
                className=" my-3 w-50 mx-auto mustard std-btn"
              >
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
