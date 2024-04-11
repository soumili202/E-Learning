const {db} = require('../utils/db');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const getallcourses = async () => {
    
    const courses = await db.course.findMany();
    const response = courses.map((course) => ({        
        id: course.id,
        name: course.name,                 
        
    }));
    return response;
}

const getCoursebyID = async (id) => {
        
        const course = await db.course.findUnique({            
            where:{
                id:id
            }
    
        })
        if (!course) {
            throw new ApiError(httpStatus.BAD_REQUEST,"No such Course")
    
        }
        const response = {
            id: course.id,
            name: course.name,
            rating: course.rating,            
            category: course.category,
            level: course.level
            
        };
        return response;
    
    }
 const getCoursebyCategory = async (category) => {
            
            const course = await db.course.findMany({
                where:{
                    category:category
                }
        
            })
            if (!course) {
                throw new ApiError(httpStatus.BAD_REQUEST,"No such Course")
        
            }
            const response = course.map((course) => ({
                id: course.id,
                name: course.name,
                rating: course.rating,            
                category: course.category,
                level: course.level
                
            }));
            return response;
        
        }
const getCoursebyLevel = async (level) => {
                
                const course = await db.course.findMany({
                    where:{
                        level:level
                    }
            
                })
                if (!course) {
                    throw new ApiError(httpStatus.BAD_REQUEST,"No such Course")
            
                }
                const response = course.map((course) => ({
                    id: course.id,
                    name: course.name,
                    rating: course.rating,            
                    category: course.category,
                    level: course.level
                    
                }));
                return response;
            
            }

    

module.exports = {
    getallcourses,
    getCoursebyID,
    getCoursebyCategory,
    getCoursebyLevel
}









