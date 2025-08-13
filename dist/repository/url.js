"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlsByUsername = exports.createUrl = exports.findAllUrls = exports.findShortUrl = void 0;
const url_1 = __importDefault(require("../models/url"));
const findShortUrl = async (shortUrl) => {
    return await url_1.default.findOne({ shortUrl });
};
exports.findShortUrl = findShortUrl;
const findAllUrls = async () => {
    return await url_1.default.find();
};
exports.findAllUrls = findAllUrls;
const createUrl = async ({ shortUrl, originalUrl, user }) => {
    const newUrl = new url_1.default({
        shortUrl,
        originalUrl,
        createdBy: user.username,
    });
    await newUrl.save();
    return newUrl;
};
exports.createUrl = createUrl;
const getUrlsByUsername = async (username) => {
    return url_1.default.find({ createdBy: username });
};
exports.getUrlsByUsername = getUrlsByUsername;
//# sourceMappingURL=url.js.map