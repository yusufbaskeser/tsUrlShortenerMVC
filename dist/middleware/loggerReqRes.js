"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerReqRes = void 0;
const pino_1 = __importDefault(require("pino"));
const logger = (0, pino_1.default)();
const loggerReqRes = (req, res, next) => {
    const originalSend = res.send;
    res.send = function (body) {
        logger.info(JSON.stringify({
            method: req.method,
            url: req.originalUrl,
            body: req.body,
            response: body,
            headers: req.headers,
        }));
        return originalSend.call(this, body);
    };
    next();
};
exports.loggerReqRes = loggerReqRes;
//# sourceMappingURL=loggerReqRes.js.map