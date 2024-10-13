"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Access denied" });
        return; // Ensure return to prevent further execution
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = { id: verified.id }; // Explicitly assign `id` to `req.user`
        next(); // Pass the request to the next middleware or route
    }
    catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};
exports.default = authMiddleware;
