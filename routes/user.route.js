const express = require('express');
const UserController = require('../controllers/user.controller');
const router = express.Router();
router.post('/reset', UserController.resetpassword);
module.exports = router;