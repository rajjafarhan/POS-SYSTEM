import "./dashboard.css";
import { useState } from "react";
import MySelect from "../../components/select/select";
import DashboardCard from "../../components/dashboardCard/dashboardCard";
import { BarChart, Area } from "./barChart";

const Dashboard = () => {
  const [timePeriod, setTimePeriod] = useState("jan");
  console.log(timePeriod);

  return (
    <section className="d_main">
      <div className="d-flex justify-content-between  align-items-center px-5">
        <h1 className="x-font text-dgreen">Dashboard</h1>
        <MySelect
          name="Time"
          setter={setTimePeriod}
          values={["jan", "feb", "mar"]}
          curr={timePeriod}
        />
      </div>
      <div>
        <div className="container d-flex flex-wrap justify-content-">
          <DashboardCard heading={"Sales"} data={"230234"} theme={"c1"} />
          <DashboardCard heading={"Sales"} data={"230234"} theme={"c2"} />
          <DashboardCard heading={"Sales"} data={"230234"} theme={"c3"} />
          <DashboardCard heading={"Sales"} data={"230234"} theme={"c4"} />
          <DashboardCard heading={"Sales"} data={"230234"} theme={"c5"} />
          <DashboardCard heading={"Sales"} data={"230234"} theme={"c6"} />
        </div>
      </div>
      <h1 className="x-font text-dgreen text-center my-5">
        Sales Vs Expenses Bar Chart
      </h1>
      <div className="mx-5 px-5 d-flex w-100vh flex-column">
        <BarChart />
      </div>
    </section>
  );
};

export default Dashboard;
