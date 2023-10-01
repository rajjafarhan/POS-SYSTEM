import "./vendor.css";
import { formatDate } from "../../helpers/dateFormatter";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
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

const Table = ({ offSet, total, headings, data }) => {
  const [currReceipt, setCurrReceipt] = useState({});
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  console.log(data);
  let pages = Math.ceil(total / 10);
  let [curr, setcurr] = useState(1);
  const next = () => {
    setcurr(curr + 1);
    if (total > data?.length && (curr % 5) + 1 === 1) {
      const [val, setOffset] = offSet;
      setOffset(val + 1);
    }
  };
  const prev = () => {
    setcurr(curr - 1);
    if (total > data?.length && ((curr - 1) % 5) + 1 === 1) {
      const [val, setOffset] = offSet;
      setOffset(val - 1);
    }
  };
  const currData = data?.slice((curr - 1) * 10, curr * 10);

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
          {currData?.map((d, index) => {
            return (
              <tr
                key={index}
                onClick={() => {
                  setShowReceiptModal(true);
                  setCurrReceipt(d);
                }}
                className="cursor-pointer nbg"
              >
                <td className="p-3 text-center">{index + 1}</td>
                <td className="p-3 text-center">
                  {d.rName === "" ? "------" : d.rName}
                </td>
                <td className="p-3 text-center">
                  {d.rDesc === "" ? "------" : d.rDesc}
                </td>
                <td className="p-3 text-center">{formatDate(d.date)}</td>
                <td className="p-3 text-center">{d.total}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td className="p-2 fs-5 text-dgreen text-center">
              Total Records :
            </td>
            <td className="p-2 fs-5 text-dgreen ">{total}</td>
            <td className="p-2 fs-5 text-dgreen text-center">
              Page {curr} of {pages}
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
            <td className="p-2 text-center" >
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
            <VendorReceipt data={currReceipt} />
          </ReceiptLayout>
        </Modal>
      )}
    </div>
  );
};

export default Table;
