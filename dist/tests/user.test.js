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
const { app, mongoose } = index_1.default;
const supertest_1 = __importDefault(require("supertest"));
const config_js_1 = __importDefault(require("../config/config.js"));
const auth_utils_js_1 = require("./auth.utils.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_js_1 = __importDefault(require("../models/user.js"));
const url_js_1 = __importDefault(require("../models/url.js"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.createConnection(String(config_js_1.default.MONGODUMMY_CONNECT));
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_js_1.default.deleteMany();
    yield url_js_1.default.deleteMany();
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_js_1.default.deleteMany();
    yield url_js_1.default.deleteMany();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.connection.dropDatabase();
    yield user_js_1.default.deleteMany();
    yield url_js_1.default.deleteMany();
    yield mongoose.disconnect();
}));
describe("User", () => {
    it("GET /user/myurls is it working", () => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = yield (0, auth_utils_js_1.registerTest)({ username: "yusuf", password: "yusuf123" });
        const res = yield (0, supertest_1.default)(app)
            .get("/user/myurls")
            .set("Authorization", token);
        console.log("dwadwadawdwadadawwa", res.body);
        expect(res.body).not.toEqual({});
        expect(res.statusCode).toBe(200);
    }));
    it("GET /user/myurls is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = yield (0, auth_utils_js_1.registerTest)({ username: "yusuf", password: "yusuf123" });
        const res = yield (0, supertest_1.default)(app)
            .get("/user/myurls")
            .set("Authorization", token);
        console.log("merhabalar bu is emptynin tokenidir haberiniz ola", token);
        expect(res.body).toEqual({ myurls: [] });
        expect(res.statusCode).toBe(200);
    }));
    it("GET /user/myurls is with wrong token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .get("/user/myurls")
            .set("Authorization", "qwe123");
        expect(res.body.error).toBeDefined();
        expect(res.statusCode).toBe(401);
    }));
    it("GET /user/myurls without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/user/myurls");
        expect(res.statusCode).toBe(401);
        expect(res.body.error).toBeDefined();
    }));
    it("GET /user/myurls with expired token", () => __awaiter(void 0, void 0, void 0, function* () {
        const expiredToken = jsonwebtoken_1.default.sign({ id: "fakeid" }, String(config_js_1.default.JWT_SECRET_KEY), { expiresIn: -10 });
        const res = yield (0, supertest_1.default)(app)
            .get("/user/myurls")
            .set("Authorization", `Bearer ${expiredToken}`);
        expect(res.statusCode).toBe(401);
        expect(res.body.error).toBeDefined();
    }));
    it("GET /user/list is it working", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/user/list");
        expect(res.body).not.toEqual({});
        expect(res.statusCode).toBe(200);
    }));
    it("GET /user/list is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/user/list");
        expect(res.body).toEqual([]);
        expect(res.statusCode).toBe(200);
    }));
});
