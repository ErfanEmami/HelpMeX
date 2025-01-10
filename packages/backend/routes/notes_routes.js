import express from 'express';
import Note from '../models/Note.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply the authMiddleware to all routes in this router
router.use(authMiddleware);

// Get all notes for the logged-in user
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id });
    res.status(200).json(notes);
  } catch (e) {
    console.error('Error getting notes:', e.message);
    res.status(500).json({ message: e.message });
  }
});

// Create a new note
router.post('/', async (req, res) => {
  const note = new Note({
    userId: req.user._id,
    content: req.body.content,
  });

  try {
    await note.save();
    const notes = await Note.find({ userId: req.user._id });
    res.status(200).json(notes);
} catch (e) {
    console.error('Error adding note:', e.message);
    res.status(400).json({ message: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const note_id = req.params.id;

    const deleted_note = await Note.findByIdAndDelete(note_id);

    if (!deleted_note) {
      return res.status(400).json({ message: 'Note not found' });
    }

    const notes = await Note.find({ userId: req.user._id });
    res.status(200).json(notes);
  } catch (e) {
    console.error('Error deleting note:', e.message);
    res.status(500).json({ message: e.message });
  }
});

router.put('/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;

    const updated_note = await Note.findByIdAndUpdate(
      id, 
      { complete: true },  // Set "complete" to true
      { new: true }        // Return the updated document
    );

    if (!updated_note) {
      return res.status(400).json({ message: 'Note not found' });
    }

    const notes = await Note.find({ userId: req.user._id });
    res.status(200).json(notes);
  } catch (e) {
    console.error('Error deleting note:', e.message);
    res.status(500).json({ message: e.message });
  }
});

export default router;
