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
exports.getStates = exports.getYears = exports.getProfit = void 0;
var mongodb_1 = require("mongodb");
var db_1 = require("../db");
var getProfit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var month, year, lowerDate, upperDate, customerCol, costPromise, salePromise, _a, sales, cost, profit, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                month = Number(req.params.month);
                year = Number(req.params.year);
                lowerDate = new Date("".concat(year, "-").concat(month, "-").concat(1));
                upperDate = new Date();
                if (month === 12) {
                    upperDate = new Date("".concat(year + 1, "-").concat(1, "-").concat(1));
                }
                else {
                    upperDate = new Date("".concat(year, "-").concat(month + 1, "-").concat(1));
                }
                return [4 /*yield*/, (0, db_1.database_connection)([
                        "vendor invoice",
                        "customer invoice",
                    ])];
            case 1:
                customerCol = _b.sent();
                costPromise = customerCol[0]
                    .aggregate([
                    {
                        $match: {
                            userId: req.user.id,
                            date: { $gt: lowerDate, $lt: upperDate },
                        },
                    },
                    { $group: { _id: null, sum: { $sum: "$total" } } },
                ])
                    .toArray();
                salePromise = customerCol[1]
                    .aggregate([
                    {
                        $match: {
                            userId: req.user.id,
                            date: { $gt: lowerDate, $lt: upperDate },
                        },
                    },
                    { $group: { _id: null, sum: { $sum: "$total" } } },
                ])
                    .toArray();
                return [4 /*yield*/, Promise.all([salePromise, costPromise])];
            case 2:
                _a = _b.sent(), sales = _a[0], cost = _a[1];
                profit = 0;
                if (sales.length > 0) {
                    profit += sales[0].sum;
                }
                if (cost.length > 0) {
                    profit -= cost[0].sum;
                }
                res
                    .json({
                    profit: profit,
                    sales: sales,
                    cost: cost,
                })
                    .status(200)
                    .end();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _b.sent();
                console.log("ops error", e_1);
                res.json({ message: "error" }).status(404).end();
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getProfit = getProfit;
var getYears = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var col, result, createdAt, years, arr, i, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, db_1.database_connection)(["shops"])];
            case 1:
                col = _a.sent();
                return [4 /*yield*/, col[0].findOne({ _id: new mongodb_1.ObjectId(req.user.id) })];
            case 2:
                result = _a.sent();
                createdAt = result.createdAt;
                years = new Date(createdAt).getFullYear();
                arr = [];
                for (i = years; i <= new Date().getFullYear(); i++) {
                    arr.push(i);
                }
                res
                    .json({
                    arr: arr,
                    month: new Date(createdAt).getMonth() + 1,
                })
                    .status(200)
                    .end();
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                console.log(e_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getYears = getYears;
var getStates = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var year, lowerDate, upperDate, collections, _a, sales, expense, e_3;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 3, , 4]);
                year = req.params.year;
                lowerDate = new Date("".concat(year, "-1-1"));
                upperDate = new Date("".concat(year + 1, "-1-1"));
                return [4 /*yield*/, (0, db_1.database_connection)([
                        "customer invoice",
                        "vendor invoice",
                    ])];
            case 1:
                collections = _d.sent();
                return [4 /*yield*/, Promise.all([
                        collections[0]
                            .aggregate([
                            {
                                $match: {
                                    userId: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.id,
                                    date: { $gt: lowerDate, $lt: upperDate },
                                },
                            },
                            {
                                $project: {
                                    month: { $month: "$date" },
                                    year: { $year: "$date" },
                                    total: 1,
                                },
                            },
                            {
                                $group: {
                                    _id: { month: "$month", year: "$year" },
                                    totalSum: { $sum: "$total" },
                                },
                            },
                            {
                                $sort: {
                                    "_id.month": 1,
                                },
                            },
                        ])
                            .toArray(),
                        collections[1]
                            .aggregate([
                            {
                                $match: {
                                    userId: (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.id,
                                    date: { $gt: lowerDate, $lt: upperDate },
                                },
                            },
                            {
                                $project: {
                                    month: { $month: "$date" },
                                    year: { $year: "$date" },
                                    total: 1,
                                },
                            },
                            {
                                $group: {
                                    _id: { month: "$month", year: "$year" },
                                    totalSum: { $sum: "$total" },
                                },
                            },
                            {
                                $sort: {
                                    "_id.month": 1,
                                },
                            },
                        ])
                            .toArray(),
                    ])];
            case 2:
                _a = _d.sent(), sales = _a[0], expense = _a[1];
                res
                    .json({
                    sales: sales,
                    expense: expense,
                })
                    .status(200)
                    .end();
                return [3 /*break*/, 4];
            case 3:
                e_3 = _d.sent();
                console.log(e_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getStates = getStates;
//# sourceMappingURL=dashboard.js.map