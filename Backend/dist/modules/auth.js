"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.createJWT = exports.hashPassword = exports.comparePassword = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var comparePassword = function (password, hash) {
    return bcrypt_1.default.compare(password, hash);
}; //this function will compare the password , the one user is sending to us and the hash one which is stored in the databasae ,return true or false
exports.comparePassword = comparePassword;
var hashPassword = function (password) {
    return bcrypt_1.default.hash(password, 5);
}; //this function will hash the password and return it
exports.hashPassword = hashPassword;
var createJWT = function (user) {
    // console.log(user)
    // console.log(user._id)
    var token = jsonwebtoken_1.default.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);
    return token;
}; //this function will create the jwt token and return it
exports.createJWT = createJWT;
var protect = function (req, res, next) {
    var bearer = req.headers.authorization;
    if (!bearer) {
        console.log("ol");
        return res.status(401).json({ message: "Unauthorized token not found" });
    }
    var _a = bearer.split(" "), token = _a[1];
    if (!token) {
        console.log("ollll");
        return res.status(401).json({ message: "Unauthorized token not found" });
    }
    try {
        var user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // console.log(user,"user")
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized token not found" });
    }
};
exports.protect = protect;
//# sourceMappingURL=auth.js.map