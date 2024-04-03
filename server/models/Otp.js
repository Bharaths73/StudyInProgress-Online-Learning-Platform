const mongoose=require('mongoose');
const mailSender = require('../utils/MailSender');

const otpSchema=new mongoose.Schema({
  email:{
    type:String,
    required:true
  },
  otp:{
    type:String,
    required:true
  },
  createdAt:{
    type:Date,
    default:Date.now(),
    expires:20*60
  }
})

async function sendVerificationEmail(email,otp){
    try{
        const mailResponse=await mailSender(email,'Verification Mail',otp);
        console.log('email sent successfully');
    }
    catch(err){
        console.log("error occured while sending mail",err);
        throw err;
    }
}

otpSchema.pre('save',async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next()
})

module.exports=mongoose.model('OTP',otpSchema);