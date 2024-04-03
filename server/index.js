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
const PORT=process.env.PORT||4000;

database.connect();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

cloudinaryConnect();

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
