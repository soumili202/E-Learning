const express = require('express');
const UserController = require('../controllers/user.controller');
const upload = require('../middleware/multer');
const router = express.Router();
router.get('/viewprofile', UserController.viewprofile);
router.post('/reset', UserController.resetpassword);
router.post('/upload', upload.single('image'),UserController.upload_image);
module.exports = router;