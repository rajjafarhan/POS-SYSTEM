import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import "./dashboardCard.css";

const DashboardCard = () => {
  return (
    <div className=" mx-4 my-3 cursor-pointer bg-dark rounded w-20rem d-flex dash_card h-13rem ">
      <div className="d-flex flex-column align-items-center justify-content-between">
        <div className="my-3 ms-3 d-flex justify-content-center align-items-center fs-4 bg-light w-75 h-25 rounded-circle">
          <FontAwesomeIcon icon={faDollarSign} />
        </div>
        <div className="ms-3">
          <h5 className=" text-light fs-3 mb-0 ">Sales</h5>
          <p className="text-light fs-5 mt-0 pt-0">$200</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
