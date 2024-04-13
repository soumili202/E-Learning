const {db} = require('../utils/db');
const httpStatus = require('http-status');

const viewProfile = async (userId) => {
    const user = await db.user.findUnique({
        where: {
            id: userId
        }
    });
    if(!user) {
        throw new Error('User not found');
    }
    return user;
}




