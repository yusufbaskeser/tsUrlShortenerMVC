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
exports.redirectUrl = exports.shortenUrl = void 0;
const url_js_1 = require("../services/url.js");
const shortenUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    const { originalUrl } = req.body;
    try {
        const result = yield (0, url_js_1.urlShorten)({ token, originalUrl });
        console.log(result);
        res.status(200).json({
            result,
            token
        });
    }
    catch (err) {
        res.status(400).json({ error: err.message || "Error" });
    }
});
exports.shortenUrl = shortenUrl;
const redirectUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shortUrl } = req.params;
    if (!shortUrl || shortUrl.trim() === "") {
        return res.status(400).json({ error: "shortUrl is required" });
    }
    try {
        const originalUrl = yield (0, url_js_1.urlRedirect)(shortUrl);
        return res.redirect(originalUrl);
    }
    catch (err) {
        return res.status(404).json({ error: "Short URL not found" });
    }
});
exports.redirectUrl = redirectUrl;
