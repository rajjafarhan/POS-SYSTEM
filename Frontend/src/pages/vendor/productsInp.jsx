import { TextField } from "@mui/material";
import MySelect from "../../components/select/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Autocomplete from "@mui/material/Autocomplete";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ProductsInput = ({
  handleProductChange,
  qtyVal,
  color,
  product,
  setProduct,
  values,
  id,
  deleteProduct,
}) => {
  const obj = [
    {
      label: "pen",
    },
    {
      label: "paper",
    },
    {
      label: "rocks",
    },
  ];
  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
      <div className="m2">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={obj}
          renderInput={(params) => <TextField {...params} label="Product" />}
          size="small"
        />
      </div>
      <div className="m2">
        <TextField
          id="outlined-search"
          name="pricePerUnit"
          onChange={(e) => {
            handleProductChange(e, id);
          }}
          label="Price Per Unit"
          type="number"
          value={100}
          disabled
          size="small"
        />
      </div>
      <div className="m2">
        <TextField
          id="outlined-search"
          value={qtyVal}
          name="productQty"
          onChange={(e) => {
            handleProductChange(e, id);
          }}
          label="Quantity"
          type="number"
          size="small"
        />
      </div>
      <div className="m2">
        <TextField
          id="outlined-search"
          value={color}
          name="color"
          onChange={(e) => {
            handleProductChange(e, id);
          }}
          label="Color"
          type="search"
          size="small"
        />
      </div>
      <div className="m2">
        <TextField
          id="outlined-search"
          value={1000}
          name="totalPrice"
          label="Total Price"
          size="small"
          type="search"
          disabled
        />
      </div>
      <button
        onClick={() => {
          deleteProduct(id);
        }}
        className="text-danger  border-0 bg-white fs-4"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default ProductsInput;
