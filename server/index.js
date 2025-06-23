const express=require('express');
const app=express();
const userRoutes=require('./routes/User')
const profileRoutes=require('./routes/Profile');
const paymentRoutes=require('./routes/Payment')
const courseRoutes=require('./routes/Course');
const contactUsRoute=require('./routes/ContactUs')
const database=require('./config/database');
const cookieParser=require('cookie-parser')
const cors=require('cors');
const {cloudinaryConnect}=require('./config/cloudinaryConnect');
const fileUpload=require('express-fileupload');
require('dotenv').config();
const passport = require('passport');
const googleStatergy=require('passport-google-oauth20').Strategy;
const OAuth=require('./config/OAuth')
const PORT=process.env.PORT||4000;

database.connect();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"*",
        credentials:true
    })
)
app.use(passport.initialize());
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

cloudinaryConnect();
// app.use(OAuth)
// app.get('/api/v1/auth/google',passport.authenticate('google',{session:false, scope:["profile","email"]}),()=>{
//     console.log('/auth/google');
// })
app.get('/api/v1/auth/google/login', passport.authenticate('google', { 
    session:false,
    scope: ['profile', 'email'],
    state: 'login' // Pass state to differentiate
}));

// Route for Google signup
app.get('/api/v1/auth/google/signup', passport.authenticate('google', { 
    session:false,
    scope: ['profile', 'email'],
    state: 'signUp' // Pass state to differentiate
}));

app.get('/api/v1/auth/google/callback',passport.authenticate('google',{session:false, failureRedirect:"/login"}),(req,res)=>{
    const{data,profile}=req.user
    console.log("data is ",data);
    res.cookie('token',data.token,data.options).status(200).json({
            success:true,
            token:data.token,
            user:data.user,
            message:'Logged in successfully'
        })
    res.redirect("http://localhost:3000/dashboard/my-profile")
})
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use('/api/v1/about',contactUsRoute)

//default route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"server is running"
    })
})

app.listen(PORT,()=>{
    console.log("app is running at ",PORT);
})
