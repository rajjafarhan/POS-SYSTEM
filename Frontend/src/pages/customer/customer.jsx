import { useEffect, useState } from "react";
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
import ProductsInput from "../vendor/productsInp";
import { products } from "../vendor/data";

const Customer = () => {
  const [showModal, setShowModal] = useState(false);
  const tdate = new Date();
  const [receiptData, setReceiptData] = useState({
    date: dayjs(
      `${tdate.getFullYear()}-${tdate.getMonth() + 1}-${tdate.getDate()}`
    ),
    rName: "",
    rDesc: "",
    total: 0,
    cash: "",
    change: 0,
  });
  const [product, setProduct] = useState([]);
  const [timePeriod, setTimePeriod] = useState("jan");
  useEffect(() => {
    const hanldeTotalChange = () => {
      let sum = 0;
      product.forEach((elem) => {
        sum += elem.data.totalPrice;
        console.log(sum);
      });
      setReceiptData({
        ...receiptData,
        ["total"]: sum,
      });
    };
    hanldeTotalChange();
  }, [product]);
  useEffect(() => {
    setReceiptData({
      ...receiptData,
      ["change"]: receiptData?.cash - receiptData?.total,
    });
  }, [receiptData.total, receiptData.cash]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReceiptData({ ...receiptData, [name]: value });
  };
  const handleColorChange = (val, id) => {
    setProduct((prev) => {
      const newObj = [...prev];
      newObj[id].data.color = val;
      return newObj;
    });
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
          color: "",
          product: "",
          unitPrice: 0,
          totalPrice: 0,
        },
      },
    ]);
  };

  console.log(product);
  return (
    <section>
      <div className="text-dgreen d-flex justify-content-between my-3 align-items-center px-5">
        <h1 className="x-font">Customer Receipts</h1>
        <div className="d-flex justify-content-center align-items-center ">
          <AddButton onChange={setShowModal} />
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
            headings={["Id", "Name", "Description", "Date", "Amount"]}
            data={rData}
          />
        </div>
      </div>

      {showModal && (
        <Modal>
          <section className="bg-white rounded p-5 modal_bg">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const data = { ...receiptData, products: [...product] };
              }}
            >
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

                {product.map((prod, index) => {
                  return (
                    <div key={index}>
                      <ProductsInput
                        handleProductChange={handleProductChange}
                        handleColorChange={handleColorChange}
                        setProduct={handleproduct}
                        values={["pen", "paper", "rock"]}
                        product={prod?.data?.product}
                        color={prod?.data?.color ? prod?.data?.color : ""}
                        qtyVal={
                          prod?.data?.productQty ? prod?.data?.productQty : ""
                        }
                        deleteProduct={deleteProduct}
                        products={products}
                        p={product}
                        unitPrice={
                          prod?.data?.unitPrice ? prod?.data?.unitPrice : 0
                        }
                        totalPrice={
                          prod?.data?.totalPrice ? prod?.data?.totalPrice : 0
                        }
                        id={index}
                      />
                    </div>
                  );
                })}
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <button
                    type="button"
                    className="btn bg-dgreen text-white"
                    onClick={addProduct}
                  >
                    Add product
                  </button>
                </div>
                <div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <h3 className="text-dgreen">Total</h3>
                    <TextField
                      id="outlined-search"
                      label={receiptData.total}
                      type="number"
                      disabled
                    />
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <h3 className="text-dgreen">Cash</h3>
                    <TextField
                      id="outlined-search"
                      label="Cash"
                      name="cash"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      type="number"
                      value={receiptData.cash}
                    />
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <h3 className="text-dgreen">Change</h3>
                    <TextField
                      id="outlined-search"
                      label={receiptData.change}
                      type="number"
                      disabled
                    />
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <button type="submit" className="btn bg-dgreen text-light ">
                      Create Receipt!
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </Modal>
      )}
    </section>
  );
};

export default Customer;
