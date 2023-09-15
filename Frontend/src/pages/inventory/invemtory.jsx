import AddButton from "../../components/addButton/addButton";
import MySelect from "../../components/select/select";
import InventoryTable from "./iTable";
import { useState } from "react";
import Modal from "../../components/modal/modal";
import AddItem from "./addItem";

const Inventory = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="d_main">
      <div className="text-dgreen subheadiv d-flex justify-content-between my-3 align-items-center pe-5">
        <h1 className="x-font ">Inventory</h1>
        <div className="d-flex justify-content-center align-items-center ">
          <AddButton onChange={setShowModal} />
          <MySelect
            name="Time"
            // setter={setTimePeriod}
            values={["jan", "feb", "mar"]}
            // curr={timePeriod}
          />
        </div>
      </div>
      <div>
        <div className="pc_vendor justify-content-center align-items-start">
          <InventoryTable />
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
