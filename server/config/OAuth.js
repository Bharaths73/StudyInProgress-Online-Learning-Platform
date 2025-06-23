const passport = require('passport');
const User = require('../models/User');
const googleStatergy=require('passport-google-oauth20').Strategy;
require('dotenv').config()
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');
const Profile = require('../models/Profile');

const AuthenticateUser=async(profile,state)=>{
    console.log("passport middleware");
    const existingUser=await User.findOne({email:profile._json.email});
    let user;

    if(state==="login"){
        if(existingUser){
            user=existingUser;
        }
        else{
            throw new Error("User not found")
        }
    }

    else if(state==='signUp'){
        if(existingUser){
            throw new Error("User already registered, please login")
        }
        else{
            const profileDetails=await Profile.create({
                gender:null,
                dateOfBirth:null,
                contactNumber:null,
                about:null
            })

            user=await User.create({
                email:profile._json.email,
                firstName:profile._json.given_name,
                lastName:profile._json.family_name,
                password:await bcrypt.hash(profile._json.email+profile._json.given_name+profile._json.family_name,10),
                accountType:"Instructor",
                additionalDetails:profileDetails._id,
                image:profile._json.picture
            })
        }
    }

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
        data={
            token,options,user
        }
        return data;
}

passport.use(new googleStatergy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:'http://localhost:4000/api/v1/auth/google/callback',
    passReqToCallback: true 
},async (req,acsessToken,refreshToken,profile,done)=>{
    console.log(profile);
    const state = req.query.state;
    try {
        data=await AuthenticateUser(profile,state);
        return done(null,{profile,data})
    } catch (error){
        return done(error,null)
    }
}))