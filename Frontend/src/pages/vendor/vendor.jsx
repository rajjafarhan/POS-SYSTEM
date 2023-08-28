import Receipt from "../../components/vendorReceipt/vendorRecipt";
import MySelect from "../../components/select/select";
import { useState } from "react";
import AddButton from "../../components/addButton/addButton";
import "./vendor.css";

const VendorPage = () => {
  const [timePeriod, setTimePeriod] = useState("jan");
  return (
    <section className="d_main">
      <div className="text-dgreen d-flex justify-content-between my-3 align-items-center px-5">
        <h1 className="x-font">Vendor Receipts</h1>
        <div className="d-flex justify-content-center align-items-center ">
          <AddButton />
          <MySelect
            name="Time"
            setter={setTimePeriod}
            values={["jan", "feb", "mar"]}
            curr={timePeriod}
          />
        </div>
      </div>
      <div>
        <div className="  d-flex flex-wrap ">
          <Receipt />
          <Receipt />
          <Receipt />
        </div>
      </div>
    </section>
  );
};

export default VendorPage;
