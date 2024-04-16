

const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const config = require('../config');


const ApiError  = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const JWT_ACCESS_SECRET = config.JWT_ACCESS_SECRET;



const authenticate = catchAsync(async (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Authorization header required.');
  }
  token = token.substring("Bearer ".length);
  try {
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid token.");
  }
});

const adminauthenticate = catchAsync(async (req, res, next) => {

  if (req.user.role !== "admin") {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Access denied. Admin only.');
  }
  next();
});
module.exports = { authenticate, adminauthenticate };