const {db}=require('./utils/db');


const deleteUser= async ()=> {

try{
    //delete all users from db

    const user = await db.user.delete({where: {email:"soumilirupsa2020@gmail.com" }});
    console.log(' deleted');
}
catch(e){
    console.error(`Error deleting users: ${e}`);
}
}
module.exports = {
    deleteUser
};
