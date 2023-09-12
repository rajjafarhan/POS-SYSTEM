import { TextField } from "@mui/material";
import AddButton from "../../components/addButton/addButton";
import MySelect from "../../components/select/select";
import InventoryTable from "./iTable";
import { useState } from "react";
import Modal from "../../components/modal/modal";

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
          <section className="bg-white rounded p-5 modal_bg">
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="text-dgreen">Add Item 🗄</h1>
                <button
                  onClick={() => setShowModal(false)}
                  className="ms-5 text-dark btn-close border-0 bg-white fs-4"
                  type="button"
                  aria-label="Close"
                ></button>
              </div>
              <div className="d-flex flex-column pt-4">
                <TextField
                  id="outlined-search"
                  name="name"
                  label="Name"
                  type="search"
                  className="my-2"
                />
                <TextField
                  id="outlined-search"
                  name="qty"
                  label="Quantity"
                  type="search"
                  className="my-2"
                />
                <TextField
                  id="outlined-search"
                  name="unitPrice"
                  label="Unit Price"
                  type="search"
                  className="my-2"
                />
              </div>
              <div className="d-flex justify-content-center mt-5">

              <button className="btn bg-dgreen text-white fs-5 px-4 py-2">Add !</button>
              </div>
            </div>
          </section>
        </Modal>
      )}
    </section>
  );
};

export default Inventory;
