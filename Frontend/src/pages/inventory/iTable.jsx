import { pData } from "../vendor/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const InventoryTable = () => {
  const headings = ["Id", "Name", "Qty", "Unit Price", "Total Price"];
  let pages = Math.ceil(pData.length / 10);
  let [curr, setcurr] = useState(1);
  const next = () => {
    setcurr(curr + 1);
  };
  const prev = () => {
    setcurr(curr - 1);
  };
  const currData = pData.slice((curr-1)*10,curr*10)
  console.log(currData)
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
          {currData.map((d, index) => {
            return (
              <tr
                key={index}
                onClick={() => {
                  setShowReceiptModal(true);
                }}
                className="cursor-pointer nbg"
              >
                <td className="p-3 text-center">{d.id}</td>
                <td className="p-3 text-center">{d.name}</td>
                <td className="p-3 text-center">{d.qty}</td>
                <td className="p-3 text-center">{d.unitPrice}</td>
                <td className="p-3 text-center">{d.qty * d.unitPrice}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td className="p-2 fs-5 text-dgreen text-center">
              Total Records :
            </td>
            <td className="p-2 fs-5 text-dgreen ">{pData.length}</td>
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
    </div>
  );
};

export default InventoryTable;
