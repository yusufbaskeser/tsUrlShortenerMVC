"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const { app, mongoose, server } = index_1.default;
const supertest_1 = __importDefault(require("supertest"));
const config_1 = __importDefault(require("../config/config"));
const auth_utils_1 = require("./auth.utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const url_1 = __importDefault(require("../models/url"));
beforeAll(async () => {
    await mongoose.createConnection(String(config_1.default.MONGODUMMY_CONNECT));
});
beforeEach(async () => {
    await user_1.default.deleteMany();
    await url_1.default.deleteMany();
});
afterEach(async () => {
    await user_1.default.deleteMany();
    await url_1.default.deleteMany();
});
afterAll(async () => {
    await user_1.default.deleteMany();
    await url_1.default.deleteMany();
    await mongoose.disconnect();
    await server.close();
});
describe("User", () => {
    it("GET /user/myurls is it working", async () => {
        const { token } = await (0, auth_utils_1.registerTest)({ username: "yusuf", password: "yusuf123" });
        const res = await (0, supertest_1.default)(app)
            .get("/user/myurls")
            .set("Authorization", token);
        console.log("dwadwadawdwadadawwa", res.body);
        expect(res.body).not.toEqual({});
        expect(res.statusCode).toBe(200);
    });
    it("GET /user/myurls is empty", async () => {
        const { token } = await (0, auth_utils_1.registerTest)({ username: "yusuf", password: "yusuf123" });
        const res = await (0, supertest_1.default)(app)
            .get("/user/myurls")
            .set("Authorization", token);
        console.log("merhabalar bu is emptynin tokenidir haberiniz ola", token);
        expect(res.body).toEqual({ myurls: [] });
        expect(res.statusCode).toBe(200);
    });
    it("GET /user/myurls is with wrong token", async () => {
        const res = await (0, supertest_1.default)(app)
            .get("/user/myurls")
            .set("Authorization", "qwe123");
        expect(res.body.error).toBeDefined();
        expect(res.statusCode).toBe(401);
    });
    it("GET /user/myurls without token", async () => {
        const res = await (0, supertest_1.default)(app).get("/user/myurls");
        expect(res.statusCode).toBe(401);
        expect(res.body.error).toBeDefined();
    });
    it("GET /user/myurls with expired token", async () => {
        const expiredToken = jsonwebtoken_1.default.sign({ id: "fakeid" }, String(config_1.default.JWT_SECRET_KEY), { expiresIn: -10 });
        const res = await (0, supertest_1.default)(app)
            .get("/user/myurls")
            .set("Authorization", `Bearer ${expiredToken}`);
        expect(res.statusCode).toBe(401);
        expect(res.body.error).toBeDefined();
    });
    it("GET /user/list is it working", async () => {
        const res = await (0, supertest_1.default)(app).get("/user/list");
        expect(res.body).not.toEqual({});
        expect(res.statusCode).toBe(200);
    });
    it("GET /user/list is empty", async () => {
        const res = await (0, supertest_1.default)(app).get("/user/list");
        expect(res.body).toEqual([]);
        expect(res.statusCode).toBe(200);
    });
});
//# sourceMappingURL=user.test.js.map