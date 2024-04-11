const {db}=require('./utils/db');


const deleteUser= async ()=> {

try{
    //delete all users from db

    const user = await db.user.deleteMany();
    console.log('All users deleted');
}
catch(e){
    console.error(`Error deleting users: ${e}`);
}
}
module.exports = {
    deleteUser
};