import { Route, Routes, BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import LoginSignup from "./pages/login/auth";
import LoginFrame from "./pages/login/loginFrame";
import SignupFrame from "./pages/login/signupFrame";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./global.css";
import NavBar from "./components/navbar/navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<LoginSignup />}>
          <Route path="login" element={<LoginFrame />} />
          <Route path="signup" element={<SignupFrame />} />
        </Route>
        <Route path="/lol" element={<NavBar />} />
      </Routes>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
