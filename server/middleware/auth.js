const jwt=require('jsonwebtoken');
require('dotenv').config();
const User=require('../models/User');

exports.auth=async(req,res,next)=>{
    try{
        const token=req.cookies.token||req.body.token||req.header('Authorisation').replace('Bearer ','')

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            })
        }
        console.log(token);

        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET)
            console.log(decode);
            req.user=decode
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:"Invalid Token"
            })
        }
        next();
    }
    catch{
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token"
        })
    }
}

//isStudent
exports.isStudent=async(req,res,next)=>{
   try{
      const {role}=req.user;
      if(role!=='Student'){
        return res.status(401).json({
            success:false,
            message:"This is a procted page for student only"
        })
      }
      next();
   }
   catch(err){
    return res.status(500).json({
        success:false,
        message:"User role cannot be verified,please try again"
    })
   }
}

//isInstructor
exports.isInstructor=async(req,res,next)=>{
    try{
       const {role}=req.user;
       if(role!=='Instructor'){
         return res.status(401).json({
             success:false,
             message:"This is a procted page for Instructor only"
         })
       }
       next();
    }
    catch(err){
     return res.status(500).json({
         success:false,
         message:"User role cannot be verified,please try again"
     })
    }
 }

 //isAdmin
 exports.isAdmin=async(req,res,next)=>{
    try{
       const {role}=req.user;
       console.log(role);
       if(role!=='Admin'){
         return res.status(401).json({
             success:false,
             message:"This is a procted page for admin only"
         })
       }
       next();
    }
    catch(err){
     return res.status(500).json({
         success:false,
         message:"User role cannot be verified,please try again"
     })
    }
 }