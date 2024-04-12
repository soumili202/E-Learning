const {db} = require('../utils/db');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');


const enrollCourse = async (courseId, userId) => {
    const check = await db.userCourseEnrollment.findUnique({
        where:
        {
            userId,
            courseId
        }
    })
    if (check){
        throw new ApiError(httpStatus.FORBIDDEN,"Already Enrolled")
    }
    
    const enroll = await db.userCourseEnrollment.create({
        data: {
            courseId,
            userId
        }
    });
    const response = {
        id: enroll.id,
        course: enroll.courseId,
        user: enroll.userId
    };
    return response;
}

const getEnrolledCourses = async (userId) => {    
    
    const enrollment = await db.userCourseEnrollment.findMany({
        where: {
            userId: userId

        }

    });
    var courses = [];
    await Promise.all(enrollment.map(async enrollment => {
        let course = await db.course.findUnique ({where:{id:enrollment.courseId}})       
        courses.push(course)      

    }));
    
    return courses
}

module.exports = {
    enrollCourse,
    getEnrolledCourses
}
    

