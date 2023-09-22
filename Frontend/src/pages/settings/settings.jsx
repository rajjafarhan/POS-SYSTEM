import { TextField } from "@mui/material";
import "./settings.css";

const BasicInfo = () => {
  return (
    <div className="mms-4 bg-lgreen rounded shadow mw-75">
      <h2 className="m-4 x-font text-dgreen">Basic Info</h2>
      <div>
        <div className="d-flex fd-c justify-content-around mmy-3">
          <TextField
            className="bg-white rounded shadow textfield_w"
            id="outlined-search"
            name="shopName"
            label="Shop Name"
            type="search"
          />
          <TextField
            className="bg-white rounded shadow textfield_w"
            id="outlined-search"
            name="ownerName"
            label="Owner Name"
            type="search"
          />
        </div>
        <div className="d-flex fd-c justify-content-around mmy-5">
          <TextField
            className="bg-white rounded shadow textfield_w"
            id="outlined-search"
            name="shopAddress"
            label="Shop Address"
            type="search"
          />
          <TextField
            className="bg-white rounded shadow textfield_w"
            id="outlined-search"
            name="Shop Contact No"
            label="Shop Contact No"
            type="search"
          />
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button className="btn px-5 py-2 shadow fs-5 bg-dgreen text-light">
          {" "}
          Save
        </button>
      </div>
    </div>
  );
};

export default BasicInfo;
