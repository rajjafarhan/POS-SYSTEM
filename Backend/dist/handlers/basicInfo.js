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
exports.resetPassword = exports.deleteAccount = exports.getBasicInfo = exports.setEmail = exports.setBasicInfo = void 0;
var db_1 = require("../db");
var mongodb_1 = require("mongodb");
var auth_1 = require("../modules/auth");
var setBasicInfo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, infoCol, row, e_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                id = new mongodb_1.ObjectId((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id);
                return [4 /*yield*/, (0, db_1.database_connection)(["shops"])];
            case 1:
                infoCol = _b.sent();
                return [4 /*yield*/, infoCol[0].updateOne({ _id: id }, {
                        $set: {
                            shopName: req.body.shopName,
                            name: req.body.name,
                            shopAdd: req.body.shopAdd,
                            contactNo: req.body.contactNo,
                        },
                    })];
            case 2:
                row = _b.sent();
                console.log(row);
                res
                    .json({
                    message: "ok",
                    row: row,
                })
                    .status(200)
                    .end();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _b.sent();
                console.log(e_1);
                res
                    .json({
                    message: "opps error",
                    e: e_1,
                })
                    .status(500)
                    .end();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.setBasicInfo = setBasicInfo;
var setEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, infoCol, row, e_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                id = new mongodb_1.ObjectId((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id);
                return [4 /*yield*/, (0, db_1.database_connection)(["shops"])];
            case 1:
                infoCol = _b.sent();
                return [4 /*yield*/, infoCol[0].updateOne({ _id: id }, {
                        $set: {
                            username: req.body.username,
                        },
                    })];
            case 2:
                row = _b.sent();
                res
                    .json({
                    message: "ok",
                    row: row,
                })
                    .status(200)
                    .end();
                return [3 /*break*/, 4];
            case 3:
                e_2 = _b.sent();
                console.log(e_2);
                res
                    .json({
                    message: "opps error",
                    e: e_2,
                })
                    .status(500)
                    .end();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.setEmail = setEmail;
var getBasicInfo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, infoCol, row, e_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                id = new mongodb_1.ObjectId((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id);
                return [4 /*yield*/, (0, db_1.database_connection)(["shops"])];
            case 1:
                infoCol = _b.sent();
                return [4 /*yield*/, infoCol[0].findOne({ _id: id }, { project: { username: 0, password: 0 } })];
            case 2:
                row = _b.sent();
                res
                    .json({
                    message: "ok",
                    row: row,
                })
                    .status(200)
                    .end();
                return [3 /*break*/, 4];
            case 3:
                e_3 = _b.sent();
                console.log(e_3);
                res
                    .json({
                    message: "ops error",
                    e: e_3,
                })
                    .status(200)
                    .end();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getBasicInfo = getBasicInfo;
var deleteAccount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, infoCol, results, e_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                id = new mongodb_1.ObjectId((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id);
                return [4 /*yield*/, (0, db_1.database_connection)([
                        "shops",
                        "inventory",
                        "vendor invoice",
                        "customer invoice",
                    ])];
            case 1:
                infoCol = _b.sent();
                return [4 /*yield*/, Promise.all([
                        infoCol[1].deleteMany({ userId: req.user.id }),
                        infoCol[0].deleteMany({ _id: id }),
                        infoCol[2].deleteMany({ userId: req.user.id }),
                        infoCol[3].deleteMany({ userId: req.user.id }),
                    ])];
            case 2:
                results = _b.sent();
                res
                    .json({
                    message: "deleted",
                })
                    .status(200)
                    .end();
                return [3 /*break*/, 4];
            case 3:
                e_4 = _b.sent();
                console.log(e_4);
                res
                    .json({
                    message: "ops error",
                    e: e_4,
                })
                    .status(200)
                    .end();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteAccount = deleteAccount;
var resetPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, infoCol, pass, results, e_5;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                id = new mongodb_1.ObjectId((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id);
                return [4 /*yield*/, (0, db_1.database_connection)(["shops"])];
            case 1:
                infoCol = _c.sent();
                return [4 /*yield*/, (0, auth_1.hashPassword)((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.password)];
            case 2:
                pass = _c.sent();
                return [4 /*yield*/, infoCol[0].updateOne({
                        _id: id,
                    }, {
                        $set: {
                            password: pass,
                        },
                    })];
            case 3:
                results = _c.sent();
                res
                    .json({
                    message: "ok",
                    results: results,
                })
                    .status(200)
                    .end();
                return [3 /*break*/, 5];
            case 4:
                e_5 = _c.sent();
                console.log(e_5);
                res
                    .json({
                    message: "ops error",
                    e: e_5,
                })
                    .status(200)
                    .end();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.resetPassword = resetPassword;
//# sourceMappingURL=basicInfo.js.map