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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlsByUsername = exports.createUrl = exports.findAllUrls = exports.findShortUrl = void 0;
const url_1 = __importDefault(require("../models/url"));
const findShortUrl = (shortUrl) => __awaiter(void 0, void 0, void 0, function* () {
    return yield url_1.default.findOne({ shortUrl });
});
exports.findShortUrl = findShortUrl;
const findAllUrls = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield url_1.default.find();
});
exports.findAllUrls = findAllUrls;
const createUrl = (_a) => __awaiter(void 0, [_a], void 0, function* ({ shortUrl, originalUrl, user }) {
    const newUrl = new url_1.default({
        shortUrl,
        originalUrl,
        createdBy: user.username,
    });
    yield newUrl.save();
    return newUrl;
});
exports.createUrl = createUrl;
const getUrlsByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return url_1.default.find({ createdBy: username });
});
exports.getUrlsByUsername = getUrlsByUsername;
