const express = require('express');
const UserController = require('../controllers/user.controller');
const router = express.Router();
router.post('/verifyemail',UserController.verifyemail);
module.exports = router;