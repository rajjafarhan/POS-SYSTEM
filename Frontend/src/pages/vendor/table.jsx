import "./vendor.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/modal/modal";
import VendorReceipt from "./receipt";

const Table = ({ headings, data }) => {
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  let total = 54;
  let pages = Math.ceil(total / 10);
  let [curr, setcurr] = useState(1);
  const next = () => {
    setcurr(curr + 1);
  };
  const prev = () => {
    setcurr(curr - 1);
  };

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
          {data.map((d, index) => {
            return (
              <tr
                key={index}
                onClick={() => {
                  setShowReceiptModal(true);
                }}
                className="cursor-pointer nbg"
              >
                <td className="p-3 text-center">{d.id}</td>
                <td className="p-3 text-center">{d.rName}</td>
                <td className="p-3 text-center">{d.rDesc}</td>
                <td className="p-3 text-center">{d.rDate}</td>
                <td className="p-3 text-center">{d.rCost}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td className="p-2 fs-5 text-dgreen text-center">
              Total Records :
            </td>
            <td className="p-2 fs-5 text-dgreen ">34</td>
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
          <section>
            <button
              onClick={() => setShowReceiptModal(false)}
              className="text-dark btn-close border-0 bg-white fs-4 abs_tr"
              type="button"
              aria-label="Close"
            ></button>
            <VendorReceipt />
          </section>
        </Modal>
      )}
    </div>
  );
};

export default Table;
