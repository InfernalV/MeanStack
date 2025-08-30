const express = require("express");
const router = express.Router();
const { getMessages, getMessageById, postMessage, updateMessage, deleteMessage } = require('../controllers/message.controller.js');

// Route: /api/messages/
router.get('/', getMessages);
router.get('/:id', getMessageById);
router.post('/', postMessage);
router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);

module.exports = router;