import { Route, Routes, BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import LoginSignup from "./pages/login/auth";
import LoginFrame from "./pages/login/loginFrame";
import SignupFrame from "./pages/login/signupFrame";
import Layout from "./layout/layout";
import Dashboard from "./pages/dashboard/dashboard";
import VendorPage from "./pages/vendor/vendor";
import MyDocument from "./pages/vendor/receipt";
import Customer from "./pages/customer/customer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./global.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<LoginSignup />}>
          <Route path="login" element={<LoginFrame />} />
          <Route path="signup" element={<SignupFrame />} />
        </Route>
        <Route path="/pos" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="vendor" element={<VendorPage />} />
          <Route path="customer" element={<Customer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
