import { useState } from "react";
import AddButton from "../../components/addButton/addButton";
import MySelect from "../../components/select/select";
import Modal from "../../components/modal/modal";
import Table from "../vendor/table";
import { TextField } from "@mui/material";
import { rData } from "../vendor/data";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Customer = () => {
  const [showModal, setShowModal] = useState(false);
  const tdate = new Date();
  const [receiptData, setReceiptData] = useState({
    date: dayjs(
      `${tdate.getFullYear()}-${tdate.getMonth() + 1}-${tdate.getDate()}`
    ),
    rName: "",
    rDesc: "",
  });
  const [timePeriod, setTimePeriod] = useState("jan");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReceiptData({ ...receiptData, [name]: value });
  };
  return (
    <section>
      <div className="text-dgreen d-flex justify-content-between my-3 align-items-center px-5">
        <h1 className="x-font">Customer Receipts</h1>
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
        <div className="pc_vendor d-flex justify-content-center align-items-start">
          <Table
            headings={["Id", "Name", "Description", "Date", "Amount"]}
            data={rData}
          />
        </div>
      </div>

      {showModal && (
        <Modal>
          <section className="bg-white rounded p-5 modal_bg">
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="text-dgreen">Create Customer Receipt 🧾</h1>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-dark btn-close border-0 bg-white fs-4"
                  type="button"
                  aria-label="Close"
                ></button>
              </div>
              <div className="mt-5 d-flex ">
                <TextField
                  id="outlined-search"
                  name="rName"
                  value={receiptData.rName}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  label="Name"
                  type="search"
                />
                <div className="mx-1"></div>
                <TextField
                  id="outlined-search"
                  name="rDesc"
                  value={receiptData.rDesc}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  label="Description"
                  type="search"
                />
                <div className="mx-1"></div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={receiptData.date}
                    onChange={(newValue) => {
                      setReceiptData({ ...receiptData, ["date"]: newValue });
                    }}
                  />
                </LocalizationProvider>
              </div>

              {/* {product.map((prod, index) => {
                return (
                  <div key={index}>
                    <ProductsInput
                      handleProductChange={handleProductChange}
                      setProduct={handleproduct}
                      values={["pen", "paper", "rock"]}
                      product={prod?.data?.product}
                      noVal={prod?.data?.totalNo ? prod?.data?.totalNo : ""}
                      qtyVal={
                        prod?.data?.productQty ? prod?.data?.productQty : ""
                      }
                      deleteProduct={deleteProduct}
                      id={index}
                    />
                  </div>
                );
              })} */}
              <div className="d-flex justify-content-center align-items-center mt-4">
                <button
                  className="btn bg-dgreen text-white"
                  //   onClick={addProduct}
                >
                  Add product
                </button>
              </div>
            </div>
          </section>
        </Modal>
      )}
    </section>
  );
};

export default Customer;
