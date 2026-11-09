import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchInventory } from "../functions/inventory";
import { ToastContainer } from "react-toastify";
import { fetchBasicInfo } from "../functions/settings";
import Shell from "../components/shell/shell";
import "../components/shell/pos-theme.css";

const Layout = ({ children }) => {
  const { refetch, data } = useQuery(["fetchInventory"], fetchInventory);
  const basicInfo = useQuery(["basicInfo"], fetchBasicInfo);
  const basicInfoData = basicInfo?.data?.data?.row;

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  }, [data]);
  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
      <Shell shopName={basicInfoData?.shopName}>
        {children}
        <Outlet context={[data?.data?.result ?? [], refetch, basicInfoData]} />
      </Shell>
    </>
  );
};
export default Layout;
