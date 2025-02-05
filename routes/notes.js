const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const fetchuser = require('../middleware/auth');

router.get('/getnotes', fetchuser, noteController.getNotes);
router.post('/addnote', fetchuser, noteController.addNote);
router.put('/updatenote/:id', fetchuser, noteController.updateNote);
router.delete('/deletenote/:id', fetchuser, noteController.deleteNote);

module.exports = router;