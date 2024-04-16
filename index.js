const express = require('express');
const connect = require('./connect');
const authroute = require('./routes/auth.route');
const adminroute = require('./routes/admin.route');
const courseroute = require('./routes/courses.route');
const enrollroute = require('./routes/userenroll.route');
const userroute = require('./routes/user.route');
const verifyroute = require('./routes/verify.route');
const bodyparser = require('body-parser');
const {errorConverter,errorHandler} = require('./middleware/error');    
const cors = require('cors');
const router = express.Router();
const createuser = require('./create_users');
const {authenticate,adminauthenticate} = require('./middleware/authmiddleware');
const config = require('./config');
const app = express();
const port = config.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);
connect();
app.use(express.json());
app.use(bodyparser.json());
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));
//app.use(errorConverter);
//app.use(errorHandler);
app.use("/auth",authroute);
app.use("/admin",authenticate,adminauthenticate,adminroute);
app.use("/courses",courseroute);
app.use("/enroll",authenticate,enrollroute);
app.use("/user",authenticate,userroute);
app.use("/verify",verifyroute);


app.delete ('/delete',(req,res)=>{
    createuser.deleteUser();
    res.send('All users deleted');
})

//app.use(errorConverter);
//app.use(errorHandler);



app.listen(port, () => {

    console.log(`Example app listening at http://localhost:${port}`);
    }
);






