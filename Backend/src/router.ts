import { Router } from "express";
import {
  createVendor,
  deleteAllVendors,
  deleteVendor,
  getAllVendors,
} from "./handlers/vendor";
import {
  createCustomer,
  deleteAllCustomers,
  deleteCustomer,
  getAllCustomers,
} from "./handlers/customer";
import { createInventory, getAllInventory } from "./handlers/inventory";
import {
  setBasicInfo,
  getBasicInfo,
  deleteAccount,
} from "./handlers/basicInfo";

const router = Router();
//**************VENDOR*******************/
router.get("/vendor/:setNo", getAllVendors);
router.post("/vendor", createVendor);
router.delete("/vendor/:id", deleteVendor);
router.delete("/vendor", deleteAllVendors);

//*****************CUSTOMER************ */

router.get("/customer/:setNo", getAllCustomers);
router.post("/customer", createCustomer);
router.delete("/customer/:id", deleteCustomer);
router.delete("/customer/", deleteAllCustomers);

//*****************PRODUCT/INVENTORY ******************** */

router.get("/product", getAllInventory);
router.post("/product", createInventory);
router.put("/product", (req, res) => {});
router.delete("/product", (req, res) => {});

//*****************BASICINFO ******************** */
router.get("/basicinfo", getBasicInfo);
router.put("/basicinfo", setBasicInfo);
router.post("/basicinfo", (req, res) => {});
router.delete("/deleteshop", deleteAccount);

//*****************Dashboard ******************** */

router.get("/allsale", () => {});

export default router;
