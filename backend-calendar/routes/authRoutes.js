const express = require('express');
const { googleAuth } = require('../controllers/authController');

const router = express.Router();

router.get('/google', googleAuth);
router.get('/login', login)
module.exports = router;
