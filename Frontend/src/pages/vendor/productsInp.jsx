import { TextField } from "@mui/material";
import MySelect from "../../components/select/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ProductsInput = ({
  qtyVal,
  setqtyVal,
  noVal,
  setnoVal,
  product,
  setProduct,
  values,
  id,
  deleteProduct,
}) => {
  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
      <div className="m2">
        <MySelect
          curr={product}
          name={"Product"}
          setter={setProduct}
          values={values}
          id={id}
        />
      </div>
      <div className="m2">
        <TextField
          id="outlined-search"
          value={qtyVal}
          onChange={(e) => {
            setqtyVal(e.target.value, id);
          }}
          label="Quantity"
          type="number"
        />
      </div>
      <div className="m2">
        <TextField
          id="outlined-search"
          value={noVal}
          onChange={(e) => {
            setnoVal(e.target.value, id);
          }}
          label="Total No."
          type="number"
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
