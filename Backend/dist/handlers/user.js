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
exports.signin = exports.createNewUser = void 0;
var auth_1 = require("../modules/auth");
var db_1 = require("../db");
var createNewUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, name, lname, hashedPassword, shopsCollection, newUser, name_1, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                console.log(req === null || req === void 0 ? void 0 : req.body);
                _a = req.body, email = _a.email, password = _a.password, name = _a.name, lname = _a.lname;
                return [4 /*yield*/, (0, auth_1.hashPassword)(password)];
            case 1:
                hashedPassword = _b.sent();
                return [4 /*yield*/, (0, db_1.database_connection)(["shops"])];
            case 2:
                shopsCollection = _b.sent();
                // console.log(shopsCollection);
                return [4 /*yield*/, shopsCollection[0].insertOne({
                        username: email,
                        password: hashedPassword,
                        name: name,
                        lname: lname,
                        createdAt: new Date(),
                    })];
            case 3:
                // console.log(shopsCollection);
                _b.sent();
                return [4 /*yield*/, shopsCollection[0].findOne({ username: email })];
            case 4:
                newUser = _b.sent();
                if (newUser) {
                    name_1 = newUser.name;
                    token = (0, auth_1.createJWT)(newUser);
                    return [2 /*return*/, res.status(201).json({ token: token, name: name_1 })];
                }
                else {
                    console.log("Error occurred while inserting the data");
                    return [2 /*return*/, res.status(500).send("Internal Server Error")];
                }
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                console.error("Error occurred:", error_1);
                return [2 /*return*/, res.status(500).send("Internal Server Error")];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createNewUser = createNewUser;
var signin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, shopsCollection, user, isValid, token, name, username, _id, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                console.log(req.body);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, (0, db_1.database_connection)(["shops"])];
            case 1:
                shopsCollection = _b.sent();
                return [4 /*yield*/, shopsCollection[0].findOne({ username: email })];
            case 2:
                user = _b.sent();
                console.log(user);
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: "User not found" })];
                }
                return [4 /*yield*/, (0, auth_1.comparePassword)(password, user.password)];
            case 3:
                isValid = _b.sent();
                if (!isValid) {
                    res.status(401).json({ message: "Invalid credentials" });
                    return [2 /*return*/];
                }
                else {
                    token = (0, auth_1.createJWT)(user);
                    name = user.name, username = user.username, _id = user._id;
                    return [2 /*return*/, res.status(200).json({ token: token, name: name, username: username, id: _id })];
                }
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                console.error("Error occurred:", error_2);
                return [2 /*return*/, res.status(500).json({ message: "Internal Server Error" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.signin = signin;
//# sourceMappingURL=user.js.map