const catchAsync = require('../utils/catchAsync');
const adminService = require('../services/admin.service');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const createCourse = catchAsync(async (req, res, next) => {
    const { name, rating, category, level } = req.body;
    if (!name || !rating || !category || !level) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'All fields are required');
    }

    const course = await adminService.createCourse(name, rating, category, level);
    res.status(httpStatus.CREATED).send(course);
}
);

const deleteCourse = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'ID is required');
    }

    const response = await adminService.deleteCourse(id);
    res.send(response);
}
);

module.exports = {
    createCourse,
    deleteCourse
};