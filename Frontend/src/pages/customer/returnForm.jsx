import { useState } from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchReturns, postReturn } from "../../functions/returns";
import { formatDate } from "../../helpers/dateFormatter";
import "./returns.css";

const num = (v) => {
  const n = Number(v);
  return isFinite(n) ? n : 0;
};
// what the customer actually paid per unit on this line (negotiated price if one was set)
const paidUnitPrice = (item) => {
  const qty = num(item?.productQty);
  if (item?.unitPrice !== undefined && item?.unitPrice !== "") return num(item.unitPrice);
  if (qty && num(item?.totalPrice)) return num(item.totalPrice) / qty;
  return num(item?.product?.sellingPrice);
};

// Form for returning some or all items of one customer receipt.
const ReturnForm = ({ invoice, onClose, onSaved }) => {
  const queryClient = useQueryClient();
  const previous = useQuery(["returns", invoice._id], fetchReturns);
  const [qty, setQty] = useState({});
  const [reason, setReason] = useState("");
  const [date, setDate] = useState(dayjs());

  const mutation = useMutation({
    mutationFn: postReturn,
    onSuccess: () => {
      toast.success("Return saved and stock updated!");
      queryClient.invalidateQueries(["returns"]);
      onSaved?.();
      onClose();
    },
    onError: (e) => {
      toast.error(e?.response?.data?.message ?? "Ops error! Return could not be saved");
    },
  });

  const returnedBefore = new Map();
  (previous.data?.data?.returns ?? []).forEach((r) =>
    (r.items ?? []).forEach((it) =>
      returnedBefore.set(it.line, (returnedBefore.get(it.line) ?? 0) + num(it.qty))
    )
  );

  const lines = (invoice.product ?? []).map((item, line) => {
    const sold = num(item?.productQty);
    const already = returnedBefore.get(line) ?? 0;
    const price = paidUnitPrice(item);
    const take = Math.min(num(qty[line]), sold - already);
    return { line, item, sold, already, left: sold - already, price, take };
  });
  const refund = lines.reduce((s, l) => s + l.take * l.price, 0);
  const nothingLeft = lines.every((l) => l.left <= 0);

  const submit = () => {
    const items = lines.filter((l) => l.take > 0).map((l) => ({ line: l.line, qty: l.take }));
    if (items.length === 0) {
      toast.error("Enter how many of an item came back!");
      return;
    }
    mutation.mutate({ invoiceId: invoice._id, items, reason, date: date?.toDate?.() ?? new Date() });
  };

  return (
    <section className="bg-white rounded p-4 p-md-5 modal_bg ret_modal">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h2 className="text-dgreen m-0">Return Items</h2>
          <p className="ret_muted m-0">
            Receipt of {invoice.rName || "walk-in customer"} · {formatDate(invoice.date)} · total{" "}
            {invoice.total}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-dark btn-close border-0 bg-white fs-4"
          type="button"
          aria-label="Close"
        ></button>
      </div>

      {previous.isLoading ? (
        <p className="my-4 ret_muted">Loading…</p>
      ) : (
        <>
          <div className="ret_table_wrap my-4">
            <table className="ret_table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th className="ret_n">Sold</th>
                  <th className="ret_n">Returned</th>
                  <th className="ret_n">Price paid</th>
                  <th className="ret_n">Return qty</th>
                  <th className="ret_n">Refund</th>
                </tr>
              </thead>
              <tbody>
                {lines.map((l) => (
                  <tr key={l.line}>
                    <td>{l.item?.product?.label ?? "Unknown product"}</td>
                    <td className="ret_n">{l.sold}</td>
                    <td className="ret_n">{l.already || "–"}</td>
                    <td className="ret_n">{l.price.toLocaleString()}</td>
                    <td className="ret_n">
                      <TextField
                        type="number"
                        size="small"
                        value={qty[l.line] ?? ""}
                        placeholder="0"
                        disabled={l.left <= 0}
                        onChange={(e) => setQty({ ...qty, [l.line]: e.target.value })}
                        inputProps={{ min: 0, max: l.left, style: { width: "4.5rem" } }}
                        helperText={l.left > 0 ? `max ${l.left}` : "all returned"}
                      />
                    </td>
                    <td className="ret_n">{(l.take * l.price).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex flex-wrap gap-3 align-items-start">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Return date" value={date} onChange={setDate} />
            </LocalizationProvider>
            <TextField
              label="Reason (optional)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="flex-grow-1"
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4 className="text-dgreen m-0">Refund: {refund.toLocaleString()}</h4>
            <button
              className="btn bg-dgreen text-white px-4"
              onClick={submit}
              disabled={mutation.isLoading || nothingLeft}
            >
              {mutation.isLoading ? "Saving…" : "Save Return"}
            </button>
          </div>
          <p className="ret_muted mt-2 mb-0">
            Returned items are added back to inventory and subtracted from sales in reports.
          </p>
        </>
      )}
    </section>
  );
};

export default ReturnForm;
