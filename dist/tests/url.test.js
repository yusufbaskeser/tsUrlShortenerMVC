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
const index_1 = __importDefault(require("../index"));
const { app, mongoose, server } = index_1.default;
const supertest_1 = __importDefault(require("supertest"));
const config_1 = __importDefault(require("../config/config"));
const user_1 = __importDefault(require("../models/user"));
const url_1 = __importDefault(require("../models/url"));
const auth_utils_1 = require("./auth.utils");
const url_utils_1 = require("./url.utils");
let exampleShortUrl;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.createConnection(String(config_1.default.MONGODUMMY_CONNECT));
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.deleteMany();
    yield url_1.default.deleteMany();
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.deleteMany();
    yield url_1.default.deleteMany();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.deleteMany();
    yield url_1.default.deleteMany();
    yield mongoose.disconnect();
    yield server.close();
}));
describe("url", () => {
    it("POST /url/shorten is it working", () => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = yield (0, auth_utils_1.registerTest)({ username: "yusuf", password: "yusuf123" });
        const res = yield (0, supertest_1.default)(app)
            .post("/url/shorten")
            .set("Authorization", token)
            .send({ originalUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" });
        exampleShortUrl = res.body.result.shortUrl;
        console.log(res.body);
        expect(res.body).not.toEqual({});
        expect(res.body.result.shortUrl).toBeDefined();
        expect(res.body.token).toBeDefined();
        expect(res.body.result.shortUrl).toBe(exampleShortUrl);
        expect(res.statusCode).toBe(200);
        console.log("res.bodydwadwadwadawdwadwadadawwda:", res.body);
    }));
    it("POST /url/shorten fails when originalUrl is wrong", () => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = yield (0, auth_utils_1.registerTest)({ username: "yusuf", password: "yusuf123" });
        const res = yield (0, supertest_1.default)(app)
            .post("/url/shorten")
            .set("Authorization", token)
            .send({
            originalUrl: "",
        });
        console.log("yusufn tokeni burada haberin ola haaaaaaaa", res.body);
        expect(res.body.error).toBeDefined();
        expect(res.statusCode).toBe(400);
    }));
    it("POST /url/shorten fails when token wrong", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .post("/url/shorten")
            .set("Authorization", "qwe123")
            .send({
            originalUrl: "",
        });
        expect(res.body.error).toBeDefined();
        expect(res.statusCode).toBe(401);
    }));
    it("POST /url/shorten fails when token is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, auth_utils_1.registerTest)({ username: "yusuf", password: "yusuf123" });
        const res = yield (0, supertest_1.default)(app)
            .post("/url/shorten")
            .set("Authorization", "")
            .send({
            originalUrl: "",
        });
        expect(res.statusCode).toBe(401);
        expect(res.body.error).toBeDefined();
    }));
    it("POST /url/shorten fails when originalUrl is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = yield (0, auth_utils_1.registerTest)({ username: "yusuf", password: "yusuf123" });
        const res = yield (0, supertest_1.default)(app)
            .post("/url/shorten")
            .set("Authorization", token)
            .send({
            originalUrl: "",
        });
        expect(res.body).not.toEqual({});
        expect(res.body.error).toBeDefined();
        expect(res.statusCode).toBe(400);
    }));
    it("POST /url/shortUrl is it working", () => __awaiter(void 0, void 0, void 0, function* () {
        const forexample = yield (0, url_utils_1.shortUrl)();
        const res = yield (0, supertest_1.default)(app)
            .post("/url/shortUrl")
            .send({ forexample });
        console.log("buda utils shorurl geliyormu die kotnrol ederim ha", forexample);
        expect(res.statusCode).toBeGreaterThan(200);
    }));
    it("POST /url/shortUrl is wrong", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .post("/url/shortUrl")
            .send("qwe123");
        expect(res.statusCode).toBe(404);
    }));
    it("POST /url/shortUrl fails when shorturl is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/url/shortUrl").send({
            shortUrl: "",
        });
        expect(res.statusCode).toBe(404);
    }));
});
