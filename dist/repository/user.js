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
exports.addUser = exports.getByUsername = exports.getByToken = void 0;
const user_js_1 = __importDefault(require("../models/user.js"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_js_1 = __importDefault(require("../config/config.js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getByToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_js_1.default.JWT_SECRET_KEY);
        console.log("Decoded token payload:", decoded);
        if (typeof decoded === 'string') {
            throw new Error("Decoded token is a string, expected JwtPayload");
        }
        const user = yield user_js_1.default.findById(decoded.id);
        return user;
    }
    catch (err) {
        console.log("Token verify error:", err.message);
        return null;
    }
});
exports.getByToken = getByToken;
const getByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_js_1.default.findOne({ username });
});
exports.getByUsername = getByUsername;
const addUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ username, password }) {
    const salt = yield bcrypt_1.default.genSalt(10);
    const hash = yield bcrypt_1.default.hash(password, salt);
    const newUser = new user_js_1.default({
        username,
        password: hash,
    });
    yield newUser.save();
    return newUser;
});
exports.addUser = addUser;
