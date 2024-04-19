const express = require('express');
const connect = require('./connect');
const authroute = require('./routes/auth.route');
const adminroute = require('./routes/admin.route');
const courseroute = require('./routes/courses.route');
const enrollroute = require('./routes/userenroll.route');
const userroute = require('./routes/user.route');
const verifyroute = require('./routes/verify.route');
const bodyparser = require('body-parser');  
const cors = require('cors');
const {authenticate,adminauthenticate} = require('./middleware/authmiddleware');
const app = express();
const port = 8080;
app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);
connect();
app.use(express.json());
app.use(bodyparser.json());
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));
app.use("/auth",authroute);
app.use("/admin",authenticate,adminauthenticate,adminroute);
app.use("/courses",courseroute);
app.use("/enroll",authenticate,enrollroute);
app.use("/user",authenticate,userroute);
app.use("/verify",verifyroute);


app.listen(port, () => {

    console.log(`Example app listening at http://localhost:${port}`);
    }
);






