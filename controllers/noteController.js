const Note = require('../models/Note');

exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error('Get notes error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.addNote = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Validate input
        if (!title || !description) {
            return res.status(400).json({ error: "Title and description are required" });
        }

        const note = await Note.create({
            title,
            description,
            user: req.user.id
        });
        res.json(note);
    } catch (error) {
        console.error('Add note error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const { title, description } = req.body;
        
        // Validate input
        if (!title && !description) {
            return res.status(400).json({ error: "At least one field is required for update" });
        }

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Not authorized" });
        }

        note = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: { title, description }},
            { new: true }
        );
        res.json(note);
    } catch (error) {
        console.error('Update note error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Not authorized" });
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ success: "Note deleted" });
    } catch (error) {
        console.error('Delete note error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};