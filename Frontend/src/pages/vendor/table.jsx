import "./vendor.css";
import { formatDate } from "../../helpers/dateFormatter";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/modal/modal";
import VendorReceipt from "./receipt";
import { pagerKeys, rowKeys } from "../../helpers/tableKeys";

export const ReceiptLayout = ({ children, setShowReceiptModal, refetch }) => {
  return (
    <section>
      <button
        onClick={() => {
          setShowReceiptModal(false);
          refetch?.();
        }}
        className="text-dark btn-close border-0 bg-white fs-4 abs_tr"
        type="button"
        aria-label="Close"
      ></button>
      {children}
    </section>
  );
};

// onReturn (customer receipts only): shows a "Return items" button on an opened receipt
// bulkMutation: enables row checkboxes and "Delete selected" (called with { ids })
// returnedMap: invoice id -> amount refunded through returns, shown under the amount
const Table = ({
  offSet,
  total,
  headings,
  data,
  mutation,
  type,
  onReturn,
  onPayment,
  bulkMutation,
  returnedMap,
}) => {
  const [currReceipt, setCurrReceipt] = useState({});
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selected, setSelected] = useState(() => new Set());
  const [showBulkModal, setShowBulkModal] = useState(false);
  const toggle = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  let pages = Math.ceil(total / 10);
  let [curr, setcurr] = useState(1);
  let [currentData, setCurrentData] = useState(1);
  const next = () => {
    setcurr(curr + 1);
    setCurrentData(currentData + 1);
    if (total > data?.length && (curr % 5) + 1 === 1) {
      const [val, setOffset] = offSet;
      setOffset(val + 1);
      setCurrentData(1);
    }
  };
  const prev = () => {
    setcurr(curr - 1);
    setCurrentData(currentData - 1);
    if (total > data?.length && ((curr - 1) % 5) + 1 === 1) {
      const [val, setOffset] = offSet;
      setOffset(val - 1);
      setCurrentData(5);
    }
  };
  const currData = data?.slice((currentData - 1) * 10, currentData * 10);
  const pageIds = (currData ?? []).map((d) => String(d._id));
  const allOnPage = pageIds.length > 0 && pageIds.every((id) => selected.has(id));
  const togglePage = () =>
    setSelected((prev) => {
      const next = new Set(prev);
      pageIds.forEach((id) => (allOnPage ? next.delete(id) : next.add(id)));
      return next;
    });
  const open = (d) => {
    setShowReceiptModal(true);
    setCurrReceipt(d);
  };
  const cols = headings.length + (bulkMutation ? 1 : 0);
  const pageCount = isNaN(pages) || pages < 1 ? 1 : pages;
  const from = (curr - 1) * 10 + 1;
  const to = (curr - 1) * 10 + (currData?.length ?? 0);
  return (
    <div
      className="tcard"
      onKeyDown={pagerKeys({ prev, next, canPrev: curr > 1, canNext: curr < pageCount })}
    >
      {bulkMutation && selected.size > 0 && (
        <div className="tcard_bulk">
          <span>
            <b>{selected.size}</b> selected
          </span>
          <button className="tbtn ghost" onClick={() => setSelected(new Set())}>
            Clear
          </button>
          <button className="tbtn danger" onClick={() => setShowBulkModal(true)}>
            <FontAwesomeIcon icon={faTrash} /> Delete selected
          </button>
        </div>
      )}
      <div className="tcard_scroll">
        <table className="t_main">
          <thead>
            <tr>
              {bulkMutation && (
                <th className="t_check">
                  <input
                    type="checkbox"
                    className="tck"
                    title="Select all on this page"
                    checked={allOnPage}
                    onChange={togglePage}
                  />
                </th>
              )}
              {headings.map((heading, ind) => (
                <th key={ind} className={ind === headings.length - 1 ? "t_act" : ""}>
                  {heading === "Delete" ? "" : heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!currData || currData?.length <= 0 ? (
              <tr>
                <td colSpan={cols} className="t_empty">
                  No receipts yet
                </td>
              </tr>
            ) : (
              currData?.map((d, index) => {
                const id = String(d._id);
                return (
                  <tr
                    key={index}
                    className={selected.has(id) ? "is-sel" : ""}
                    tabIndex={0}
                    onKeyDown={rowKeys(() => open(d))}
                    aria-label={`Open receipt for ${d.rName || "unnamed"}`}
                  >
                    {bulkMutation && (
                      <td className="t_check">
                        <input
                          type="checkbox"
                          className="tck"
                          checked={selected.has(id)}
                          onChange={() => toggle(id)}
                        />
                      </td>
                    )}
                    <td className="t_no" onClick={() => open(d)}>
                      {String((curr - 1) * 10 + index + 1).padStart(2, "0")}
                    </td>
                    <td className="t_strong" onClick={() => open(d)}>
                      {d.rName === "" ? "—" : d.rName}
                    </td>
                    <td onClick={() => open(d)}>{d.rDesc === "" ? "—" : d.rDesc}</td>
                    <td onClick={() => open(d)}>{formatDate(d.date)}</td>
                    <td className="t_amt" onClick={() => open(d)}>
                      Rs {Number(d.total).toLocaleString()}
                      {returnedMap?.get(id) ? (
                        <div className="returned_tag">
                          −{returnedMap.get(id).toLocaleString()} returned
                        </div>
                      ) : null}
                      {onPayment && Number(d.balance) > 0 ? (
                        <div className="pay_badge due">Rs {Number(d.balance).toLocaleString()} due</div>
                      ) : onPayment && (d.payments?.length ?? 0) > 1 ? (
                        <div className="pay_badge paid">Paid in full</div>
                      ) : null}
                    </td>
                    <td className="t_act">
                      <button
                        className="icon_btn danger"
                        title="Delete receipt"
                        aria-label="Delete receipt"
                        onClick={() => {
                          setCurrReceipt(d);
                          setShowDeleteModal(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="tcard_foot">
        <span>
          {total ? (
            <>
              Showing <b>{from}–{to}</b> of <b>{total}</b>
            </>
          ) : (
            "No records"
          )}
        </span>
        <div className="pager">
          <button onClick={prev} disabled={curr === 1} aria-label="Previous page">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <span>
            Page {curr} of {pageCount}
          </span>
          <button onClick={next} disabled={curr >= pageCount} aria-label="Next page">
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
      {showReceiptModal && (
        <Modal>
          <ReceiptLayout setShowReceiptModal={setShowReceiptModal}>
            <VendorReceipt
              type={type}
              data={{ ...currReceipt, returned: returnedMap?.get(String(currReceipt._id)) ?? 0 }}
            />
            {(onReturn || onPayment) && (
              <div className="d-flex justify-content-center gap-2 mt-2">
                {onPayment && Number(currReceipt.balance) > 0 && (
                  <button
                    className="btn btn-success fw-semibold"
                    onClick={() => {
                      setShowReceiptModal(false);
                      onPayment(currReceipt);
                    }}
                  >
                    + Record payment (Rs {Number(currReceipt.balance).toLocaleString()} due)
                  </button>
                )}
                {onReturn && (
                  <button
                    className="btn btn-warning fw-semibold"
                    onClick={() => {
                      setShowReceiptModal(false);
                      onReturn(currReceipt);
                    }}
                  >
                    ↩ Return items
                  </button>
                )}
              </div>
            )}
          </ReceiptLayout>
        </Modal>
      )}
      {showBulkModal && (
        <Modal>
          <section className="bg-white rounded p-5">
            <h4 className="text-dgreen">Delete {selected.size} receipts? ⁉</h4>
            <p className="fs-5 text-dgreen">
              The selected receipts will be deleted permanently!
            </p>
            <hr />
            <div className="d-flex justify-content-around">
              <button
                onClick={() => {
                  bulkMutation.mutate({ ids: [...selected] });
                  setSelected(new Set());
                  setShowBulkModal(false);
                }}
                className="btn btn-danger fs-5 px-5"
              >
                Yes
              </button>
              <button
                onClick={() => setShowBulkModal(false)}
                className="btn bg-dgreen text-light px-5 fs-5"
              >
                No
              </button>
            </div>
          </section>
        </Modal>
      )}
      {showDeleteModal && (
        <Modal>
          <section className="bg-white rounded p-5">
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="text-dgreen">Are you sure ⁉</h4>
                  <p className="fs-5 text-dgreen">
                    Receipt will be deleted permanently!
                  </p>
                </div>

                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="text-dark btn-close ms-4 border-0 bg-white fs-4"
                  type="button"
                  aria-label="Close"
                ></button>
              </div>
              <hr />
              <div className="d-flex justify-content-around">
                <button
                  onClick={() => {
                    mutation.mutate({ id: currReceipt._id });
                    setShowDeleteModal(false);
                  }}
                  className="btn btn-danger fs-5 px-5"
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                  }}
                  className="btn bg-dgreen text-light px-5 fs-5"
                >
                  No
                </button>
              </div>
            </div>
          </section>
        </Modal>
      )}
    </div>
  );
};

export default Table;
