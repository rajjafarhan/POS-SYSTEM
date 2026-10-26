import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Modal from "../../components/modal/modal";
import { fetchReturns, deleteReturn } from "../../functions/returns";
import { formatDate } from "../../helpers/dateFormatter";
import "./returns.css";

// History of customer returns: who returned what, when, how much was refunded and why.
const ReturnsList = ({ refetchProducts }) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(["returns"], fetchReturns);
  const [toDelete, setToDelete] = useState(null);
  const returns = data?.data?.returns ?? [];

  const mutation = useMutation({
    mutationFn: deleteReturn,
    onSuccess: () => {
      toast.success("Return deleted, stock adjusted back");
      queryClient.invalidateQueries(["returns"]);
      refetchProducts?.();
    },
    onError: () => toast.error("Ops error! Return could not be deleted"),
  });

  const total = returns.reduce((s, r) => s + (Number(r.total) || 0), 0);

  return (
    <div className="ret_list">
      <div className="ret_table_wrap">
        <table className="ret_table">
          <thead>
            <tr>
              <th>Return date</th>
              <th>Customer</th>
              <th>Items returned</th>
              <th>Sold on</th>
              <th className="ret_n">Refund</th>
              <th>Reason</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="text-center p-4 ret_muted">
                  Loading…
                </td>
              </tr>
            ) : returns.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-4 ret_muted">
                  No returns yet. To record one, open a receipt and click “Return items”.
                </td>
              </tr>
            ) : (
              returns.map((r) => (
                <tr key={r._id}>
                  <td>{formatDate(r.date)}</td>
                  <td>{r.rName || "------"}</td>
                  <td>
                    {(r.items ?? []).map((it, i) => (
                      <div key={i}>
                        {it.product?.label} × {it.qty}
                      </div>
                    ))}
                  </td>
                  <td>{formatDate(r.invoiceDate)}</td>
                  <td className="ret_n fw-bold">{Number(r.total).toLocaleString()}</td>
                  <td>{r.reason || "–"}</td>
                  <td className="text-center">
                    <button
                      className="border-0 bg-transparent text-danger"
                      title="Delete this return"
                      onClick={() => setToDelete(r)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          {returns.length > 0 && (
            <tfoot>
              <tr>
                <td colSpan={4}>Total refunded ({returns.length} returns)</td>
                <td className="ret_n">{total.toLocaleString()}</td>
                <td colSpan={2}></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {toDelete && (
        <Modal>
          <section className="bg-white rounded p-5">
            <h4 className="text-dgreen">Delete this return?</h4>
            <p className="fs-5 text-dgreen">
              The returned items will be taken out of inventory again.
            </p>
            <hr />
            <div className="d-flex justify-content-around">
              <button
                className="btn btn-danger fs-5 px-5"
                onClick={() => {
                  mutation.mutate({ id: toDelete._id });
                  setToDelete(null);
                }}
              >
                Yes
              </button>
              <button
                className="btn bg-dgreen text-light px-5 fs-5"
                onClick={() => setToDelete(null)}
              >
                No
              </button>
            </div>
          </section>
        </Modal>
      )}
    </div>
  );
};

export default ReturnsList;
