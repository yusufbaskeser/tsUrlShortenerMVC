"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTest = void 0;
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const { app } = index_1.default;
const registerTest = async ({ username, password }) => {
    const res = await (0, supertest_1.default)(app).post('/auth/register').send({
        username,
        password,
    });
    const token = `Bearer ${res.body.token}`;
    return { token, username, password };
};
exports.registerTest = registerTest;
//# sourceMappingURL=auth.utils.js.map