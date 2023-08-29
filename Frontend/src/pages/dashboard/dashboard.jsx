import "./dashboard.css";
import { useState } from "react";
import MySelect from "../../components/select/select";
import DashboardCard from "../../components/dashboardCard/dashboardCard";

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
        <div className="ms-4 d-flex flex-wrap justify-content-"> 
            <DashboardCard/>
            <DashboardCard/>
            <DashboardCard/>
            <DashboardCard/>

        </div>
      </div>
    </section>
  );
};

export default Dashboard;
