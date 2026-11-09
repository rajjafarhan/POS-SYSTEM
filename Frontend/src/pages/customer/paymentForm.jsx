import { useState } from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addCustomerPayment } from "../../functions/customer";
import { formatDate } from "../../helpers/dateFormatter";
import "./returns.css";

const num = (v) => {
  const n = Number(v);
  return isFinite(n) ? n : 0;
};
const money = (n) => num(n).toLocaleString("en-US", { maximumFractionDigits: 2 });

// Record a later payment on a receipt that was paid in part (udhaar).
const PaymentForm = ({ invoice, onClose, onSaved }) => {
  const queryClient = useQueryClient();
  const due = num(invoice.balance);
  const [amount, setAmount] = useState(String(due));
  const [date, setDate] = useState(dayjs());
  const [note, setNote] = useState("");

  const mutation = useMutation({
    mutationFn: addCustomerPayment,
    onSuccess: (res) => {
      const left = num(res?.data?.invoice?.balance);
      toast.success(left > 0 ? `Payment saved. Rs ${money(left)} still due.` : "Payment saved. Paid in full!");
      queryClient.invalidateQueries(["outstanding"]);
      onSaved?.(res?.data?.invoice);
    },
    onError: (e) => toast.error(e?.response?.data?.message ?? "Ops error! Payment could not be saved"),
  });

  const value = num(amount);
  const left = Math.max(0, due - value);
  const submit = () => {
    if (value <= 0) return toast.error("Enter the amount received");
    if (value > due) return toast.error(`Only Rs ${money(due)} is due`);
    mutation.mutate({ id: invoice._id, amount: value, date: date?.toDate?.() ?? new Date(), note });
  };

  return (
    <section className="bg-white rounded p-4 p-md-5 ret_modal" style={{ maxWidth: "36rem" }}>
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h2 className="text-dgreen m-0">Record Payment</h2>
          <p className="ret_muted m-0">
            {invoice.rName || "Walk-in customer"} · receipt of {formatDate(invoice.date)}
          </p>
        </div>
        <button onClick={onClose} className="text-dark btn-close border-0 bg-white fs-4" type="button" aria-label="Close" />
      </div>

      <div className="pay_summary my-4">
        <div>
          <small>Total</small>
          <b>Rs {money(invoice.total)}</b>
        </div>
        <div>
          <small>Paid so far</small>
          <b className="pay_ok">Rs {money(invoice.amountPaid)}</b>
        </div>
        <div>
          <small>Due</small>
          <b className="pay_due">Rs {money(due)}</b>
        </div>
      </div>

      {(invoice.payments ?? []).length > 0 && (
        <div className="mb-4">
          <p className="ret_muted mb-2">Payments so far</p>
          {(invoice.payments ?? []).map((p, i) => (
            <div key={i} className="pay_row">
              <span>
                {formatDate(p.date)}
                {p.note ? <em> · {p.note}</em> : null}
              </span>
              <b>Rs {money(p.amount)}</b>
            </div>
          ))}
        </div>
      )}

      <div className="d-flex flex-wrap gap-3">
        <TextField
          label="Amount received"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          inputProps={{ min: 0, max: due }}
          helperText={value > 0 && value <= due ? (left > 0 ? `Rs ${money(left)} will still be due` : "This clears the full amount") : " "}
          sx={{ flex: "1 1 12rem" }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Date" value={date} onChange={setDate} sx={{ flex: "1 1 10rem" }} />
        </LocalizationProvider>
        <TextField
          label="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Cash, bank transfer…"
          fullWidth
        />
      </div>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <button className="btn btn-outline-secondary" onClick={onClose}>
          Cancel
        </button>
        <button className="btn bg-dgreen text-white px-4" onClick={submit} disabled={mutation.isLoading}>
          {mutation.isLoading ? "Saving…" : "Save payment"}
        </button>
      </div>
    </section>
  );
};

export default PaymentForm;
