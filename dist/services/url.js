"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlRedirect = exports.urlShorten = void 0;
const generateToken_1 = require("../utils/generateToken");
const url_1 = require("../repository/url");
const user_1 = require("../repository/user");
const urlShorten = async ({ token, originalUrl }) => {
    if (!originalUrl) {
        throw new Error("Original URL are required");
    }
    if (!token) {
        throw new Error("Token is required");
    }
    const User = await (0, user_1.getByToken)(token);
    if (!User) {
        throw new Error("Invalid token");
    }
    const shortUrl = (0, generateToken_1.generateToken)(6);
    await (0, url_1.createUrl)({ shortUrl, originalUrl, user: User });
    return {
        shortUrl: shortUrl,
    };
};
exports.urlShorten = urlShorten;
const urlRedirect = async (shortUrl) => {
    const url = await (0, url_1.findShortUrl)(shortUrl);
    if (!url) {
        throw new Error("Short URL not found");
    }
    let originalUrl = url.originalUrl;
    if (!originalUrl.startsWith("http://") && !originalUrl.startsWith("https://")) {
        originalUrl = `https://${originalUrl}`;
    }
    return originalUrl;
};
exports.urlRedirect = urlRedirect;
//# sourceMappingURL=url.js.map