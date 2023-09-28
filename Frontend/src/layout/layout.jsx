import NavBar from "../components/navbar/navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/footer";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchInventory } from "../functions/inventory";

const Layout = ({ children }) => {
  const { data } = useQuery(["fetchInventory"], fetchInventory);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  }, [data]);
  return (
    <div>
      {console.log(data)}
      <NavBar />
      {children}
      <Outlet context={[data?.data?.result]} />
      <Footer />
    </div>
  );
};
export default Layout;
