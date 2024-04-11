const {db} = require('../utils/db');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const createCourse = async (name,rating,category,level) => {
        
        const course = await db.course.create({
            data: {
                name,
                rating,
                category,
                level
                
            },
        });
        const response = {
            id: course.id,
            name: course.name,
            rating: course.rating,            
            category: course.category,
            level: course.level
            
        };
        return response;
    }


    
const deleteCourse = async (id) => {
   
    const course = await db.course.findUnique({
        where:{
            id:id
        }

    })
    if (!course) {
        throw new ApiError(httpStatus.BAD_REQUEST,"No such Course")

    }

    await db.course.delete({
        where: {
            id: id
        }
    });
    const response="Succesfully Deleted"
    return response 



}

module.exports = {
    createCourse,
    deleteCourse
}


