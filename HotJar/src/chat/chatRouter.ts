
const express = require('express');
const router = express.Router();

const chatController = require('./chatController.ts');
router.post('/setToken', chatController.setToken);
router.post('/sendMessage', chatController.sendMessage);

module.exports = router;
