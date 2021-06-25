import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    searchTitle: { type: String },
    searchDescription: { type: String },
  },
  {
    timestamps: {
      currentTime: () => Math.floor(Date.now() / 1000),
    },
    _id: true,
  },
);

export default mongoose.models.NotesData || mongoose.model('NotesData', NoteSchema);
