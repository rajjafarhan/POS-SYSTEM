import Receipt from "../../components/vendorReceipt/vendorRecipt";
import MySelect from "../../components/select/select";
import { useEffect, useState } from "react";
import AddButton from "../../components/addButton/addButton";
import Modal from "../../components/modal/modal";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import ProductsInput from "./productsInp";
import "./vendor.css";

const VendorPage = () => {
  const [modal, setModal] = useState(false);
  const tdate = new Date();
  const [date, setDate] = useState(
    dayjs(`${tdate.getFullYear()}-${tdate.getMonth() + 1}-${tdate.getDate()}`)
  );
  const [timePeriod, setTimePeriod] = useState("jan");

  let [product, setProduct] = useState([]);

  const handleProductQty = (val, id) => {
    setProduct((prev) => {
      const obj = [...prev];
      obj[id].data.productQty = val;
      return obj;
    });
  };
  const handleTotalNo = (val, id) => {
    setProduct((prev) => {
      const obj = [...prev];
      obj[id].data.totalNo = val;
      return obj;
    });
  };
  const handleproduct = (val, id) => {
    setProduct((prevcomponents) => {
      const updatedComponents = [...prevcomponents];
      updatedComponents[id].data.product = val;
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
        <div className="  d-flex flex-wrap ">
          <Receipt />
          <Receipt />
          <Receipt />
        </div>
      </div>
      {modal && (
        <Modal>
          <section className="bg-white rounded p-5">
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
                <TextField id="outlined-search" label="Name" type="search" />
                <div className="mx-1"></div>
                <TextField
                  id="outlined-search"
                  label="Description"
                  type="search"
                />
                <div className="mx-1"></div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                  />
                </LocalizationProvider>
              </div>

              {product.map((prod, index) => {
                return (
                  <div key={index}>
                    <ProductsInput
                      setqtyVal={handleProductQty}
                      setnoVal={handleTotalNo}
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
              <button onClick={addProduct}>Add product</button>
            </div>
          </section>
        </Modal>
      )}
    </section>
  );
};

export default VendorPage;
