const User=require('../models/User');
const OTP=require('../models/Otp');
const otpGen=require('otp-generator');
const Profile=require('../models/Profile')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');
require('dotenv').config();

exports.sendOtp=async (req,res)=>{
    try {
        const  email  = req.body.email;
        console.log("otp email is ",email);
        const checkUserPresent = await User.findOne({ email:email });

        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already exists"
            })
        }

        let otp=otpGen.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })

        console.log("otp is ",otp);

        const otpResult=await OTP.findOne({otp:otp})
        while(otpResult){
            otp=otpGen(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets: false,
                specialChars: false
            })
            otpResult=await OTP.findOne({otp:otp});
        }

        const otpPayload={email,otp};
        const otpBody=await OTP.create(otpPayload);

        return res.status(200).json({
            success:true,
            message:'OTP send successfully',
            otpBody
        })

    }
catch(err){
    console.log(err);
    return res.status(500).json({
        success:false,
        message:err.message
    })
}

}


//signup

exports.signUp=async(req,res)=>{
    try{
        const {firstName,lastName,email,password,confirmPassword,accountType,otp,contactNumber}=req.body;

        if(!firstName||!lastName||!email||!password||!confirmPassword||!otp){
            return res.status(403).json({
                success:false,
                message:'All fields are mandatory'
            })
        }
    
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:'password and confirm password doesnot match'
            })
        }
    
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User is already registered'
            })
        }
    
        const recentOtp=await OTP.find({email:email}).sort({createdAt:-1}).limit(1);
        console.log("db otp is ",recentOtp);
        if(recentOtp.length==0){
            return res.status(400).json({
                success:false,
                message:'OTP not found'
            })
        }
        else if(otp!==recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:'Invalid OTP'
            })
        }
    
    const hashedPassword=await bcrypt.hash(password,10);

    // let approved = "";
	// 	approved === "Instructor" ? (approved = false) : (approved = true);
    
    const profileDetails=await Profile.create({
        gender:null,
        dateOfBirth:null,
        contactNumber:null,
        about:null
    })
    
    const user=await User.create({
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:hashedPassword,
        contactNumber:contactNumber,
        accountType:accountType,
        additionalDetails:profileDetails._id,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
    })
    return res.status(200).json({
        success:true,
        message:"User is registered successfully",
        user
    })
    }

catch(err){
    return res.status(500).json({
        success:false,
        message:err.message,
    })
}

}

//login
exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        console.log("server user is ",email,password);
        
        if(!email||!password){
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            })
        }

        const user=await User.findOne({email}).populate('additionalDetails')
        console.log("user is ",user);

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered",
            })
        }

        if(await bcrypt.compare(password,user.password)){
            const payload={
                email:user.email,
                id:user._id,
                role:user.accountType
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:'2h'
            })
            user.token=token;
            user.password=undefined;

            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true
            }
            res.cookie('token',token,options).status(200).json({
                success:true,
                token,
                user,
                message:'Logged in successfully'
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect",
            })
        }
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Login failed please try again",
            err
        })
    }
}

//change password
exports.changePassword= async (req,res)=>{
    try{
        // const token=req.body.token||req.cookies.token||req.header('Authorisation').replace('Bearer','');
        // if(!token){
        //     return res.status(401).json({
        //         success:false,
        //         message:"Token is missing please login"
        //     })
        // }
        
        const {oldPassword,newPassword,confirmPassword}=req.body;
        if(!oldPassword||!newPassword||!confirmPassword){
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            })
        }
        const user=await User.findOne({email:req.user.email});
        const userOldPassword=user.password;

    if(await bcrypt.compare(oldPassword,userOldPassword)){
            const payload={
                email:user.email,
                id:user._id,
                role:user.accountType
            }
        }

       else{
            return res.status(401).json({
                success:false,
                message:"Old password is not matching"
            })
        }
        if(newPassword!==confirmPassword){
            return res.status(401).json({
                success:false,
                message:"New password and confirm password is not matching"
            })
        }
    
        const newHashedPassword=await bcrypt.hash(newPassword,10);
        const updateUser=await User.findOneAndUpdate({email:req.user.email},{password:newHashedPassword},{new:true});
        console.log(updateUser);
    
        return res.status(200).json({
            success:true,
            message:"password changed successfully"
        })
    }

    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}