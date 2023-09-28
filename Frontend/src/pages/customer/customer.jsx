import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import AddButton from "../../components/addButton/addButton";
import MySelect from "../../components/select/select";
import Modal from "../../components/modal/modal";
import Table from "../vendor/table";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ProductsInput from "../vendor/productsInp";
import VendorReceipt from "../vendor/receipt";
import { ReceiptLayout } from "../vendor/table";
import SearchBar from "../../components/searchBar/searchBar";
import { useOutlet } from "react-router-dom";
import {
  fetchCustomerReceipt,
  postCustomerReceipt,
} from "../../functions/customer";
import { useMutation, useQuery } from "@tanstack/react-query";

const Customer = () => {
  const [offSet, setOffSet] = useState(1);
  const { data, refetch } = useQuery({
    queryKey: ["fetchCutomer", offSet],
    queryFn: fetchCustomerReceipt,
    enabled: false,
  });
  useEffect(() => {
    refetch();
  }, []);
  const rData = data?.data?.customers;
  const [products] = useOutletContext();
  const mutation = useMutation({
    mutationFn: postCustomerReceipt,
    onSuccess: (data) => {
      console.log(data, "added");
    },
  });
  const [receiptModal, setReceiptModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const tdate = new Date();
  const [receiptData, setReceiptData] = useState({
    date: dayjs(
      `${tdate.getFullYear()}-${tdate.getMonth() + 1}-${tdate.getDate()}`
    ),
    rName: "",
    rDesc: "",
    cash: "",
  });
  const [product, setProduct] = useState([]);
  const [timePeriod, setTimePeriod] = useState("jan");

  const computeTotal = () => {
    let sum = 0;
    product.forEach((elem) => {
      sum += elem?.totalPrice;
    });
    return sum;
  };

  const total = computeTotal();
  const change = receiptData.cash - total;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReceiptData({ ...receiptData, [name]: value });
  };

  const handleproduct = (val, id) => {
    setProduct((prevcomponents) => {
      const updatedComponents = [...prevcomponents];
      updatedComponents[id].product = val;
      return updatedComponents;
    });
  };
  const handleProductChange = (e, id) => {
    const { name, value } = e.target;
    setProduct((prev) => {
      const updatedComponents = [...prev];
      updatedComponents[id][name] = value;
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
        product: "",
        productQty: "",
        totalPrice: 0,
      },
    ]);
  };
  const submit = () => {
    const obj = { ...receiptData, change, total };
    console.log(product);
    product.forEach((prod) => {
      delete prod.product.imgUrl;
      delete prod.product.addToWebsite;
      delete prod.product.userId;
    });
    mutation.mutate({ ...obj, product });
    setShowModal(false);
    setReceiptModal(true);
  };
  return (
    <section>
      <div className="text-dgreen d-flex justify-content-between my-3 align-items-center px-5">
        <h1 className="x-font">Customer Receipts</h1>
        <SearchBar width={"w-23rem"} />
        <div className="d-flex justify-content-center align-items-center ">
          <MySelect
            name="Time"
            setter={setTimePeriod}
            values={["jan", "feb", "mar"]}
            curr={timePeriod}
          />
          <AddButton onChange={setShowModal} />
        </div>
      </div>
      <div>
        <div className="pc_vendor d-flex justify-content-center align-items-start">
          <Table
            headings={["Id", "Name", "Description", "Date", "Amount"]}
            data={rData}
            total={data?.data?.totalCount}
            offSet={[offSet, setOffSet]}
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

              {product.map((prod, index) => {
                return (
                  <div key={index}>
                    <ProductsInput
                      handleProductChange={handleProductChange}
                      setProduct={handleproduct}
                      deleteProduct={deleteProduct}
                      product={prod?.product}
                      qtyVal={prod?.productQty ? prod?.productQty : ""}
                      products={products}
                      unitPrice={prod?.unitPrice ? prod?.unitPrice : 0}
                      totalPrice={prod?.totalPrice ? prod?.totalPrice : 0}
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
                    label={total}
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
                    label={change}
                    type="number"
                    disabled
                  />
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <button
                    onClick={() => {
                      submit();
                    }}
                    type="submit"
                    className="btn bg-dgreen text-light "
                  >
                    Create Receipt!
                  </button>
                </div>
              </div>
            </div>
          </section>
        </Modal>
      )}
      {receiptModal && (
        <Modal>
          <ReceiptLayout
            setShowReceiptModal={setReceiptModal}
            refetch={refetch}
          >
            <VendorReceipt data={{ ...receiptData, change, total, product }} />
          </ReceiptLayout>
        </Modal>
      )}
    </section>
  );
};

export default Customer;
