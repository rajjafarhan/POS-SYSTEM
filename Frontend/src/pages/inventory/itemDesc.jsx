import { TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import ImageInput from "../../components/imageInput/imgInput.jsx";
import { useState } from "react";

const ItemAttribute = ({ handleItemChange, product, isEditable }) => {
  return (
    <>
      <div className="mt-3  d-flex justify-content-between align-items-center">
        <h3 className="text-dgreen w-35">Name</h3>
        {!isEditable ? (
          <p className="fs-5 text-wrap w-65">{product.name}</p>
        ) : (
          <input
            name="name"
            onChange={(e) => {
              handleItemChange(e);
            }}
            className="w-65 border-1 fs-5 p-2"
            type="text"
            value={product.name}
          />
        )}
      </div>
      <div className="mt-3  d-flex justify-content-between align-items-center">
        <h3 className="text-dgreen w-35">Category</h3>
        {!isEditable ? (
          <p className="fs-5 text-wrap w-65">{product?.category}</p>
        ) : (
          <input
            className="w-65 border-1 fs-5 p-2"
            type="text"
            name="category"
            onChange={(e) => {
              handleItemChange(e);
            }}
            value={product?.category}
          />
        )}
      </div>
      <div className="mt-3  d-flex justify-content-between align-items-center">
        <h3 className="text-dgreen w-35">Qty</h3>
        {!isEditable ? (
          <p className="fs-5 text-wrap w-65">{product.qty}</p>
        ) : (
          <input
            name="qty"
            onChange={(e) => {
              handleItemChange(e);
            }}
            className="w-65 border-1 fs-5 p-2"
            type="text"
            value={product.qty}
          />
        )}
      </div>
      <div className="mt-3  d-flex justify-content-between align-items-center">
        <h3 className="text-dgreen w-35">Unit Price</h3>
        {!isEditable ? (
          <p className="fs-5 text-wrap w-65">{product.unitPrice}</p>
        ) : (
          <input
            name="unitPrice"
            onChange={(e) => {
              handleItemChange(e);
            }}
            className="w-65 border-1 fs-5 p-2"
            type="text"
            value={product.unitPrice}
          />
        )}
      </div>
      <div className="mt-3  d-flex justify-content-between align-items-center">
        <h3 className="text-dgreen w-35">Total</h3>
        {!isEditable ? (
          <p className="fs-5 text-wrap w-65">
            {product.qty * product.unitPrice}
          </p>
        ) : (
          <input
            className="w-65 border-1 fs-5 p-2"
            type="text"
            readOnly
            value={product.qty * product.unitPrice}
          />
        )}
      </div>
    </>
  );
};

const ItemDescription = ({ setShowItemModal, product }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [item, setitem] = useState(product);
  const [img, setImg] = useState();

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setitem({ ...item, [name]: value });
  };
  

  return (
    <section className="bg-white rounded p-5 modal_bg">
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="text-dgreen">Product Details 🧾</h1>
          <button
            onClick={() => {
              setIsEditable(true);
            }}
            className="bg-none ms-5 border-0 bg-white text-grey"
          >
            <FontAwesomeIcon className="fs-3" icon={faPenToSquare} />
          </button>
          <button
            onClick={() => setShowItemModal(false)}
            className="text-dark btn-close ms-2 border-0 bg-white fs-4"
            type="button"
            aria-label="Close"
          ></button>
        </div>
        <hr />
        <div className="d-flex flex-column ">
          <ItemAttribute
            handleItemChange={handleItemChange}
            product={item}
            isEditable={isEditable}
          />
        </div>
        <div className="d-flex flex-column align-items-start">
          <h3 className="text-dgreen w-50 my-4">Product Image:</h3>

          <ImageInput
            setcardImage={setImg}
            img={
              <img
                src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                alt=""
              />
            }
            setIsEditable={setIsEditable}
          />
        </div>
        <div className="d-flex justify-content-center mt-5">
          <button
            onClick={() => {
              setIsEditable(false);
              console.log(item);
            }}
            className="btn bg-dgreen text-white px-4 py-2"
            disabled={!isEditable}
          >
            Save
          </button>
        </div>
      </div>
    </section>
  );
};

export default ItemDescription;
