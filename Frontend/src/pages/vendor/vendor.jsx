import Receipt from "../../components/vendorReceipt/vendorRecipt";
import MySelect from "../../components/select/select";
import { useState } from "react";
import AddButton from "../../components/addButton/addButton";
import Modal from "../../components/modal/modal";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import ProductsInput from "./productsInp";
import Table from "./table";
import { rData } from "./data";
import "./vendor.css";

const VendorPage = () => {
  const [modal, setModal] = useState(false);
  const tdate = new Date();
  const [receiptData, setReceiptData] = useState({
    date: dayjs(
      `${tdate.getFullYear()}-${tdate.getMonth() + 1}-${tdate.getDate()}`
    ),
    rName: "",
    rDesc: "",
  });
  const [timePeriod, setTimePeriod] = useState("jan");
  let [product, setProduct] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReceiptData({ ...receiptData, [name]: value });
  };
  const handleproduct = (val, id) => {
    setProduct((prevcomponents) => {
      const updatedComponents = [...prevcomponents];
      updatedComponents[id].data.product = val;
      return updatedComponents;
    });
  };
  const handleProductChange = (e, id) => {
    const { name, value } = e.target;
    setProduct((prev) => {
      const updatedComponents = [...prev];
      updatedComponents[id]["data"][name] = value;
      return updatedComponents;
    });
  };
  const deleteProduct = (id) => {
    setProduct((prev) => {
      const obj = [...product];
      obj.splice(id, 1);
      return obj;
    });
  };

  const addProduct = () => {
    setProduct((prevComp) => [
      ...prevComp,
      {
        data: {
          productQty: "",
          totalNo: "",
          product: "",
        },
      },
    ]);
  };
  return (
    <section className="d_main">
      <div className="text-dgreen d-flex justify-content-between my-3 align-items-center px-5">
        <h1 className="x-font">Vendor Receipts</h1>
        <div className="d-flex justify-content-center align-items-center ">
          <AddButton onChange={setModal} />
          <MySelect
            name="Time"
            setter={setTimePeriod}
            values={["jan", "feb", "mar"]}
            curr={timePeriod}
          />
        </div>
      </div>
      <div>
        <div className="pc_vendor d-flex justify-content-center align-items-start">
          <Table
            headings={["Id", "Name", "Description", "Date", "Cost"]}
            data={rData}
          />
        </div>
        <div className="mob-vendor  d-flex flex-wrap ">
          <Receipt />
          <Receipt />
          <Receipt />
        </div>
      </div>
      {modal && (
        <Modal>
          <section className="bg-white rounded p-5 modal_bg">
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="text-dgreen">Create Receipt 🧾</h1>
                <button
                  onClick={() => setModal(false)}
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

              {product.map((prod, index) => {
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
              })}
              <div className="d-flex justify-content-center align-items-center mt-4">
                <button
                  className="btn bg-dgreen text-white"
                  onClick={addProduct}
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

export default VendorPage;
