const catchAsync = require('../utils/catchAsync');
const userenrollService = require('../services/userenroll.service');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const {Resend} = require('resend')
const config = require('../config');
const RESEND_KEY = config.RESEND_KEY;


const enrollCourse = catchAsync(async (req, res, next) => {
    const { courseId } = req.body;
    const userId = req.user.id;
    if (!courseId || !userId) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'All fields are required');
    }

    const course = await userenrollService.enrollCourse(courseId, userId);
    const resend = new Resend(RESEND_KEY);
    resend.emails.send({
        from: 'elearning@soumilimukherjeekgpian.me',
        to: req.user.email,
        subject: 'Congratualtions on enrolling at E-Learning',
        html: `<h1>Hi ${req.user.name},</h1><p>You have successfully enrolled to course ${req.body.courseId}</p>`,
    });

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