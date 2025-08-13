"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const { app, mongoose, server } = index_1.default;
const supertest_1 = __importDefault(require("supertest"));
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../config/config"));
const user_1 = __importDefault(require("../models/user"));
beforeAll(async () => {
    await mongoose.createConnection(String(config_1.default.MONGODUMMY_CONNECT));
});
beforeEach(async () => {
    await user_1.default.deleteMany();
});
afterEach(async () => {
    await user_1.default.deleteMany();
});
afterAll(async () => {
    await user_1.default.deleteMany();
    await mongoose.disconnect();
    await server.close();
});
describe("auth", () => {
    it("POST /auth/register is it working", async () => {
        const res = await (0, supertest_1.default)(app).post("/auth/register").send({
            username: "yusuf",
            password: "yusuf123",
        });
        expect(res.body).not.toEqual({});
        expect(res.body.message).toBe("User registered successfully");
        expect(res.body.token).toBeDefined();
        expect(res.statusCode).toBe(201);
    });
    it("POST /auth/register fails when username and password is empty", async () => {
        const res = await (0, supertest_1.default)(app).post("/auth/register").send({
            username: "",
            password: "",
        });
        expect(res.statusCode).toBe(400);
        expect(res.body).not.toEqual({});
        expect(res.body.error).toBeDefined();
    });
    it("POST /auth/login is it working", async () => {
        await (0, auth_utils_1.registerTest)({ username: "yusuf", password: "yusuf123" });
        const res = await (0, supertest_1.default)(app).post("/auth/login").send({
            username: "yusuf",
            password: "yusuf123",
        });
        expect(res.body).not.toEqual({});
        expect(res.body.message).toBe('Login successful');
        expect(res.body.token).toBeDefined();
        expect(res.statusCode).toBe(200);
    });
    it("POST /auth/login fails when user input wrong username and password", async () => {
        await (0, auth_utils_1.registerTest)({ username: "yusuf", password: "yusuf123" });
        const res = await (0, supertest_1.default)(app).post("/auth/login").send({
            username: "wronguser",
            password: "wrongpass",
        });
        expect(res.body).not.toEqual({});
        expect(res.body.error).toBeDefined();
        expect(res.statusCode).toBe(400);
    });
    it("POST /auth/login fails when username and password is empty", async () => {
        const res = await (0, supertest_1.default)(app).post("/auth/login").send({
            username: "",
            password: "",
        });
        expect(res.body).not.toEqual({});
        expect(res.body.error).toBeDefined();
        expect(res.statusCode).toBe(400);
    });
});
//# sourceMappingURL=auth.test.js.map