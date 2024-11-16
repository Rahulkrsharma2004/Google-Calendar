const express = require('express');
const { createEvent } = require('../controllers/eventController');
// const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create_event', createEvent);

module.exports = router;
