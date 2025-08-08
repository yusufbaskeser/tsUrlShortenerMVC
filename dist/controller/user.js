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
exports.listUrls = exports.getMyUrls = void 0;
const user_js_1 = require("../services/user.js");
const getMyUrls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
    }
    try {
        const userId = req.user.id;
        console.log("wqeqweqweqweqweqw", userId);
        console.log("wqeqweqweqweqweqw", userId);
        const urls = yield (0, user_js_1.getUserUrls)(String(userId));
        res.status(200).json({ myurls: urls });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});
exports.getMyUrls = getMyUrls;
const listUrls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const urls = yield (0, user_js_1.listAllUrls)();
        res.status(200).json(urls);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.listUrls = listUrls;
