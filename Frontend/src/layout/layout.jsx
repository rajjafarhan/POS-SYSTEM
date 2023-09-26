import NavBar from "../components/navbar/navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/footer";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
    console.log("boom");
  }, []);
  return (
    <div>
      <NavBar />
      {children}
      <Outlet />
      <Footer />
    </div>
  );
};
export default Layout;
