"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const noteSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true }, // Ensure ObjectId
    completed: { type: Boolean, default: false },
});
const Note = (0, mongoose_1.model)("Note", noteSchema);
exports.default = Note;
