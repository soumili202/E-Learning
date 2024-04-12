const express = require('express');
const UserEnrollController = require('../controllers/userenroll.controller');
const router = express.Router();
router.post('/enrollcourse', UserEnrollController.enrollCourse);
router.get ('/getcourses',UserEnrollController.getEnrolledCourses);

module.exports = router;
