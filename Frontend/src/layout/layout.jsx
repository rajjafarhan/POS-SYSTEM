import NavBar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};
export default Layout;
