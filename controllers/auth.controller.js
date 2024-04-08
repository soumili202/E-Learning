const catchAsync = require('../utils/catchAsync');
const authService = require('../services/auth.service');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const signup = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Name, email and password are required');
    }

    const user = await authService.signup(name, email, password);
    res.status(httpStatus.CREATED).send(user);
}
);

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email and password are required');
    }
    const user = await authService.login(email, password);
    res.send(user);
}
);

module.exports = {
    signup,
    login
};
