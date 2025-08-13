"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const url_1 = require("../controller/url");
const authMiddleware_1 = require("../middleware/authMiddleware");
router.post("/shorten", authMiddleware_1.authMiddleware, url_1.shortenUrl);
router.get("/:shortUrl", url_1.redirectUrl);
exports.default = router;
//# sourceMappingURL=url.js.map