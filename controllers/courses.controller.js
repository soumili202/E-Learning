const catchAsync = require('../utils/catchAsync');
const courseService = require('../services/courses.service');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const getallcourses = catchAsync(async (req, res, next) => {
    const courses = await courseService.getallcourses();
    res.send(courses);
}
);

const getCoursebyID = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'ID is required');
    }

    const course = await courseService.getCoursebyID(id);
    res.send(course);
}
);

const getCoursebyCategory = catchAsync(async (req, res, next) => {
    const category = req.params.category;
    if (!category) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Category is required');
    }

    const course = await courseService.getCoursebyCategory(category);
    res.send(course);
}
);

const getCoursebyLevel = catchAsync(async (req, res, next) => {
    const level = req.params.level;
    if (!level) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Level is required');
    }

    const course = await courseService.getCoursebyLevel(level);
    res.send(course);
}
);



module.exports = {
    getallcourses,
    getCoursebyID,
    getCoursebyCategory,
    getCoursebyLevel
};

