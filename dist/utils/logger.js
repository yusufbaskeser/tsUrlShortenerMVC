"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logg = void 0;
const pino_1 = __importDefault(require("pino"));
const logger = (0, pino_1.default)();
const logg = (str) => {
    logger.error(str);
};
exports.logg = logg;
//# sourceMappingURL=logger.js.map