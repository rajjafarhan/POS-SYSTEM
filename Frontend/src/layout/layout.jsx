import NavBar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
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
