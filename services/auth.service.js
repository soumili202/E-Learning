const { db } = require('../utils/db');
const bcrypt = require('bcrypt');
const {Resend} = require('resend')
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const RESEND_KEY = process.env.RESEND_KEY;
const EXPIRES_IN = process.env.EXPIRES_IN;

const signup = async (name,email,password)=> {
    
    const user = await db.user.findUnique({
        where: {
            email,
        },
    });
    if (user) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists');
    }
    if (password.length < 6) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Password must be at least 6 characters');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role : 'user',
            avatar: 'https://www.gravatar.com/avatar/',
        },
    });
    const token = jwt.sign({ user: newUser }, JWT_ACCESS_SECRET, { expiresIn: EXPIRES_IN });
    const response = {
        id: newUser.id,      
        name: newUser.name,
        role: newUser.role, 
        avatar: newUser.avatar,       
        token: token
    };
    console.log(response);
    const resend = new Resend(RESEND_KEY);
    resend.emails.send({
        from: 'elearning@soumilimukherjeekgpian.me',
        to: newUser.email,
        subject: 'Welcome to the E-Learning App',
        html: `<h1>Hi ${newUser.name},</h1><p>You have successfully registered to E-Learning App</p>`,
    });
    return response;
    
}


const login = async (email,password) => {
    
    const user = await db.user.findUnique({
        where: {
            email,
        },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }
    
    const token = jwt.sign({ user: user }, JWT_ACCESS_SECRET, { expiresIn: EXPIRES_IN });
    const response = {
        id: user.id,        
        name: user.name,
        role: user.role, 
        avatar: user.avatar,       
        token: token
    };
    return response;
}


module.exports = {
  signup,
  login
};

