"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const auth_1 = require("../services/auth");
const registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await (0, auth_1.userRegister)({ username, password });
        res.status(201).json(result);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    console.log("Login request:", { username, password });
    try {
        const result = await (0, auth_1.userLogin)({ username, password });
        console.log("Login success:", result);
        res.status(200).json(result);
    }
    catch (err) {
        console.log("Login error:", err.message || err.toString());
        res.status(400).json({ error: err.message || err.toString() });
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=auth.js.map