"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
function generateJwtToken(user) {
    try {
        return jsonwebtoken_1.default.sign({ id: user.id.toString(), username: user.username }, config_1.default.JWT_SECRET_KEY, { expiresIn: "7d" });
    }
    catch (error) {
        console.error("JWT token üretim hatası:", error);
        throw error;
    }
}
exports.default = generateJwtToken;
