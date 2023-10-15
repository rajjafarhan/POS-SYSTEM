import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Modal from "../../components/modal/modal";
import ItemDescription from "./itemDesc";
import DeleteItem from "./delItem";
import {
  faArrowLeft,
  faArrowRight,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { search } from "../../helpers/search";


const InventoryTable = ({ pData, refetch, searchParam, searchBy }) => {
  const [currItem, setCurrItem] = useState();
  const [showItemModal, setShowItemModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const headings = [
    "Id",
    "Name",
    "Category",
    "Qty",
    "Cost Price",
      "Selling Price",
    "Total Cost",
    "View",
    "Delete",
  ];

  const data = search(pData, searchParam, searchBy) ?? [];
  let pages = Math.ceil(data?.length / 10);
  let [curr, setcurr] = useState(1);
  const next = () => {
    setcurr(curr + 1);
  };
  const prev = () => {
    setcurr(curr - 1);
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
              <tr key={index} className="cursor-pointer nbg z-0">
                <td className="p-3 text-center">{index + 1}</td>
                <td className="p-3 text-center">
                  {d.label === "" ? "------" : d.label}
                </td>
                <td className="p-3 text-center">{d?.category}</td>
                <td className="p-3 text-center">{d?.qty}</td>
                <td className="p-3 text-center">{d?.costPrice}</td>
                <td className="p-3 text-center">{d?.sellingPrice}</td>
                <td className="p-3 text-center">{d?.qty * d.costPrice}</td>
                <td className="p- text-center text-danger fs-5">
                  <button
                    className="border-0 eye bg-transpaent p-2 rounded-circle text-dgreen bg-transparent "
                    onClick={() => {
                      setCurrItem(d);
                      setShowItemModal(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </td>
                <td className="p- text-center text-danger fs-5">
                  <button
                    className="border-0 bg-transparent text-danger eye p-2  br-40"
                    onClick={() => {
                      setCurrItem(d);
                      setShowDelModal(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td className="p-2 fs-5 text-dgreen text-center">
              Total Records :
            </td>
            <td className="p-2 fs-5 text-dgreen ">{data?.length}</td>
            <td></td>
            <td></td>
            <td></td>
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
            <td className="p-2 text-center">
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
      {showItemModal && (
        <Modal>
          <ItemDescription
            refetch={refetch}
            product={currItem}
            setShowItemModal={setShowItemModal}
          />
        </Modal>
      )}
      {showDelModal && (
        <Modal>
          <DeleteItem
            refetch={refetch}
            currItem={currItem}
            setShowDelModal={setShowDelModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default InventoryTable;
