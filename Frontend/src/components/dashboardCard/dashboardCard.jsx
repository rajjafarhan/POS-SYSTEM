import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "@mui/material";
import "./dashboardCard.css";

const DashboardCard = ({ heading, data, theme }) => {
  const colors = {
    c1: "rgba(255, 99, 132, 0.5)",
    c2: "rgba(54, 162, 235, 0.5)",
    c3: "rgba(255, 206, 86, 0.5)",
    c4: "rgba(75, 192, 192, 0.5)",
    c5: "rgba(153, 102, 255, 0.5)",
    c6: "rgba(255, 159, 64, 0.5)",
  };
  return (
    <div
      className={`m-3 w-card dash_card cursor-pointer ${theme} rounded p-3 d-flex flex-column`}
    >
      <div className="my-3">
        <Avatar sx={{ bgcolor: `${colors[theme]}`, width: 56, height: 56 }}>
          <FontAwesomeIcon
            className=" text-dgreen px-5 fs-4"
            icon={faDollarSign}
          />
        </Avatar>
      </div>
      <div>
        <h2 className="text-dgreen">{heading}</h2>
        <p className="fs-5  text-dgreen">
          Total : <span className="fw-bold">{data}</span>{" "}
        </p>
      </div>
    </div>
  );
};

export default DashboardCard;
