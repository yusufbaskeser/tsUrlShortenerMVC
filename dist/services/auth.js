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
exports.userLogin = exports.userRegister = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateJwtToken_1 = __importDefault(require("../utils/generateJwtToken"));
const user_1 = require("../repository/user");
const userRegister = (_a) => __awaiter(void 0, [_a], void 0, function* ({ username, password }) {
    if (!username || !password) {
        throw new Error("Username and password required");
    }
    const existingUser = yield (0, user_1.getByUsername)(username);
    if (existingUser) {
        throw new Error("Username already exists");
    }
    const newUser = yield (0, user_1.addUser)({ username, password });
    const token = (0, generateJwtToken_1.default)({
        id: newUser._id.toString(),
        username: newUser.username,
    });
    return {
        message: "User registered successfully",
        token,
    };
});
exports.userRegister = userRegister;
const userLogin = (_a) => __awaiter(void 0, [_a], void 0, function* ({ username, password }) {
    if (!username || !password) {
        throw new Error("Username and password required");
    }
    const user = yield (0, user_1.getByUsername)(username);
    if (!user) {
        throw new Error("User not found");
    }
    const isValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isValid) {
        throw new Error("Incorrect password");
    }
    const token = (0, generateJwtToken_1.default)({ id: user._id.toString(), username: user.username });
    return {
        message: "Login successful",
        token: token,
    };
});
exports.userLogin = userLogin;
