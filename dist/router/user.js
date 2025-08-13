"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_1 = require("../controller/user");
const authMiddleware_1 = require("../middleware/authMiddleware");
router.get("/myurls", authMiddleware_1.authMiddleware, user_1.getMyUrls);
router.get("/list", user_1.listUrls);
exports.default = router;
//# sourceMappingURL=user.js.map