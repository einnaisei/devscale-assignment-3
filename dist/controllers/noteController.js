"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.createNote = exports.getNotes = void 0;
const Note_1 = __importDefault(require("../models/Note"));
// Get all notes for the authenticated user
const getNotes = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: "User not authenticated" });
            return;
        }
        const notes = await Note_1.default.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getNotes = getNotes;
// Create a new note
const createNote = async (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        res.status(400).json({ message: "Title is required" });
        return;
    }
    try {
        const newNote = new Note_1.default({
            title,
            description,
            user: req.user?.id, // Ensure req.user is typed correctly
        });
        await newNote.save();
        res.status(201).json(newNote);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createNote = createNote;
// Update a note
const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
        const note = await Note_1.default.findById(id);
        if (!note) {
            res.status(404).json({ message: "Note not found" });
            return;
        }
        if (note.user.toString() !== req.user?.id) {
            res.status(401).json({ message: "Not authorized" });
            return;
        }
        note.title = title || note.title;
        note.description = description || note.description;
        note.completed = completed ?? note.completed;
        await note.save();
        res.json(note);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateNote = updateNote;
// Delete a note
const deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Note_1.default.findById(id);
        if (!note) {
            res.status(404).json({ message: "Note not found" });
            return;
        }
        if (note.user.toString() !== req.user?.id) {
            res.status(401).json({ message: "Not authorized" });
            return;
        }
        await note.deleteOne();
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteNote = deleteNote;
