const express = require('express');
const connect = require('./connect');
const authroute = require('./routes/auth.route');
const adminroute = require('./routes/admin.route');
const courseroute = require('./routes/courses.route');
const enrollroute = require('./routes/userenroll.route');
const userroute = require('./routes/user.route');
const verifyroute = require('./routes/verify.route');
const router = express.Router();
const createuser = require('./create_users');
const {authenticate,adminauthenticate} = require('./middleware/authmiddleware');
const e = require('express');
const app = express();
const port = 3000;
const {Webhook}= require('svix')
const secret = process.env.WEBHOOK_SECRET;

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

connect();
app.use(express.json());
app.use("/auth",authroute);
app.use("/admin",authenticate,adminauthenticate,adminroute);
app.use("/courses",courseroute);
app.use("/enroll",authenticate,enrollroute);
app.use("/user",authenticate,userroute);
app.use("/verify",verifyroute);

//app.use('/users', router);
app.delete ('/delete',(req,res)=>{
    createuser.deleteUser();
    res.send('All users deleted');
})


app.listen(port, () => {

    console.log(`Example app listening at http://localhost:${port}`);
    }
);






