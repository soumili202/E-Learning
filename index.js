const express = require('express');
const connect = require('./connect');
const authroute = require('./routes/auth.route');
const adminroute = require('./routes/admin.route');
const courseroute = require('./routes/courses.route');
const router = express.Router();
const createuser = require('./create_users');
const {authenticate,adminauthenticate} = require('./middleware/authmiddleware');
const e = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

connect();
app.use(express.json());
app.use("/auth",authroute);
app.use("/admin",authenticate,adminauthenticate,adminroute);
app.use("/courses",courseroute);

//app.use('/users', router);
app.delete ('/delete',(req,res)=>{
    createuser.deleteUser();
    res.send('All users deleted');
})

app.listen(port, () => {

    console.log(`Example app listening at http://localhost:${port}`);
    }
);






