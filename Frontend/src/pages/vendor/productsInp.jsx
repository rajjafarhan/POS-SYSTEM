import { TextField } from "@mui/material";
import { matchSorter } from 'match-sorter';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Autocomplete from "@mui/material/Autocomplete";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import "./vendor.css";
import "../../components/receiptForm/receiptForm.css";

const money = (n) => Number(n || 0).toLocaleString("en-US", { maximumFractionDigits: 2 });

const ProductsInput = ({
  handleProductChange,
  setProduct,
  deleteProduct,
  product,
  unitPrice,
  qtyVal,
  totalPrice,
  products,
  id,
  type,
}) => {
  // Customer receipts use the price typed in the Unit Price box (it starts at the
  // selling price and can be changed when the customer negotiates).
  const isCustomer = type !== "vendor";
  const listPrice = isCustomer ? product?.sellingPrice : product?.costPrice;
  const negotiated = isCustomer && product && Number(unitPrice) !== Number(listPrice);
  useEffect(() => {
    if (type === "vendor") {
      handleProductChange(
        {
          target: {
            name: "totalPrice",
            value: product && qtyVal ? product?.costPrice * qtyVal : 0,
          },
        },
        id
      );
    } else {
      handleProductChange(
        {
          target: {
            name: "totalPrice",
            value: product && qtyVal ? Number(unitPrice || 0) * qtyVal : 0,
          },
        },
        id
      );
    }
  }, [product, qtyVal, unitPrice]);
    const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue ,  { keys: ['label'], threshold: 0.2  });

  return (
    <div className="pi_row">
      <div className="pi_cell pi_product">
        <Autocomplete
          value={product}
          onChange={(e, val) => {
            setProduct(val, id);
          }}
          disablePortal
          filterOptions={filterOptions}
          options={products ?? []}
          renderInput={(params) => <TextField {...params} label="Product" />}
          size="small"
        />
      </div>

      <div className="pi_cell">
        <TextField
          name="unitPrice"
          label="Unit Price"
          type="number"
          size="small"
          fullWidth
          value={isCustomer ? unitPrice : listPrice ?? ""}
          onChange={(e) => handleProductChange(e, id)}
          disabled={!isCustomer || !product}
          inputProps={{ min: 0 }}
        />
        {negotiated ? <span className="pi_hint">List price {money(listPrice)}</span> : null}
      </div>
      <div className="pi_cell">
        <TextField
          value={qtyVal ?? ""}
          name="productQty"
          onChange={(e) => {
            handleProductChange(e, id);
          }}
          label="Qty"
          type="number"
          size="small"
          fullWidth
          inputProps={{ min: 1 }}
        />
      </div>
      <div className="pi_cell">
        <TextField
          value={money(totalPrice)}
          name="totalPrice"
          label="Total"
          size="small"
          fullWidth
          disabled
        />
      </div>
      <button
        type="button"
        title="Remove product"
        onClick={() => {
          deleteProduct(id);
        }}
        className="pi_del"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default ProductsInput;
