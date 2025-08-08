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
const auth_utils_js_1 = require("./auth.utils.js");
const config_js_1 = __importDefault(require("../config/config.js"));
const user_js_1 = __importDefault(require("../models/user.js"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.createConnection(String(config_js_1.default.MONGODUMMY_CONNECT));
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_js_1.default.deleteMany();
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_js_1.default.deleteMany();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_js_1.default.deleteMany();
    yield mongoose.disconnect();
}));
describe("auth", () => {
    it("POST /auth/register is it working", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/auth/register").send({
            username: "yusuf",
            password: "yusuf123",
        });
        expect(res.body).not.toEqual({});
        expect(res.body.message).toBe("User registered successfully");
        expect(res.body.token).toBeDefined();
        expect(res.statusCode).toBe(201);
    }));
    it("POST /auth/register fails when username and password is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/auth/register").send({
            username: "",
            password: "",
        });
        expect(res.statusCode).toBe(400);
        expect(res.body).not.toEqual({});
        expect(res.body.error).toBeDefined();
    }));
    it("POST /auth/login is it working", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, auth_utils_js_1.registerTest)({ username: "yusuf", password: "yusuf123" });
        const res = yield (0, supertest_1.default)(app).post("/auth/login").send({
            username: "yusuf",
            password: "yusuf123",
        });
        expect(res.body).not.toEqual({});
        expect(res.body.message).toBe('Login successful');
        expect(res.body.token).toBeDefined();
        expect(res.statusCode).toBe(200);
    }));
    it("POST /auth/login fails when user input wrong username and password", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, auth_utils_js_1.registerTest)({ username: "yusuf", password: "yusuf123" });
        const res = yield (0, supertest_1.default)(app).post("/auth/login").send({
            username: "wronguser",
            password: "wrongpass",
        });
        expect(res.body).not.toEqual({});
        expect(res.body.error).toBeDefined();
        expect(res.statusCode).toBe(400);
    }));
    it("POST /auth/login fails when username and password is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/auth/login").send({
            username: "",
            password: "",
        });
        expect(res.body).not.toEqual({});
        expect(res.body.error).toBeDefined();
        expect(res.statusCode).toBe(400);
    }));
});
