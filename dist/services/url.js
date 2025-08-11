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
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlRedirect = exports.urlShorten = void 0;
const generateToken_1 = require("../utils/generateToken");
const url_1 = require("../repository/url");
const user_1 = require("../repository/user");
const urlShorten = (_a) => __awaiter(void 0, [_a], void 0, function* ({ token, originalUrl }) {
    if (!originalUrl) {
        throw new Error("Original URL are required");
    }
    if (!token) {
        throw new Error("Token is required");
    }
    const User = yield (0, user_1.getByToken)(token);
    if (!User) {
        throw new Error("Invalid token");
    }
    const shortUrl = (0, generateToken_1.generateToken)(6);
    yield (0, url_1.createUrl)({ shortUrl, originalUrl, user: User });
    return {
        shortUrl: `http://localhost:${process.env.PORT}/url/${shortUrl}`,
    };
});
exports.urlShorten = urlShorten;
const urlRedirect = (shortUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const url = yield (0, url_1.findShortUrl)(shortUrl);
    if (!url) {
        throw new Error("Short URL not found");
    }
    return url.originalUrl;
});
exports.urlRedirect = urlRedirect;
