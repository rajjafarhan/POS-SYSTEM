import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { uploadImageAndGetURL } from "../../firebase/utils.js";
import { updateInventory } from "../../functions/inventory.js";
import { useMutation } from "@tanstack/react-query";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import ImageInput from "../../components/imageInput/imgInput.jsx";
import { useState } from "react";
import { Switch, TextField } from "@mui/material";
import LoaderLayout from "../../components/loaders/loaderLayout.jsx";
import GeneralLoader from "../../components/loaders/generalLoader.jsx";
import { toast } from "react-toastify";
import "../../components/receiptForm/receiptForm.css";
import "./itemModal.css";

const money = (n) => Number(n || 0).toLocaleString("en-US", { maximumFractionDigits: 2 });

const Tile = ({ label, value, tone = "" }) => (
  <div className={`inv_tile ${tone}`}>
    <p className="inv_tile_label">{label}</p>
    <p className="inv_tile_value">{value}</p>
  </div>
);

const ItemDescription = ({ refetch, setShowItemModal, product }) => {
  const mutation = useMutation({
    mutationFn: updateInventory,
    onSuccess: () => {
      toast.success("Product updated successfully! ");
      refetch();
    },
    onError: () => {
      toast.error("Ops error! Product could not be Updated");
    },
  });

  const [isEditable, setIsEditable] = useState(false);
  const [item, setitem] = useState(product);
  const [img, setImg] = useState();
  const [saving, setSaving] = useState(false);

  if (mutation.isLoading || saving) {
    return (
      <LoaderLayout>
        <GeneralLoader />
      </LoaderLayout>
    );
  }
  const handleItemChange = (e) => {
    if (e.target.name === "addToWebsite") {
      const { name, checked } = e.target;
      setitem({ ...item, [name]: checked });
    } else {
      const { name, value } = e.target;
      setitem({ ...item, [name]: value });
    }
  };

  const save = async () => {
    let image;
    try {
      if (img) {
        setSaving(true);
        let a = new Date();
        const num = Math.round(Math.random() * 10000 + a.getMilliseconds());
        image = await uploadImageAndGetURL(`/shop/${num}`, img);
      }
    } catch (e) {
      toast.error("Ops error! Image could not be uploaded");
      setSaving(false);
      return;
    }
    setSaving(false);
    setIsEditable(false);
    mutation.mutate({ ...item, imgUrl: image ?? item.imgUrl });
  };

  const qty = Number(item?.qty) || 0;
  const cost = Number(item?.costPrice) || 0;
  const sell = Number(item?.sellingPrice) || 0;
  const profit = sell - cost;

  const field = (name, label, type = "text", full = false) => (
    <TextField
      name={name}
      label={label}
      type={type}
      size="small"
      value={item?.[name] ?? ""}
      onChange={handleItemChange}
      className={full ? "inv_full" : ""}
      fullWidth
    />
  );

  return (
    <section className="rf_modal inv_modal">
      <header className="rf_head">
        <h2 className="m-0">Product Details</h2>
        <div className="d-flex align-items-center gap-3">
          {!isEditable && (
            <button className="btn btn-sm inv_edit_btn" onClick={() => setIsEditable(true)}>
              <FontAwesomeIcon icon={faPenToSquare} /> Edit
            </button>
          )}
          <button
            onClick={() => setShowItemModal(false)}
            className="btn-close"
            type="button"
            aria-label="Close"
          ></button>
        </div>
      </header>

      <div className="rf_body">
        <div className="inv_grid">
          <div className="inv_image">
            <div className="rf_section_title">Image</div>
            <ImageInput
              setcardImage={setImg}
              img={<img src={item?.imgUrl} className="picture__img" alt="" />}
              setIsEditable={setIsEditable}
            />
            <p className="inv_image_hint">Click the image to change it.</p>
          </div>

          {isEditable ? (
            <div className="inv_fields">
              <div className="rf_section_title inv_full m-0">Edit details</div>
              {field("label", "Name", "text", true)}
              {field("category", "Category")}
              {field("qty", "Quantity", "number")}
              {field("costPrice", "Cost Price", "number")}
              {field("sellingPrice", "Selling Price", "number")}
              <TextField
                name="description"
                label="Description (shown on website)"
                size="small"
                multiline
                minRows={2}
                value={item?.description ?? ""}
                onChange={handleItemChange}
                className="inv_full"
                placeholder="Size, colour, material, warranty…"
                fullWidth
              />
              <label className="inv_switch inv_full">
                Show on website
                <Switch
                  name="addToWebsite"
                  checked={!!item?.addToWebsite}
                  onChange={handleItemChange}
                />
              </label>
            </div>
          ) : (
            <div className="inv_fields">
              <div className="inv_full">
                <p className="inv_name">{item?.label}</p>
                {item?.category ? <span className="inv_chip">{item.category}</span> : null}
              </div>
              <Tile label="In stock" value={qty} tone={qty <= 0 ? "inv_low" : ""} />
              <Tile label="Stock value (cost)" value={money(qty * cost)} />
              <Tile label="Cost price" value={money(cost)} />
              <Tile label="Selling price" value={money(sell)} />
              <Tile
                label="Profit per unit"
                value={`${money(profit)}${cost ? ` (${((profit / cost) * 100).toFixed(0)}%)` : ""}`}
                tone={profit < 0 ? "inv_low" : "inv_good"}
              />
              <Tile label="On website" value={item?.addToWebsite ? "Yes" : "No"} />
              <div className="inv_tile inv_full">
                <p className="inv_tile_label">Description</p>
                <p className="inv_desc">{item?.description || "No description yet. Click Edit to add one."}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="rf_foot justify-content-end">
        <div className="rf_actions">
          {isEditable ? (
            <>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  setitem(product);
                  setImg(undefined);
                  setIsEditable(false);
                }}
              >
                Cancel
              </button>
              <button type="button" className="btn rf_submit" onClick={save}>
                Save changes
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowItemModal(false)}
            >
              Close
            </button>
          )}
        </div>
      </footer>
    </section>
  );
};

export default ItemDescription;
