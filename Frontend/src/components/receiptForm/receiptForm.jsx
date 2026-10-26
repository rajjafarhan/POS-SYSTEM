import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./receiptForm.css";

const money = (n) => Number(n || 0).toLocaleString("en-US", { maximumFractionDigits: 2 });

// Layout of the "create receipt" modal shared by customer and vendor receipts.
// The pages keep the data and logic; this only arranges it.
const ReceiptForm = ({
  title,
  partyLabel = "Name",
  receiptData,
  onFieldChange,
  onDateChange,
  itemCount,
  onAddProduct,
  total,
  onSubmit,
  onClose,
  children,
}) => {
  const hasCash = receiptData.cash !== "" && receiptData.cash !== undefined;
  const diff = Number(receiptData.cash || 0) - total;
  return (
    <section className="rf_modal">
      <header className="rf_head">
        <h2 className="m-0">{title}</h2>
        <button
          onClick={onClose}
          className="btn-close"
          type="button"
          aria-label="Close"
        ></button>
      </header>

      <div className="rf_body">
        <div className="rf_section_title">Details</div>
        <div className="rf_details">
          <TextField
            name="rName"
            value={receiptData.rName}
            onChange={onFieldChange}
            label={partyLabel}
            size="small"
            fullWidth
          />
          <TextField
            name="rDesc"
            value={receiptData.rDesc}
            onChange={onFieldChange}
            label="Description"
            size="small"
            fullWidth
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={receiptData.date}
              onChange={onDateChange}
              slotProps={{ textField: { size: "small", fullWidth: true } }}
            />
          </LocalizationProvider>
        </div>

        <div className="rf_section_title">
          Items <span className="rf_count">{itemCount}</span>
        </div>
        {itemCount === 0 ? (
          <div className="rf_empty">No products yet. Click “Add product” to start.</div>
        ) : (
          <div className="rf_items">{children}</div>
        )}
        <button type="button" className="btn rf_add" onClick={onAddProduct}>
          <FontAwesomeIcon icon={faPlus} /> Add product
        </button>
      </div>

      <footer className="rf_foot">
        <div className="rf_sum">
          <div className="rf_total">
            <span>Total</span>
            <strong>Rs {money(total)}</strong>
          </div>
          <TextField
            name="cash"
            label="Cash received"
            type="number"
            size="small"
            value={receiptData.cash}
            onChange={onFieldChange}
            className="rf_cash"
          />
          <div className={`rf_change ${hasCash && diff < 0 ? "rf_due" : ""}`}>
            <span>{hasCash && diff < 0 ? "Balance due" : "Change"}</span>
            <strong>{hasCash ? money(Math.abs(diff)) : "–"}</strong>
          </div>
        </div>
        <div className="rf_actions">
          <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn rf_submit" onClick={onSubmit}>
            Create Receipt
          </button>
        </div>
      </footer>
    </section>
  );
};

export default ReceiptForm;
