const {db} = require('../utils/db');
const httpStatus = require('http-status');
const {Webhook}= require('svix')
const {Resend} = require('resend')
const bcrypt = require('bcrypt');
const secret = process.env.WEBHOOK_SECRET;
const RESEND_KEY = process.env.RESEND_KEY;



const verifyemail = async (headers,payload) => {
    const wh = new Webhook(secret);
    try {
        const verifiedPayload = wh.verify(payload, headers);
        console.log('Webhook verified. Payload:', verifiedPayload);
        return verifiedPayload;
    } catch (error) {
        console.error('Webhook verification failed:', error.message);
        throw new ApiError(httpStatus.FORBIDDEN,"Webhook verification failed")
    }
    

}

const resetpassword = async (email,password)=>{
    const user = await db.user.findUnique({
        where:{
            email:email
        }
    });
    if (!user){
        throw new ApiError(httpStatus.BAD_REQUEST,"No such user")
    }    
    const npassword = await bcrypt.hash(password,10);
    const updated = await db.user.update({
        where:{
            email:email
        },
        data:{
            tpassword:npassword
        }
    });
    const resend = new Resend(RESEND_KEY);
    resend.emails.send({
        from: 'elearning@soumilimukherjeekgpian.me',
        to: email,
        subject: 'Request To Reset Password',
        html: `<h1>Hi ${user.name},</h1><p>There has been a request to reset your password at E-Learning.</p><p> Click here to verify it was you <a href="https://resend.com/docs/dashboard/webhooks/verify-webhooks-requests">Verify</a></p>`,
    });

    return updated;
}

const changepassword = async (email)=>{
    const user = await db.user.findUnique({
        where:{
            email:email
        }
    });
    if (!user){
        throw new ApiError(httpStatus.BAD_REQUEST,"No such user")
    }
    
    const updated = await db.user.update({
        where:{
            email:email
        },
        data:{
            password:user.tpassword
        }
    });
    return updated;
}


module.exports = {
    verifyemail,
    resetpassword,
    changepassword
}








