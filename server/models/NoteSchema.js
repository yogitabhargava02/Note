// models/noteSchema.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    subjects: {
      type: [String],
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a User model for teacher authentication
      required: true,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
