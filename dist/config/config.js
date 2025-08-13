"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    PORT: process.env.PORT || 3000,
    MONGO_CONNECT: process.env.MONGO_CONNECT,
    MONGODUMMY_CONNECT: process.env.MONGODUMMY_CONNECT,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    BASE_URL: process.env.BASE_URL || "http://localhost:3000",
};
//# sourceMappingURL=config.js.map