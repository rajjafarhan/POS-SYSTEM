import "./addButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddButton = ({ onChange, label = "Add" }) => {
  return (
    <button type="button" onClick={() => onChange(true)} className="pos-add" data-add title={label + " (N)"}>
      <FontAwesomeIcon icon={faPlus} />
      <span>{label}</span>
    </button>
  );
};
export default AddButton;
