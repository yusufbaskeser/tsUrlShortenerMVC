"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortUrl = void 0;
const auth_utils_1 = require("./auth.utils");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const { app } = index_1.default;
const shortUrl = async () => {
    const { token } = await (0, auth_utils_1.registerTest)({ username: "yusuf", password: "yusuf123" });
    const res = await (0, supertest_1.default)(app)
        .post("/url/shorten")
        .set("Authorization", token)
        .send({ originalUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" });
    let url;
    url = res.body.result.shortUrl;
    return url;
};
exports.shortUrl = shortUrl;
//# sourceMappingURL=url.utils.js.map