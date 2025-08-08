"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_js_1 = require("../controller/user.js");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
router.get("/myurls", authMiddleware_js_1.authMiddleware, user_js_1.getMyUrls);
router.get("/list", user_js_1.listUrls);
exports.default = router;
