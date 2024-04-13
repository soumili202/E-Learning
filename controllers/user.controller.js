const catchAsync = require('../utils/catchAsync');
const userservice = require('../services/user.service');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const verifyemail = catchAsync(async (req, res) => {
    const headers = req.headers;
    const payload = JSON.stringify(req.body);
    const verifiedPayload = await userservice.verifyemail(headers,payload);
    if (verifiedPayload.type == 'email.clicked'){
        const email = verifiedPayload.data.to[0];
        console.log (email);
        const changepass = await userservice.changepassword(email);
        res.status(httpStatus.OK).send(changepass);
    }

});

const resetpassword = catchAsync(async (req, res) => {
    const {password} = req.body;
    const email = req.user.email;
    const resetpass = await userservice.resetpassword(email,password);
    console.log("Password Stored",resetpass);
    res.status(httpStatus.OK).send("Reset Password Stored. Verify the email to update the password");
});

module.exports = {
    verifyemail,
    resetpassword
}