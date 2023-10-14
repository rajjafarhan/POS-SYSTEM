"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllCustomers = exports.deleteCustomer = exports.createCustomer = exports.getAllCustomers = void 0;
var mongodb_1 = require("mongodb");
var db_1 = require("../db");
///////////////////////////////////////////////////////get all customers
var getAllCustomers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var custCollection, setNo, query, itemsPerPage, skip, customers, totalCustomerCount, customers, totalCustomerCount, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                return [4 /*yield*/, (0, db_1.database_connection)(["customer invoice"])];
            case 1:
                custCollection = _a.sent();
                setNo = parseInt(req.params.setNo);
                query = req.params.query;
                itemsPerPage = 50;
                if (setNo < 1) {
                    return [2 /*return*/, res.status(400).json({ error: "Invalid set number" })];
                }
                skip = (setNo - 1) * itemsPerPage;
                if (!(query === "aisPsqSjMUDTj387Ol")) return [3 /*break*/, 4];
                return [4 /*yield*/, custCollection[0]
                        .aggregate([
                        { $match: { userId: req.user.id } },
                        { $sort: { date: -1 } },
                        { $skip: skip },
                        { $limit: itemsPerPage }, // Limit to the current set of vendors
                    ])
                        .toArray()];
            case 2:
                customers = _a.sent();
                return [4 /*yield*/, custCollection[0].countDocuments({
                        userId: req.user.id,
                    })];
            case 3:
                totalCustomerCount = _a.sent();
                if (customers.length === 0) {
                    console.log("no customer found");
                    return [2 /*return*/, res
                            .status(404)
                            .json({ message: "No vendors found for this set" })];
                }
                return [2 /*return*/, res
                        .status(200)
                        .json({ customers: customers, totalCount: totalCustomerCount })];
            case 4: return [4 /*yield*/, custCollection[0]
                    .find({ $text: { $search: query }, userId: req.user.id })
                    .sort({ date: -1 })
                    .limit(itemsPerPage)
                    .skip(skip)
                    .toArray()];
            case 5:
                customers = _a.sent();
                return [4 /*yield*/, custCollection[0].countDocuments({
                        $text: { $search: query },
                        userId: req.user.id,
                    })];
            case 6:
                totalCustomerCount = _a.sent();
                if (customers.length === 0) {
                    return [2 /*return*/, res
                            .status(404)
                            .json({ message: "No vendors found for this set" })];
                }
                return [2 /*return*/, res
                        .status(200)
                        .json({ customers: customers, totalCount: totalCustomerCount })];
            case 7: return [3 /*break*/, 9];
            case 8:
                error_1 = _a.sent();
                console.error("Error fetching customer invoices:", error_1);
                res.status(500).json({ error: "Internal Server Error" });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.getAllCustomers = getAllCustomers;
/////////////////////////////////////////////////CREATE CUSTOMER////////////////////////////
var createCustomer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var custCollection_1, _a, cash, change, date, product, rDesc, rName, total, userId_1, a, a2, a3, custData, result, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, db_1.database_connection)([
                        "customer invoice",
                        "inventory",
                    ])];
            case 1:
                custCollection_1 = _b.sent();
                _a = req.body, cash = _a.cash, change = _a.change, date = _a.date, product = _a.product, rDesc = _a.rDesc, rName = _a.rName, total = _a.total;
                userId_1 = req.user.id;
                console.log(product);
                a = new Date(date).toDateString();
                a2 = new Date().toTimeString();
                a3 = a + " " + a2;
                custData = {
                    userId: userId_1,
                    cash: cash,
                    change: change,
                    date: new Date(a3),
                    product: product,
                    rDesc: rDesc,
                    rName: rName,
                    total: total,
                };
                return [4 /*yield*/, custCollection_1[0].insertOne(custData)];
            case 2:
                result = _b.sent();
                product.forEach(function (prod) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, custCollection_1[1].updateOne({
                                    userId: userId_1,
                                    _id: new mongodb_1.ObjectId("".concat((_a = prod === null || prod === void 0 ? void 0 : prod.product) === null || _a === void 0 ? void 0 : _a._id)),
                                }, {
                                    $inc: {
                                        qty: Number(prod === null || prod === void 0 ? void 0 : prod.productQty) * -1,
                                    },
                                })];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                if (result.acknowledged === true) {
                    return [2 /*return*/, res
                            .status(201)
                            .json({ message: "Customer invoice created successfully" })];
                }
                else {
                    return [2 /*return*/, res.status(500).json({ error: "Internal Server Error" })];
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.error("Error occurred:", error_2);
                return [2 /*return*/, res.status(500).json({ error: "Internal Server Error" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createCustomer = createCustomer;
//////////////////////////////////////////////DELETE A CUSTOMER////////////////////////////
var deleteCustomer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, custCollection, result, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = new mongodb_1.ObjectId("".concat(req.params.id));
                return [4 /*yield*/, (0, db_1.database_connection)(["customer invoice"])];
            case 1:
                custCollection = _a.sent();
                return [4 /*yield*/, custCollection[0].findOneAndDelete({ _id: id })];
            case 2:
                result = _a.sent();
                if (!result) {
                    return [2 /*return*/, res.status(404).json({ message: "Customer not found" })];
                }
                return [2 /*return*/, res.status(200).json({ message: "Customer deleted successfully" })];
            case 3:
                error_3 = _a.sent();
                console.error("Error deleting customer:", error_3);
                return [2 /*return*/, res.status(500).json({ error: "Internal Server Error" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteCustomer = deleteCustomer;
//////////////////////////////////////////////DELETE ALL CUSTOMERS////////////////////////////
var deleteAllCustomers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var custCollection, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, db_1.database_connection)(["customer invoice"])];
            case 1:
                custCollection = _a.sent();
                return [4 /*yield*/, custCollection[0].deleteMany({ userId: req.user.id })];
            case 2:
                result = _a.sent();
                if (result.deletedCount >= 1) {
                    return [2 /*return*/, res
                            .status(200)
                            .json({ message: "All customers deleted successfully" })];
                }
                else {
                    return [2 /*return*/, res.status(404).json({ error: "No customers found" })];
                }
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.error("Error deleting customers:", error_4);
                return [2 /*return*/, res.status(500).json({ error: "Internal Server Error" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteAllCustomers = deleteAllCustomers;
//# sourceMappingURL=customer.js.map