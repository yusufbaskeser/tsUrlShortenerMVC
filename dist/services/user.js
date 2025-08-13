"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAllUrls = exports.getUserUrls = void 0;
const url_1 = require("../repository/url");
const user_1 = __importDefault(require("../models/user"));
const getUserUrls = async (userId) => {
    try {
        const user = await user_1.default.findById(userId);
        console.log("wqeqweqweqweqweqw");
        if (!user) {
            throw new Error("Invalid user");
        }
        const urls = await (0, url_1.getUrlsByUsername)(user.username);
        return urls;
    }
    catch (err) {
        throw new Error("Server Error: " + err.message);
    }
};
exports.getUserUrls = getUserUrls;
const listAllUrls = async () => {
    try {
        const urls = await (0, url_1.findAllUrls)();
        return urls;
    }
    catch (err) {
        throw new Error("Server Error: " + (err?.message || err));
    }
};
exports.listAllUrls = listAllUrls;
//# sourceMappingURL=user.js.map