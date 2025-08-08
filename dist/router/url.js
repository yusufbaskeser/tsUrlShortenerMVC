"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const url_js_1 = require("../controller/url.js");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
router.post("/shorten", authMiddleware_js_1.authMiddleware, url_js_1.shortenUrl);
router.get("/:shortUrl", url_js_1.redirectUrl);
exports.default = router;
