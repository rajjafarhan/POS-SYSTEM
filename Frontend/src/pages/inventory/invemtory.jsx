import AddButton from "../../components/addButton/addButton";
import MySelect from "../../components/select/select";
import InventoryTable from "./iTable";
import { useState, useEffect } from "react";
import Modal from "../../components/modal/modal";
import AddItem from "./addItem";
import SearchBar from "../../components/searchBar/searchBar";
import { useQuery } from "@tanstack/react-query";
import { fetchInventory } from "../../functions/inventory";
import "./inventory.css";
import { useOutletContext } from "react-router-dom";

const Inventory = () => {
  const [pData, refetch] = useOutletContext();

  const [showModal, setShowModal] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  let [curr, setcurr] = useState(1);

  return (
    <section className="d_main">
      <div className="pos-toolbar">
        <p className="pos-sub">
          <b>Stock</b>
          {pData.length} products · tap a product to view or edit it
        </p>
        <SearchBar
          value={searchVal}
          setValue={setSearchVal}
          width={"w-30rem"}
      text={"Search by name or category."}
            setcurr={setcurr}
        />
        <div className="d-flex bnts justify-content-center align-items-center ">
          <AddButton onChange={setShowModal} label="Add product" />
        </div>
      </div>
      <div>
        <div className="d-flex t-div justify-content-center align-items-start">
          <InventoryTable
            pData={pData}
      curr={curr}
      setcurr={setcurr}
            refetch={refetch}
            searchParam={searchVal}
          />
        </div>
      </div>
      {showModal && (
        <Modal>
          <AddItem setShowModal={setShowModal} refetch={refetch} />
        </Modal>
      )}
    </section>
  );
};

export default Inventory;
