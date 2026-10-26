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
  deleteVendorReceipt,
} from "../../functions/vendorRec";
import LoaderLayout from "../../components/loaders/loaderLayout";
import TypeWtiter from "../../components/loaders/typewriter";
import GeneralLoader from "../../components/loaders/generalLoader";
import { toast } from "react-toastify";
import { validateProducts } from "../../helpers/validate";
import ReceiptForm from "../../components/receiptForm/receiptForm";

const VendorPage = () => {
  const [offSet, setOffSet] = useState(1);
  const [query, setQuery] = useState("");
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["fetchReceipt", offSet, query],
    queryFn: fetchVendorReceipts,
    enabled: false,
  });
  console.log(data);
  useEffect(() => {
    refetch();
  }, [query, offSet]);
  const rData = data?.data?.vendors ?? [];
  const [products, refetchProducts] = useOutletContext();
  const mutation = useMutation({
    mutationFn: postVendorReceipt,
    onSuccess: () => {
      toast.success("Receipt created successfully! ");
      refetchProducts();
    },
    onError: () => {
      toast.error("Ops error! Receipt could not be saved");
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteVendorReceipt,
    onSuccess: () => {
      toast.success("Receipt Deleted Successfully! ");
      refetch();
    },
    onError: () => {
      toast.error("Ops Error! Receipt could not be deleted.");
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
  let [product, setProduct] = useState([]);

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
    mutation.mutate({ ...obj, product });
    setModal(false);
    setReceiptModal(true);
  };
  return (
    <section className="d_main">
      <div className="text-dgreen flex-mob subheadiv d-flex justify-content-between my-3 align-items-center pe-5">
        <h1 className="x-font ">Vendor Receipts</h1>
        <SearchBar value={query} setValue={setQuery} width={"w-23rem"} />

        <div className="d-flex justify-content-center bnts align-items-center ">
          <AddButton onChange={setModal} />
        </div>
      </div>
      <div>
        <div className="d-flex t-div justify-content-center align-items-start">
          <Table
            headings={["No.", "Name", "Description", "Date", "Cost", "Delete"]}
            type={"Vendor Receipt"}
            mutation={deleteMutation}
            data={rData}
            total={data?.data?.totalCount}
            offSet={[offSet, setOffSet]}
          />
        </div>
      </div>
      {modal && (
        <Modal>
          <ReceiptForm
            title="Create Vendor Receipt"
            partyLabel="Vendor name"
            receiptData={receiptData}
            onFieldChange={handleChange}
            onDateChange={(newValue) => setReceiptData({ ...receiptData, date: newValue })}
            itemCount={product.length}
            onAddProduct={addProduct}
            total={total}
            onSubmit={submit}
            onClose={() => setModal(false)}
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
                unitPrice={prod?.unitPrice ? prod?.unitPrice : 0}
                totalPrice={prod?.totalPrice ? prod?.totalPrice : 0}
                id={index}
                type={"vendor"}
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
              type={"Vendor Receipt"}
              data={{ ...receiptData, change, total, product }}
            />
          </ReceiptLayout>
        </Modal>
      )}
    </section>
  );
};

export default VendorPage;
