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
import {
  createInventory,
  deleteInventory,
  editInventory,
  getAllInventory,
} from "./handlers/inventory";

import {
  setEmail,
  setBasicInfo,
  getBasicInfo,
  deleteAccount,
  resetPassword,
} from "./handlers/basicInfo";
import { verifyPass } from "./middlewares/verifyPass";
import { getStates, getProfit, getYears } from "./handlers/dashboard";

const router = Router();
//**************VENDOR*******************/
router.get("/vendor/:setNo/:query", getAllVendors);
router.post("/vendor", createVendor);
router.delete("/vendor/:id", deleteVendor);
router.delete("/vendor", deleteAllVendors);

//*****************CUSTOMER************ */

router.get("/customer/:setNo/:query", getAllCustomers);
router.post("/customer", createCustomer);
router.delete("/customer/:id", deleteCustomer);
router.delete("/customer/", deleteAllCustomers);

//*****************PRODUCT/INVENTORY ******************** */

router.get("/product", getAllInventory);
router.post("/product", createInventory);
router.put("/product/:id", editInventory);
router.delete("/product/:id", deleteInventory);

//*****************BASICINFO ******************** */
router.get("/basicinfo", getBasicInfo);
router.put("/basicinfo", setBasicInfo);
router.put("/basicinfo/email", setEmail);
router.put("/basicinfo/password", resetPassword);
router.post("/deleteaccount", verifyPass, deleteAccount);
//*****************Dashboard ******************** */

router.get("/dashboard/getprofit/:month/:year", getProfit);
router.get("/dashboard/getstates/:year", getStates);
router.get("/dashboard/years", getYears);

router.get("/allsale", () => {});

export default router;
