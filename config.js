require('dotenv').config();


const config = {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    EXPIRES_IN: process.env.EXPIRES_IN,
    RESEND_KEY: process.env.RESEND_KEY,
    WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    CLOUDINARY_API: process.env.CLOUDINARY_API,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    PORT: process.env.PORT
}

module.exports = config;