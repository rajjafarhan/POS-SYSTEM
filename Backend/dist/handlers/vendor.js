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
exports.deleteAllVendors = exports.deleteVendor = exports.createVendor = exports.getAllVendors = void 0;
var db_1 = require("../db");
var mongodb_1 = require("mongodb");
//////////////////////////////////////////////////////////////////////get all vendors
var getAllVendors = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var vendorcollection, setNo, query, itemsPerPage, skip, vendors, totalVendorCount, vendors, totalVendorCount, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                return [4 /*yield*/, (0, db_1.database_connection)(["vendor invoice"])];
            case 1:
                vendorcollection = _a.sent();
                setNo = parseInt(req.params.setNo);
                query = req.params.query;
                itemsPerPage = 50;
                if (setNo < 1) {
                    return [2 /*return*/, res.status(400).json({ error: "Invalid set number" })];
                }
                skip = (setNo - 1) * itemsPerPage;
                if (!(query === "aisPsqSjMUDTj387Ol")) return [3 /*break*/, 4];
                console.log("Invoked if");
                return [4 /*yield*/, vendorcollection[0]
                        .aggregate([
                        { $match: { userId: req.user.id } },
                        { $sort: { date: -1 } },
                        { $skip: skip },
                        { $limit: itemsPerPage }, // Limit to the current set of vendors
                    ])
                        .toArray()];
            case 2:
                vendors = _a.sent();
                return [4 /*yield*/, vendorcollection[0].countDocuments({
                        userId: req.user.id,
                    })];
            case 3:
                totalVendorCount = _a.sent();
                if (vendors.length === 0) {
                    return [2 /*return*/, res
                            .status(404)
                            .json({ message: "No vendors found for this set" })];
                }
                return [2 /*return*/, res
                        .status(200)
                        .json({ vendors: vendors, totalCount: totalVendorCount })];
            case 4: return [4 /*yield*/, vendorcollection[0]
                    .find({ $text: { $search: query }, userId: req.user.id })
                    .sort({ date: -1 })
                    .limit(itemsPerPage)
                    .skip(skip)
                    .toArray()];
            case 5:
                vendors = _a.sent();
                return [4 /*yield*/, vendorcollection[0].countDocuments({
                        $text: { $search: query },
                        userId: req.user.id,
                    })];
            case 6:
                totalVendorCount = _a.sent();
                if (vendors.length === 0) {
                    return [2 /*return*/, res
                            .status(404)
                            .json({ message: "No vendors found for this set" })];
                }
                return [2 /*return*/, res
                        .status(200)
                        .json({ vendors: vendors, totalCount: totalVendorCount })];
            case 7: return [3 /*break*/, 9];
            case 8:
                error_1 = _a.sent();
                console.error("Error fetching vendor invoices:", error_1);
                res.status(500).json({ error: "Internal Server Error" });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.getAllVendors = getAllVendors;
/////////////////////////////////////////////////CREATE VENDOR////////////////////////////
var createVendor = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var vendorcollection_1, _a, cash, change, date, product, rDesc, rName, total, userId_1, a, a2, a3, vendorData, result, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, db_1.database_connection)([
                        "vendor invoice",
                        "inventory",
                    ])];
            case 1:
                vendorcollection_1 = _b.sent();
                _a = req.body, cash = _a.cash, change = _a.change, date = _a.date, product = _a.product, rDesc = _a.rDesc, rName = _a.rName, total = _a.total;
                console.log(product);
                userId_1 = req.user.id;
                a = new Date(date).toDateString();
                a2 = new Date().toTimeString();
                a3 = a + " " + a2;
                vendorData = {
                    userId: userId_1,
                    cash: cash,
                    change: change,
                    date: new Date(a3),
                    product: product,
                    rDesc: rDesc,
                    rName: rName,
                    total: total,
                };
                return [4 /*yield*/, vendorcollection_1[0].insertOne(vendorData)];
            case 2:
                result = _b.sent();
                product.forEach(function (prod) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, vendorcollection_1[1].updateOne({
                                    userId: userId_1,
                                    _id: new mongodb_1.ObjectId("".concat((_a = prod === null || prod === void 0 ? void 0 : prod.product) === null || _a === void 0 ? void 0 : _a._id)),
                                }, {
                                    $inc: {
                                        qty: Number(prod === null || prod === void 0 ? void 0 : prod.productQty),
                                    },
                                })];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                if (result.acknowledged === true) {
                    console.log("Vendor data inserted successfully:", result.insertedId);
                    return [2 /*return*/, res
                            .status(201)
                            .json({ message: "Vendor data inserted successfully" })];
                }
                else {
                    console.log("Error occurred while inserting the data");
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
exports.createVendor = createVendor;
///////////////////////////////////////////DELETE VENDOR/////////////////////////////////////
var deleteVendor = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var vendorCollection, vendorIdToDelete, deletedVendor, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, db_1.database_connection)(["vendor invoice"])];
            case 1:
                vendorCollection = _a.sent();
                vendorIdToDelete = new mongodb_1.ObjectId("".concat(req.params.id));
                return [4 /*yield*/, vendorCollection[0].findOneAndDelete({
                        _id: vendorIdToDelete,
                        userId: req.user.id,
                    })];
            case 2:
                deletedVendor = _a.sent();
                if (!deletedVendor) {
                    // If the vendor was not found or didn't belong to the user, return a 404 status
                    return [2 /*return*/, res.status(404).json({ message: "Vendor not found" })];
                }
                console.log(deletedVendor);
                // If the vendor was successfully deleted, return a success message
                return [2 /*return*/, res.status(200).json({ message: "Vendor deleted successfully" })];
            case 3:
                error_3 = _a.sent();
                console.error("Error deleting vendor:", error_3);
                return [2 /*return*/, res.status(500).json({ error: "Internal Server Error" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteVendor = deleteVendor;
////////////DELETE ALL VENDORS/////////////////////////////
var deleteAllVendors = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var vendorcollection, deleteResult, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, db_1.database_connection)(["vendor invoice"])];
            case 1:
                vendorcollection = _a.sent();
                return [4 /*yield*/, vendorcollection[0].deleteMany({
                        userId: req.user.id,
                    })];
            case 2:
                deleteResult = _a.sent();
                if (deleteResult.deletedCount > 0) {
                    return [2 /*return*/, res
                            .status(200)
                            .json({ message: "All vendors deleted successfully" })];
                }
                else {
                    return [2 /*return*/, res.status(404).json({ message: "No vendors found for deletion" })];
                }
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.error("Error deleting vendors:", error_4);
                res.status(500).json({ error: "Internal Server Error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteAllVendors = deleteAllVendors;
//# sourceMappingURL=vendor.js.map