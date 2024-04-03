const User=require('../models/User');
const mailSender=require('../utils/MailSender');
const crypto=require('crypto');
const bcrypt=require('bcrypt')

//reset password token generator and sending email
exports.resetPasswordToken=async (req,res)=>{
   try{
    const {email}=req.body;
    console.log("reset email is ",email);

    if(!email){
        return res.status(401).json({
            success:false,
            message:"All field are required"
        })
    }
    const user=await User.findOne({email:email});
    if(!user){
        return res.status(403).json({
            success:false,
            message:"Email doesnot exists"
        })
    }

    const token=crypto.randomUUID();
    const updateedDetails=await User.findOneAndUpdate({email:email},{token:token,resetPasswordExpires:Date.now()+20*60*1000},{new:true});

    const url=`http://localhost:3000/update-password/${token}`;

    await mailSender(email,"Password reset link",`click link to reset password ${url}`);

    return res.status(200).json({
        success:true,
        message:"Email sent successfully"
    })
   }

   catch(err){
    return res.status(500).json({
        success:false,
        message:"something went wrong please try again"
    })
   }
}

//reset password
exports.resetPassword=async(req,res)=>{
    try{
        const {password,confirmPassword,token}=req.body;
        if(password!==confirmPassword){
            return res.status(401).json({
                success:false,
                message:"password and confirm password doesn't match"
            })
        }
        const userDetails=await User.findOne({token:token});
    
        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:"Token is invalid"
            })
        }
        if(userDetails.resetPasswordExpires<Date.now()){
            return res.status(400).json({
                success:false,
                message:"Token is expired please generate token"
            })
        }
    
        const hashedPassword=await bcrypt.hash(password,10);
        console.log(hashedPassword);
    
        const afterPasswordReset=await User.findOneAndUpdate({token:token},{password:hashedPassword},{new:true});
        console.log(afterPasswordReset);
    
        return res.status(200).json({
            success:true,
            message:"password reset successfull"
        })
    }

   catch(err){
    return res.status(500).json({
        success:false,
        message:"Failed to reset password"
    })
   }
}