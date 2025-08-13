"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.userRegister = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateJwtToken_1 = __importDefault(require("../utils/generateJwtToken"));
const user_1 = require("../repository/user");
const userRegister = async ({ username, password }) => {
    if (!username || !password) {
        throw new Error("Username and password required");
    }
    const existingUser = await (0, user_1.getByUsername)(username);
    if (existingUser) {
        throw new Error("Username already exists");
    }
    const newUser = await (0, user_1.addUser)({ username, password });
    const token = (0, generateJwtToken_1.default)({
        id: newUser._id.toString(),
        username: newUser.username,
    });
    return {
        message: "User registered successfully",
        token,
    };
};
exports.userRegister = userRegister;
const userLogin = async ({ username, password }) => {
    if (!username || !password) {
        throw new Error("Username and password required");
    }
    const user = await (0, user_1.getByUsername)(username);
    if (!user) {
        throw new Error("User not found");
    }
    const isValid = await bcrypt_1.default.compare(password, user.password);
    if (!isValid) {
        throw new Error("Incorrect password");
    }
    const token = (0, generateJwtToken_1.default)({ id: user._id.toString(), username: user.username });
    return {
        message: "Login successful",
        token: token,
    };
};
exports.userLogin = userLogin;
//# sourceMappingURL=auth.js.map