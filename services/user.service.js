const {db} = require('../utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
//const axios = require ('axios')
//const FormData= require ('form-data')


const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');



const getUser = async (id) => {  
    
    const user = await db.user.findUnique({
        where: {
            id,
        },
    });
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    const response = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
        
    };
    return response;
}






