const express = require('express');
const AdminController = require('../controllers/admin.controller');
const router = express.Router();
router.post('/createcourse', AdminController.createCourse);
router.delete('/deletecourse/:id', AdminController.deleteCourse);

module.exports = router;

