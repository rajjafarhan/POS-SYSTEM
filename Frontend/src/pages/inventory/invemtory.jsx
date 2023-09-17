import AddButton from "../../components/addButton/addButton";
import MySelect from "../../components/select/select";
import InventoryTable from "./iTable";
import { useState } from "react";
import Modal from "../../components/modal/modal";
import AddItem from "./addItem";
import SearchBar from "../../components/searchBar/searchBar";
import "./inventory.css";

const Inventory = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [searchBy, setSearchBy] = useState("");

  return (
    <section className="d_main">
      <div className="flex-mob text-dgreen subheadiv d-flex justify-content-between my-3 align-items-center pe-5">
        <h1 className="x-font ">Inventory</h1>
        <SearchBar
          value={searchVal}
          setValue={setSearchVal}
          width={"w-30rem"}
        />
        <div className="d-flex bnts justify-content-center align-items-center ">
          <MySelect
            name="Search by"
            setter={setSearchBy}
            values={["name", "category"]}
            curr={searchBy}
          />
          <AddButton onChange={setShowModal} />
        </div>
      </div>
      <div>
        <div className="d-flex t-div justify-content-center align-items-start">
          <InventoryTable searchParam={searchVal} searchBy={searchBy} />
        </div>
      </div>
      {showModal && (
        <Modal>
          {" "}
          <AddItem setShowModal={setShowModal} />
        </Modal>
      )}
    </section>
  );
};

export default Inventory;
