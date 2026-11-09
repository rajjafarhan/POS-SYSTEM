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
import { fuzzySearch } from "../../helpers/search";
import { pagerKeys, rowKeys } from "../../helpers/tableKeys";


const InventoryTable = ({ curr, setcurr, pData, refetch, searchParam}) => {
  const [currItem, setCurrItem] = useState();
  const [showItemModal, setShowItemModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const headings = [
    "No.",
    "Name",
    "Category",
    "Qty",
    "Cost Price",
    "Selling Price",
    "Total Cost",
    "Actions",
  ];

  const data = fuzzySearch(pData, searchParam) ?? [];
  let pages = Math.ceil(data?.length / 10);
  const next = () => {
    setcurr(curr + 1);
  };
  const prev = () => {
    setcurr(curr - 1);
  };

  const currData = data?.slice((curr - 1) * 10, curr * 10);

  const n = (v) => Number(v || 0).toLocaleString();
  const pageCount = pages < 1 ? 1 : pages;
  const from = (curr - 1) * 10 + 1;
  const to = (curr - 1) * 10 + (currData?.length ?? 0);
  const view = (d) => {
    setCurrItem(d);
    setShowItemModal(true);
  };

  return (
    <div
      className="tcard"
      onKeyDown={pagerKeys({ prev, next, canPrev: curr > 1, canNext: curr < pageCount })}
    >
      <div className="tcard_scroll">
        <table className="t_main">
          <thead>
            <tr>
              {headings.map((heading, ind) => (
                <th
                  key={ind}
                  className={ind === headings.length - 1 ? "t_act" : ind >= 3 && ind <= 6 ? "t_num" : ""}
                >
                  {ind === headings.length - 1 ? "" : heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currData.length === 0 ? (
              <tr>
                <td colSpan={headings.length} className="t_empty">
                  No products found
                </td>
              </tr>
            ) : (
              currData.map((d, index) => (
                <tr
                  key={index}
                  tabIndex={0}
                  onKeyDown={rowKeys(() => view(d))}
                  aria-label={`Open ${d.label}`}
                >
                  <td className="t_no" onClick={() => view(d)}>
                    {String((curr - 1) * 10 + index + 1).padStart(2, "0")}
                  </td>
                  <td className="t_strong" onClick={() => view(d)}>
                    {d.label === "" ? "—" : d.label}
                  </td>
                  <td onClick={() => view(d)}>{d?.category}</td>
                  <td className="t_num" onClick={() => view(d)}>{d?.qty}</td>
                  <td className="t_num" onClick={() => view(d)}>{n(d?.costPrice)}</td>
                  <td className="t_num" onClick={() => view(d)}>{n(d?.sellingPrice)}</td>
                  <td className="t_num t_amt" onClick={() => view(d)}>{n(d?.qty * d.costPrice)}</td>
                  <td className="t_act">
                    <button className="icon_btn" title="View product" aria-label="View product" onClick={() => view(d)}>
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button
                      className="icon_btn danger"
                      title="Delete product"
                      aria-label="Delete product"
                      onClick={() => {
                        setCurrItem(d);
                        setShowDelModal(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="tcard_foot">
        <span>
          {data.length ? (
            <>
              Showing <b>{from}–{to}</b> of <b>{data.length}</b>
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
