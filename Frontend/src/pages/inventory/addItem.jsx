import { useState } from "react";
import { Switch, TextField } from "@mui/material";
import ImageInput from "../../components/imageInput/imgInput";
import { uploadImageAndGetURL } from "../../firebase/utils";
import { useMutation } from "@tanstack/react-query";
import { addInventory } from "../../functions/inventory";
import LoaderLayout from "../../components/loaders/loaderLayout";
import GeneralLoader from "../../components/loaders/generalLoader";
import { toast } from "react-toastify";
import "../../components/receiptForm/receiptForm.css";
import "./itemModal.css";

const money = (n) => Number(n || 0).toLocaleString("en-US", { maximumFractionDigits: 2 });

const AddItem = ({ refetch, setShowModal }) => {
  const [isloading, setIsLoading] = useState(false);
  const mutation = useMutation({
    mutationFn: addInventory,

    onSuccess: () => {
      toast.success("Product created successfully! ");
      refetch();
    },
    onError: () => {
      toast.error("Ops error! Product could not be saved");
    },
  });
  const [itemData, setItemData] = useState({
    label: "",
    qty: "",
    costPrice: "",
    sellingPrice: "",
    category: "",
    addToWebsite: false,
  });
  const [img, setImg] = useState();

  if (mutation.isLoading || isloading) {
    return (
      <LoaderLayout>
        <GeneralLoader />
      </LoaderLayout>
    );
  }

  const handleChange = (e) => {
    if (e.target.name === "addToWebsite") {
      const { name, checked } = e.target;
      setItemData({ ...itemData, [name]: checked });
    } else {
      const { name, value } = e.target;
      setItemData({ ...itemData, [name]: value });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    let a = new Date();
    if (itemData?.label === "") {
      toast.error("Product name can't be empty! ");
      return;
    }
    if (itemData?.qty === "") {
      toast.error("Product Quantity can't be empty! ");
      return;
    }
    if (itemData?.costPrice === "") {
      toast.error("Product Cost price can't be empty! ");
      return;
    }
    if (itemData?.sellingPrice === "") {
      toast.error("Product selling price can't be empty! ");
      return;
    }
    if (itemData?.category === "") {
      toast.error("Product category can't be empty! ");
      return;
    }
    const num = Math.round(Math.random() * 10000 + a.getMilliseconds());
    let imgUrl = "";
    if (img) {
      setIsLoading(true);
      try {
        imgUrl = await uploadImageAndGetURL(`/shop/${num}`, img);
      } catch (err) {
        setIsLoading(false);
        toast.error("Ops error! Image could not be uploaded");
        return;
      }
    }
    const obj = { ...itemData, qty: Number(itemData?.qty) };

    mutation.mutate({ ...obj, imgUrl });
    setIsLoading(false);
    setShowModal(false);
  };

  const cost = Number(itemData.costPrice) || 0;
  const sell = Number(itemData.sellingPrice) || 0;
  const field = (name, label, type = "text", full = false) => (
    <TextField
      name={name}
      label={label}
      type={type}
      size="small"
      value={itemData?.[name]}
      onChange={handleChange}
      className={full ? "inv_full" : ""}
      fullWidth
    />
  );

  return (
    <section className="rf_modal inv_modal">
      <header className="rf_head">
        <h2 className="m-0">Add Product</h2>
        <button
          onClick={() => setShowModal(false)}
          className="btn-close"
          type="button"
          aria-label="Close"
        ></button>
      </header>

      <div className="rf_body">
        <div className="inv_grid">
          <div className="inv_image">
            <div className="rf_section_title">Image</div>
            <ImageInput type={"add"} setcardImage={setImg} />
            <p className="inv_image_hint">Optional. Click the box to choose a photo.</p>
          </div>
          <div className="inv_fields">
            <div className="rf_section_title inv_full m-0">Details</div>
            {field("label", "Name", "text", true)}
            {field("category", "Category")}
            {field("qty", "Quantity", "number")}
            {field("costPrice", "Cost Price", "number")}
            {field("sellingPrice", "Selling Price", "number")}
            {cost > 0 && sell > 0 ? (
              <div className={`inv_tile inv_full ${sell - cost < 0 ? "inv_low" : "inv_good"}`}>
                <p className="inv_tile_label">Profit per unit</p>
                <p className="inv_tile_value">
                  {money(sell - cost)} ({(((sell - cost) / cost) * 100).toFixed(0)}%)
                </p>
              </div>
            ) : null}
            <label className="inv_switch inv_full">
              Show on website
              <Switch
                name="addToWebsite"
                checked={itemData?.addToWebsite}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
      </div>

      <footer className="rf_foot justify-content-end">
        <div className="rf_actions">
          <button type="button" className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button type="button" className="btn rf_submit" onClick={submit}>
            Add Product
          </button>
        </div>
      </footer>
    </section>
  );
};

export default AddItem;
