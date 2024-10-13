import { Response } from "express";
import Note from "../models/Note";
import { IAuthRequest } from "../types/auth";

// Get all notes for the authenticated user
export const getNotes = async (
  req: IAuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving note", error: (error as Error).message });
  }
};

// Create a new note
export const createNote = async (
  req: IAuthRequest,
  res: Response
): Promise<void> => {
  const { title, description } = req.body;

  if (!title) {
    res.status(400).json({ message: "Title is required" });
    return;
  }

  try {
    const newNote = new Note({
      title,
      description,
      user: req.user?.id, // Ensure req.user is typed correctly
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving note", error: (error as Error).message });
  }
};

// Update a note
export const updateNote = async (
  req: IAuthRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const note = await Note.findById(id);
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
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving note", error: (error as Error).message });
  }
};
// Delete a note
export const deleteNote = async (
  req: IAuthRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id);
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
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving note", error: (error as Error).message });
  }
};
