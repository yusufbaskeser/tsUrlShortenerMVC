"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUrls = exports.getMyUrls = void 0;
const user_1 = require("../services/user");
const getMyUrls = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
    }
    try {
        const userId = req.user.id;
        console.log("wqeqweqweqweqweqw", userId);
        console.log("wqeqweqweqweqweqw", userId);
        const urls = await (0, user_1.getUserUrls)(String(userId));
        res.status(200).json({ myurls: urls });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};
exports.getMyUrls = getMyUrls;
const listUrls = async (req, res) => {
    try {
        const urls = await (0, user_1.listAllUrls)();
        res.status(200).json(urls);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.listUrls = listUrls;
//# sourceMappingURL=user.js.map