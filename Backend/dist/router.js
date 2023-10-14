"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var vendor_1 = require("./handlers/vendor");
var customer_1 = require("./handlers/customer");
var inventory_1 = require("./handlers/inventory");
var basicInfo_1 = require("./handlers/basicInfo");
var verifyPass_1 = require("./middlewares/verifyPass");
var dashboard_1 = require("./handlers/dashboard");
var router = (0, express_1.Router)();
//**************VENDOR*******************/
router.get("/vendor/:setNo/:query", vendor_1.getAllVendors);
router.post("/vendor", vendor_1.createVendor);
router.delete("/vendor/:id", vendor_1.deleteVendor);
router.delete("/vendor", vendor_1.deleteAllVendors);
//*****************CUSTOMER************ */
router.get("/customer/:setNo/:query", customer_1.getAllCustomers);
router.post("/customer", customer_1.createCustomer);
router.delete("/customer/:id", customer_1.deleteCustomer);
router.delete("/customer/", customer_1.deleteAllCustomers);
//*****************PRODUCT/INVENTORY ******************** */
router.get("/product", inventory_1.getAllInventory);
router.post("/product", inventory_1.createInventory);
router.put("/product/:id", inventory_1.editInventory);
router.delete("/product/:id", inventory_1.deleteInventory);
//*****************BASICINFO ******************** */
router.get("/basicinfo", basicInfo_1.getBasicInfo);
router.put("/basicinfo", basicInfo_1.setBasicInfo);
router.put("/basicinfo/email", basicInfo_1.setEmail);
router.put("/basicinfo/password", basicInfo_1.resetPassword);
router.post("/deleteaccount", verifyPass_1.verifyPass, basicInfo_1.deleteAccount);
//*****************Dashboard ******************** */
router.get("/dashboard/getprofit/:month/:year", dashboard_1.getProfit);
router.get("/dashboard/getstates/:year", dashboard_1.getStates);
router.get("/dashboard/years", dashboard_1.getYears);
router.get("/allsale", function () { });
exports.default = router;
//# sourceMappingURL=router.js.map