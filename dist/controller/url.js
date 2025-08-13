"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectUrl = exports.shortenUrl = void 0;
const url_1 = require("../services/url");
const shortenUrl = async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    const { originalUrl } = req.body;
    try {
        const result = await (0, url_1.urlShorten)({ token, originalUrl });
        console.log(result);
        res.status(200).json({
            result,
            token
        });
    }
    catch (err) {
        res.status(400).json({ error: err.message || "Error" });
    }
};
exports.shortenUrl = shortenUrl;
const redirectUrl = async (req, res) => {
    const { shortUrl } = req.params;
    if (!shortUrl || shortUrl.trim() === "") {
        return res.status(400).json({ error: "shortUrl is required" });
    }
    try {
        const originalUrl = await (0, url_1.urlRedirect)(shortUrl);
        return res.redirect(originalUrl);
    }
    catch (err) {
        return res.status(404).json({ error: "Short URL not found" });
    }
};
exports.redirectUrl = redirectUrl;
//# sourceMappingURL=url.js.map