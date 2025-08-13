"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.getByUsername = exports.getByToken = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getByToken = async (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET_KEY);
        console.log("Decoded token payload:", decoded);
        if (typeof decoded === 'string') {
            throw new Error("Decoded token is a string, expected JwtPayload");
        }
        const user = await user_1.default.findById(decoded.id);
        return user;
    }
    catch (err) {
        console.log("Token verify error:", err.message);
        return null;
    }
};
exports.getByToken = getByToken;
const getByUsername = async (username) => {
    return await user_1.default.findOne({ username });
};
exports.getByUsername = getByUsername;
const addUser = async ({ username, password }) => {
    const salt = await bcrypt_1.default.genSalt(10);
    const hash = await bcrypt_1.default.hash(password, salt);
    const newUser = new user_1.default({
        username,
        password: hash,
    });
    await newUser.save();
    return newUser;
};
exports.addUser = addUser;
//# sourceMappingURL=user.js.map