"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const urlSchema = new mongoose_1.default.Schema({
    shortUrl: String,
    originalUrl: String,
    createdBy: String,
});
const Url = mongoose_1.default.model("Url", urlSchema);
exports.default = Url;
//# sourceMappingURL=url.js.map