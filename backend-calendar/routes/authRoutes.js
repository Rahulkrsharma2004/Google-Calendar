const express = require('express');
const { googleAuth, login } = require('../controllers/authController');

const router = express.Router();

router.get('/google', login)
router.get('/callback', googleAuth);
module.exports = router;
