"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var user_1 = require("./handlers/user");
var auth_1 = require("./modules/auth");
var router_1 = __importDefault(require("./router"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.send("Hello World");
});
app.use("/api", auth_1.protect, router_1.default);
app.post("/user", user_1.createNewUser);
app.post("/signin", user_1.signin);
exports.default = app;
//# sourceMappingURL=server.js.map