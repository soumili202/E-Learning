const {db} = require('../utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');


const ApiError = require('../utils/ApiError');

const catchAsync = require('../utils/catchAsync');

const createCourse = async (name,description,price,category,userId) => {
        
        const course = await db.course.create({
            data: {
                name,
                description,
                price,
                category,
                userId
            },
        });
        const response = {
            id: course.id,
            name: course.name,
            description: course.description,
            price: course.price,
            category: course.category,
            userId: course.userId
        };
        return response;
    }
    

