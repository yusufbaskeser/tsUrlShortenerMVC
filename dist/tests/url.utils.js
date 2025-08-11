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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortUrl = void 0;
const auth_utils_1 = require("./auth.utils");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const { app } = index_1.default;
const shortUrl = () => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = yield (0, auth_utils_1.registerTest)({ username: "yusuf", password: "yusuf123" });
    const res = yield (0, supertest_1.default)(app)
        .post("/url/shorten")
        .set("Authorization", token)
        .send({ originalUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" });
    let url;
    url = res.body.result.shortUrl;
    return url;
});
exports.shortUrl = shortUrl;
