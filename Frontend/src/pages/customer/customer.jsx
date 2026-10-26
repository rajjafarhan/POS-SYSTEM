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
  deleteCustomerReceipt,
  fetchCustomerReceipt,
  postCustomerReceipt,
} from "../../functions/customer";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoaderLayout from "../../components/loaders/loaderLayout";
import TypeWtiter from "../../components/loaders/typewriter";
import GeneralLoader from "../../components/loaders/generalLoader";
import { validateProducts } from "../../helpers/validate";
import { toast } from "react-toastify";
import ReturnForm from "./returnForm";
import ReturnsList from "./returnsList";
import ReceiptForm from "../../components/receiptForm/receiptForm";

const Customer = () => {
  const [offSet, setOffSet] = useState(1);
  const [query, setQuery] = useState("");
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["fetchCutomer", offSet, query],
    queryFn: fetchCustomerReceipt,
    enabled: false,
  });
  useEffect(() => {
    refetch();
  }, [query, offSet]);
  const rData = data?.data?.customers ?? [];
  const [products, refetchProducts] = useOutletContext();

  const mutation = useMutation({
    mutationFn: postCustomerReceipt,
    onSuccess: () => {
      toast.success("Receipt created successfully! ");
      refetchProducts();
    },
    onError: () => {
      toast.error("Ops error! Receipt could not be saved");
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteCustomerReceipt,
    onSuccess: () => {
      toast.success("Receipt deleted successfully! ");
      refetch();
    },
    onError: () => {
      toast.error("Ops error! Receipt could not be deleted");
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
  const [tab, setTab] = useState("receipts");
  const [returnInvoice, setReturnInvoice] = useState(null);

  if (mutation.isLoading) {
    return (
      <LoaderLayout>
        <TypeWtiter />
      </LoaderLayout>
    );
  }

  if (deleteMutation.isLoading) {
    return (
      <LoaderLayout>
        <GeneralLoader />
      </LoaderLayout>
    );
  }

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
      // start at the list price; the user can change it if the customer negotiates
      updatedComponents[id].unitPrice = val?.sellingPrice ?? "";
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
        productQty: "1",
        totalPrice: 0,
      },
    ]);
  };
  const submit = () => {
    const obj = { ...receiptData, change, total };
    if (product.length === 0) {
      toast.error("There should be atleast 1 product!");
      return;
    }
    const isValid = validateProducts(product);
    if (!isValid) {
      toast.error("Product Name or Product quantity must not be empty!");
      return;
    }
    if (product.some((p) => p.unitPrice === "" || Number(p.unitPrice) < 0)) {
      toast.error("Enter a unit price for every product!");
      return;
    }
    mutation.mutate({ ...obj, product });
    setShowModal(false);
    setReceiptModal(true);
  };
  return (
    <section className="d_main">
      <div className="text-dgreen d-flex justify-content-between my-3 align-items-center px-5">
        <h1 className="x-font">Customer Receipts</h1>
        <SearchBar value={query} setValue={setQuery} width={"w-23rem"} />
        <div className="d-flex justify-content-center align-items-center ">
          <AddButton onChange={setShowModal} />
        </div>
      </div>
      <div className="d-flex justify-content-center mb-3">
        <div className="ret_tabs">
          <button
            className={`ret_tab ${tab === "receipts" ? "active" : ""}`}
            onClick={() => setTab("receipts")}
          >
            Receipts
          </button>
          <button
            className={`ret_tab ${tab === "returns" ? "active" : ""}`}
            onClick={() => setTab("returns")}
          >
            Returns
          </button>
        </div>
      </div>
      {tab === "receipts" ? (
        <div>
          <div className="pc_vendor d-flex justify-content-center align-items-start">
            <Table
              headings={[
                "No.",
                "Name",
                "Description",
                "Date",
                "Amount",
                "Delete",
              ]}
              mutation={deleteMutation}
              data={rData}
              total={data?.data?.totalCount}
              offSet={[offSet, setOffSet]}
              type={"Customer Receipt"}
              onReturn={setReturnInvoice}
            />
          </div>
        </div>
      ) : (
        <ReturnsList refetchProducts={refetchProducts} />
      )}
      {returnInvoice && (
        <Modal>
          <ReturnForm
            invoice={returnInvoice}
            onClose={() => setReturnInvoice(null)}
            onSaved={() => {
              refetchProducts();
              setTab("returns");
            }}
          />
        </Modal>
      )}

      {showModal && (
        <Modal>
          <ReceiptForm
            title="Create Customer Receipt"
            partyLabel="Customer name"
            receiptData={receiptData}
            onFieldChange={handleChange}
            onDateChange={(newValue) => setReceiptData({ ...receiptData, date: newValue })}
            itemCount={product.length}
            onAddProduct={addProduct}
            total={total}
            onSubmit={submit}
            onClose={() => setShowModal(false)}
          >
            {product.map((prod, index) => (
              <ProductsInput
                key={index}
                handleProductChange={handleProductChange}
                setProduct={handleproduct}
                deleteProduct={deleteProduct}
                product={prod?.product}
                qtyVal={prod?.productQty ? prod?.productQty : null}
                products={products}
                unitPrice={prod?.unitPrice ?? ""}
                totalPrice={prod?.totalPrice ? prod?.totalPrice : 0}
                id={index}
                type={"customer"}
              />
            ))}
          </ReceiptForm>
        </Modal>
      )}
      {receiptModal && (
        <Modal>
          <ReceiptLayout
            setShowReceiptModal={setReceiptModal}
            refetch={refetch}
          >
            <VendorReceipt
              type={"Cutomer Receipt"}
              data={{ ...receiptData, change, total, product }}
            />
          </ReceiptLayout>
        </Modal>
      )}
    </section>
  );
};

export default Customer;
