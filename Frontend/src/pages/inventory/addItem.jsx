import { useState } from "react";
import { TextField } from "@mui/material";
import ImageInput from "../../components/imageInput/imgInput";
import { uploadImageAndGetURL } from "../../firebase/utils";

const AddItem = ({ setShowModal }) => {
  const [itemData, setItemData] = useState({
    name: "",
    qty: "",
    unitPrice: "",
    category: "",
  });
  const [img, setImg] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setItemData({ ...itemData, [name]: value });
  };
  // console.log(itemData);

  const submit = async () => {
    const imgURL = await uploadImageAndGetURL("/shop/1", img);
    console.log(imgURL);
  };

  return (
    <section className="bg-white rounded p-5 modal_bg">
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="text-dgreen">Add Product 🗄</h1>
          <button
            onClick={() => setShowModal(false)}
            className="ms-5 text-dark btn-close border-0 bg-white fs-4"
            type="button"
            aria-label="Close"
          ></button>
        </div>
        <div className="d-flex flex-column pt-4">
          <TextField
            id="outlined-search"
            name="name"
            label="Name"
            type="search"
            className="my-2"
            value={itemData.name}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <TextField
            id="outlined-search"
            name="qty"
            label="Quantity"
            type="search"
            className="my-2"
            value={itemData.qty}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <TextField
            id="outlined-search"
            name="unitPrice"
            label="Unit Price"
            type="search"
            className="my-2"
            value={itemData.unitPrice}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <TextField
            id="outlined-search"
            name="category"
            label="Category"
            type="search"
            className="my-2 mb-4"
            value={itemData.category}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <ImageInput type={"add"} setcardImage={setImg} />
        </div>
        <div className="d-flex justify-content-center mt-5">
          <button
            onClick={() => {
              submit();
            }}
            className="btn bg-dgreen text-white fs-5 px-4 py-2"
          >
            Add !
          </button>
        </div>
      </div>
    </section>
  );
};

export default AddItem;
