import { Route, Routes, BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import LoginSignup from "./pages/login/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";
import LoginFrame from "./pages/login/loginFrame";
import SignupFrame from "./pages/login/signupFrame";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<LoginSignup />}>
          <Route path="login" element={<LoginFrame />} />
          <Route path="signup" element={<SignupFrame />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
