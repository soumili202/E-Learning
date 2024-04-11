const express = require('express');
const CourseController = require('../controllers/courses.controller');
const router = express.Router();
router.get('/allcourses', CourseController.getallcourses);
router.get('/:id', CourseController.getCoursebyID);
router.get('/category/:category', CourseController.getCoursebyCategory);
router.get('/level/:level', CourseController.getCoursebyLevel);

module.exports = router;


