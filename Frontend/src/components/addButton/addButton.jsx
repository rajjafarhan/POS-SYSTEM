import "./AddButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddButton = () => {
  return (
    <button className=" mx-3 h-75 rounded bg-dgreen text-light border-0 px-3 py-2 d-flex justify-content-center align-items-center">
      <span className="me-2">Add</span>
      <FontAwesomeIcon icon={faPlus} />
    </button>
  );
};
export default AddButton;
