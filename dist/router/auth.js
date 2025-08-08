"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_js_1 = require("../controller/auth.js");
router.post("/register", auth_js_1.registerUser);
router.post("/login", auth_js_1.loginUser);
exports.default = router;
