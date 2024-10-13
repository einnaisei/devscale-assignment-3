// src/models/Note.ts
import { Document, Schema, model, Types } from "mongoose";

interface INote extends Document {
  title: string;
  description: string;
  user: Types.ObjectId; // Make sure this matches your user type
  completed?: boolean;
}

const noteSchema = new Schema<INote>({
  title: { type: String, required: true }, // Ensure this is required
  description: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Ensure ObjectId
  completed: { type: Boolean, default: false },
});

const Note = model<INote>("Note", noteSchema);
export default Note;
