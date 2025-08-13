"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
const loggerReqRes_1 = require("./middleware/loggerReqRes");
const logger_1 = require("./utils/logger");
const app = (0, express_1.default)();
const path_1 = __importDefault(require("path"));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.static(path_1.default.join(__dirname, "views")));
app.use(express_1.default.json());
const auth_1 = __importDefault(require("./router/auth"));
const user_1 = __importDefault(require("./router/user"));
const url_1 = __importDefault(require("./router/url"));
app.use(loggerReqRes_1.loggerReqRes);
app.use("/auth", auth_1.default);
app.use("/user", user_1.default);
app.use("/url", url_1.default);
app.get("/home", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "views", "home.html"));
});
app.get("/login", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "views", "login.html"));
});
app.get("/register", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "views", "register.html"));
});
app.get("/shorten", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "views", "shorten.html"));
});
app.get("/list", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "views", "allUrls.html"));
});
app.get("/myurls", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "views", "myurls.html"));
});
app.get("/shorten/adv", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "views", "adv.html"));
});
const server = app.listen(config_1.default.PORT, () => {
    mongoose_1.default.connect(String(config_1.default.MONGO_CONNECT))
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.log(err));
    mongoose_1.default.connection.on("error", (err) => {
        (0, logger_1.logg)(err);
    });
    console.log(`Server working on PORT :${config_1.default.PORT}`);
});
exports.default = {
    app,
    mongoose: mongoose_1.default,
    server
};
//# sourceMappingURL=index.js.map