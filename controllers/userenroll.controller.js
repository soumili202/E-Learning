const catchAsync = require('../utils/catchAsync');
const userenrollService = require('../services/userenroll.service');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const enrollCourse = catchAsync(async (req, res, next) => {
    const { courseId } = req.body;
    const userId = req.user.id;
    if (!courseId || !userId) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'All fields are required');
    }

    const course = await userenrollService.enrollCourse(courseId, userId);
    res.status(httpStatus.CREATED).send(course);
}
);

const getEnrolledCourses = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    if (!userId) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User ID is required');
    }

    const courses = await userenrollService.getEnrolledCourses(userId);
    //console.log(courses)
    res.send(courses);
}
);


module.exports = {
    enrollCourse,
    getEnrolledCourses
};