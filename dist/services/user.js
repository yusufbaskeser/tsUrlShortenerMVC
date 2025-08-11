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
exports.listAllUrls = exports.getUserUrls = void 0;
const url_1 = require("../repository/url");
const user_1 = __importDefault(require("../models/user"));
const getUserUrls = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(userId);
        console.log("wqeqweqweqweqweqw");
        if (!user) {
            throw new Error("Invalid user");
        }
        const urls = yield (0, url_1.getUrlsByUsername)(user.username);
        return urls;
    }
    catch (err) {
        throw new Error("Server Error: " + err.message);
    }
});
exports.getUserUrls = getUserUrls;
const listAllUrls = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const urls = yield (0, url_1.findAllUrls)();
        return urls;
    }
    catch (err) {
        throw new Error("Server Error: " + ((err === null || err === void 0 ? void 0 : err.message) || err));
    }
});
exports.listAllUrls = listAllUrls;
