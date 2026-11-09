import "./login.css";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../functions/signup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";

const LoginFrame = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("name", data?.data?.name);
      toast.success("Logged in successfully!");
      navigate("/pos/dashboard");
      location.reload();
    },
    onError: (error) => {
      const msg = error?.response?.data?.message;
      if (msg === "User not found") toast.error("User not found!");
      else if (msg === "Invalid credentials") toast.error("Incorrect Password!");
      else toast.error("Could not sign in. Please try again.");
    },
  });
  const [data, setData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    if (data.email === "" || data.password === "") {
      toast.error("Email or Password can't be empty!");
      return;
    }
    mutation.mutate(data);
  };
  return (
    <div className="lg-card">
      <span className="lg-eyebrow">Staff sign-in</span>
      <h1>Welcome back</h1>
      <p className="lg-sub">Sign in to continue to your dashboard</p>
      <form onSubmit={submit} noValidate>
        <label className="lg-field">
          <span>Email</span>
          <div className="lg-input">
            <FontAwesomeIcon icon={faEnvelope} />
            <input
              value={data.email}
              onChange={handleInputChange}
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
            />
          </div>
        </label>
        <label className="lg-field">
          <span>Password</span>
          <div className="lg-input">
            <FontAwesomeIcon icon={faLock} />
            <input
              value={data.password}
              onChange={handleInputChange}
              type={showPass ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="lg-eye"
              onClick={() => setShowPass((v) => !v)}
              aria-label={showPass ? "Hide password" : "Show password"}
            >
              <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} />
            </button>
          </div>
        </label>
        <button type="submit" className="lg-btn" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Signing in…" : "Sign in"}
          {!mutation.isLoading && <FontAwesomeIcon icon={faArrowRight} />}
        </button>
      </form>
      <p className="lg-safe">
        <FontAwesomeIcon icon={faShieldHalved} /> Your shop data is private and secure
      </p>
    </div>
  );
};

export default LoginFrame;
