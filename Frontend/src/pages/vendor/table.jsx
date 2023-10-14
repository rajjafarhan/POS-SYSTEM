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

export const ReceiptLayout = ({ children, setShowReceiptModal, refetch }) => {
  return (
    <section>
      <button
        onClick={() => {
          setShowReceiptModal(false);
          refetch();
        }}
        className="text-dark btn-close border-0 bg-white fs-4 abs_tr"
        type="button"
        aria-label="Close"
      ></button>
      {children}
    </section>
  );
};

const Table = ({ offSet, total, headings, data, mutation, type }) => {
  const [currReceipt, setCurrReceipt] = useState({});
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  console.log(data);
  let pages = Math.ceil(total / 10);
  let [curr, setcurr] = useState(1);
  let [currentData, setCurrentData] = useState(1);
  const next = () => {
    setcurr(curr + 1);
    setCurrentData(currentData + 1);
    if (total > data?.length && (curr % 5) + 1 === 1) {
      const [val, setOffset] = offSet;
      console.log(val, "INvokedddddd");
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
  return (
    <div>
      <table className="t_main p-4 rounde shadow">
        <thead className="m-3 bg-dgreen text-white">
          <tr className="m-3">
            {headings.map((heading, ind) => {
              return (
                <th key={ind} className="p-3 text-center">
                  {heading}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {!currData || currData?.length <= 0 ? (
            <tr>
              <td></td>
              <td></td>
              <td className="p-5 text-dgreen fw-bold fs-4">
                No Data In DataBase!
              </td>
              <td></td>
              <td></td>
            </tr>
          ) : (
            currData?.map((d, index) => {
              console.log(d);
              return (
                <tr key={index} className="cursor-pointer nbg">
                  <td className="p-3 text-center">
                    {index === 9 ? curr * 10 : `${curr - 1}${index + 1}`}
                  </td>
                  <td
                    onClick={() => {
                      setShowReceiptModal(true);
                      setCurrReceipt(d);
                    }}
                    className="p-3 text-center"
                  >
                    {d.rName === "" ? "------" : d.rName}
                  </td>
                  <td
                    onClick={() => {
                      setShowReceiptModal(true);
                      setCurrReceipt(d);
                    }}
                    className="p-3 text-center"
                  >
                    {d.rDesc === "" ? "------" : d.rDesc}
                  </td>
                  <td
                    onClick={() => {
                      setShowReceiptModal(true);
                      setCurrReceipt(d);
                    }}
                    className="p-3 text-center"
                  >
                    {formatDate(d.date)}
                  </td>
                  <td
                    onClick={() => {
                      setShowReceiptModal(true);
                      setCurrReceipt(d);
                    }}
                    className="p-3 text-center"
                  >
                    {d.total}
                  </td>
                  <td
                    className="p-3 text-center border-0 bg-transparent text-danger p-2  "
                    onClick={() => {
                      setCurrReceipt(d);
                      setShowDeleteModal(true);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ fontSize: "1.2rem" }}
                    />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
        <tfoot>
          <tr>
            <td className="p-2 fs-5 text-dgreen text-center">
              Total Records :
            </td>
            <td className="p-2 fs-5 text-dgreen ">{total ?? 0}</td>
            <td className="p-2 fs-5 text-dgreen text-center">
              Page {curr} of {isNaN(pages) ? 1 : pages}
            </td>
            <td className="p-2 text-center">
              <button
                onClick={prev}
                disabled={curr === 1}
                className="border-0  text-dgreen bg-white fs-4"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
            </td>
            <td className="p-2 text-center" s>
              <button
                onClick={next}
                disabled={curr === pages}
                className="border-0  text-dgreen bg-white fs-4"
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
      {showReceiptModal && (
        <Modal>
          <ReceiptLayout setShowReceiptModal={setShowReceiptModal}>
            <VendorReceipt type={type} data={currReceipt} />
          </ReceiptLayout>
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
