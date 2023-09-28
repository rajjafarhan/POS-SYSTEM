import Receipt from "../../components/vendorReceipt/vendorRecipt";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import Table from "./table";
import VendorReceipt from "./receipt";
import { ReceiptLayout } from "./table";
import SearchBar from "../../components/searchBar/searchBar";
import "./vendor.css";
import { useOutletContext } from "react-router-dom";
import {
  postVendorReceipt,
  fetchVendorReceipts,
} from "../../functions/vendorRec";

const VendorPage = () => {
  const [offSet, setOffSet] = useState(1);
  const { data, refetch } = useQuery({
    queryKey: ["fetchReceipt", offSet],
    queryFn: fetchVendorReceipts,
    enabled: false,
  });
  console.log(data);
  useEffect(() => {
    refetch();
  }, []);
  const rData = data?.data?.vendors;
  const [products] = useOutletContext();
  const mutation = useMutation({
    mutationFn: postVendorReceipt,
    onSuccess: (data) => {
      console.log(data, "added");
    },
  });
  const [receiptModal, setReceiptModal] = useState(false);
  const [modal, setModal] = useState(false);
  const tdate = new Date();
  const [receiptData, setReceiptData] = useState({
    date: dayjs(
      `${tdate.getFullYear()}-${tdate.getMonth() + 1}-${tdate.getDate()}`
    ),
    rName: "",
    rDesc: "",
    cash: "",
  });
  const [timePeriod, setTimePeriod] = useState("jan");
  let [product, setProduct] = useState([]);

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
        unitPrice: 0,
        totalPrice: 0,
      },
    ]);
  };
  const submit = () => {
    const obj = { ...receiptData, change, total };
    mutation.mutate({ ...obj, product });
    // console.log({ ...obj, product });
    //   console.log(receiptData.date.$d);
    setModal(false);
    setReceiptModal(true);
  };
  return (
    <section className="d_main">
      <div className="text-dgreen flex-mob subheadiv d-flex justify-content-between my-3 align-items-center pe-5">
        <h1 className="x-font ">Vendor Receipts</h1>
        <SearchBar width={"w-23rem"} />

        <div className="d-flex justify-content-center bnts align-items-center ">
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
        <div className="d-flex t-div justify-content-center align-items-start">
          <Table
            headings={["Id", "Name", "Description", "Date", "Cost"]}
            data={rData}
            total={data?.data?.totalCount}
            offSet={[offSet, setOffSet]}
          />
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
                    className="btn bg-dgreen text-light "
                    onClick={() => {
                      submit();
                    }}
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

export default VendorPage;
