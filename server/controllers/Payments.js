const {instance}=require('../config/Razorpay')
const User=require('../models/User');
const Course=require('../models/Course');
const mailSender=require('../utils/MailSender');
const crypto=require('crypto');
const mongoose  = require('mongoose');


exports.capturePayments=async(req,res)=>{
    console.log("hitting capture route");
    const {courses}=req.body
    const userId=req.user.id

    if(courses.length===0){
        return res.status(400).json({
            success:false,
            message:"Please select atleast one course"
        })
    }
    console.log("hitting capture route 1");
    let totalAmount=0
    for(const course_id of courses){
        let course;
        console.log("hitting capture route 3");
        try{
            course=await Course.findById(course_id)
            if(!course){
                return res.status(401).json({
                    success:false,
                    message:"course not found"
                })
            }
            console.log("hitting capture route 4");
            const uid=new mongoose.Types.ObjectId(userId)
            if(course.studentsEnrolled.includes(uid)){
                return res.status(400).json({
                    success:false,
                    message:"Student is already enrolled to this course"
                })
            }

            totalAmount+=course.price
            console.log("hitting capture route 5");
        }
        catch(err){
            console.log(err);
            return res.status(500).json({
                success:false,
                message:err.message
            })
        }
    }
    console.log("total amount is ",totalAmount)
    const options={
        amount:totalAmount*100,
        currency:"INR",
        receipt:Math.random(Date.now()).toString()
    }
    console.log("options of capture payment is ",options);

    try{
        console.log("hitting capture route 6");
        const paymentResponse=await instance.orders.create(options)
        res.json({
            success:true,
            message:"order success",
            data:paymentResponse
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


exports.verifySignature=async(req,res)=>{
    try {
    const razorpay_order_id=req.body.razorpay_order_id;
    const razorpay_payment_id=req.body.razorpay_payment_id;
    const razorpay_signature=req.body.razorpay_signature;
    const courses=req.body.courses
    const userId=req.user.id

    console.log("razorpay credentials are ",razorpay_order_id,razorpay_payment_id,razorpay_signature,courses,userId);
    
    if(!razorpay_order_id||!razorpay_payment_id||!razorpay_signature||!courses||!userId){
        return res.status(400).json({
            success:false,
            message:"payment failed"
        })
    }
    console.log("inside razorpay body");
    let body=razorpay_order_id+"|"+razorpay_payment_id
    const expectedSignature=crypto.createHmac('sha256',process.env.RAZORPAY_SECRET).update(body.toString()).digest('hex')
    console.log("expected signature is ",expectedSignature,body);

    if(expectedSignature===razorpay_signature){
        console.log("going to enroll");
        await enrollStudents(courses,userId,res)

        return res.status(200).json({
            success:true,
            message:"Payment verified"
        })
    }
    return res.status(400).json({
        success:false,
        message:"Payment failed"
    })
    } 
    catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const enrollStudents=async(courses,userId,res)=>{
    console.log("enrolling students");
    for(const courseId of courses){
        try {
            const enrolledCourse=await Course.findOneAndUpdate({_id:courseId},{$push:{studentsEnrolled:userId}},{new:true})
        
        if(!enrolledCourse){
            return res.status(500).json({
                success:false,
                message:`${courseId} Course not found`
            })
        }

        const enrolledStudents=await User.findByIdAndUpdate({_id:userId},{$push:{courses:courseId}},{new:true})

        if(!enrolledStudents){
            return res.status(400).json({
                success:false,
                message:"Failed to push course to user"
            })
        }

        const emailResponse=await mailSender(enrolledStudents.email,`Successfully enrolled into ${enrolledCourse.courseName}`,`<p>YOU ARE SUCCESSFULLY ENROLLED</p>`)

        console.log("Email sent successfully",emailResponse);
        } 
        catch (error) {
            return res.status(500).json({
                success:false,
                message:err.message
            })
        }
    }

}


exports.sendPaymentSuccessEmail=async(req,res)=>{
    const {orderId,paymentId,amount}=req.body
    const userId=req.user.id;

    if(!orderId||!paymentId||!amount){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }

    try {
        const enrolledStudents=await User.findById(userId)
        const mailResponse=await mailSender(enrolledStudents.email,'Payment received successfully',`<p>Your order id is ${orderId} and your payment id is ${paymentId} and amount is ${amount}</p>`)
    } catch (error) {
        console.log("error in sending mail",error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


//capture payments and initiate razorpay order
// exports.capturePayments=async(req,res)=>{
//     const {courseId}=req.body;
//     const userId=req.user.id;

//     if(!courseId){
//         return res.status(401).json({
//             success:false,
//             message:"please provide valid course_id"
//         })
//     }

//     let course;
//     try{
//         course=await Course.findById(courseId);
//         if(!course){
//             return res.status(401).json({
//                 success:false,
//                 message:"cloud not find course"
//             })
//         }

//         //to check wheather the student has already bought the course
//         const uid=new mongoose.Types.ObjectId(userId);
//         if(course.studentsEnrolled.includes(uid)){
//             return res.status(401).json({
//                 success:false,
//                 message:"Student already enrolled"
//             })
//         }
//     }
//     catch(err){
//         return res.status(401).json({
//             success:false,
//             messgae:err.message
//         })
//     }

//     //creation of order
//     const amount=course.price;
//     const currency='INR';

//     const options={
//         amount:amount*100,
//         currency:currency,
//         receipt:Math.random(Date.now()).toString(),
//         notes:{
//             courseId:courseId,
//             userId:userId
//         }
//     }

//     try{
//         //initiate payment using razorpay
//         const paymentResponse=await instance.orders.create(options);
//         console.log(paymentResponse);

//         return res.status(401).json({
//             success:true,
//             courseName:course.courseName,
//             courseDesc:course.courseDescription,
//             thumbnail:course.thumbnail,
//             orderId:paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount
//         })
//     }
//     catch(err){
//         return res.status(401).json({
//             success:false,
//             messgae:err.message
//         })
//     }
// }

// //verify signature of razorpay and server
// exports.verifySignature=async(req,res)=>{
//     const webHookSecret="12345"
//     const signature=req.headers['x-razorpay-signature'];

//     const shaSum=crypto.createHmac('sha256',webHookSecret);
//     shaSum.update(JSON.stringify(req.body));
//     const digest=shaSum.digest('hex');

//     if(digest===signature){
//         console.log("payment is authorized");

//         const {courseId,userId}=req.body.payload.payment.entity.notes;
//         try{
//             const enrolledCourse=await Course.findByIdAndUpdate(courseId,{$push:{studentsEnrolled:userId}},{new:true})

//             if(!enrolledCourse){
//                 return res.status(400).json({
//                     success:false,
//                     message:"course not found"
//                 })
//             }
//             console.log(enrolledCourse);

//             const enrolledStudent=await User.findByIdAndUpdate(userId,{$push:{courses:courseId}},{new:true});

//             console.log(enrolledStudent);

//             const mail=await mailSender(enrolledStudent.email,"Enrolled Successfully","congragulation")

//             return res.status(400).json({
//                 success:true,
//                 message:"mail sent"
//             })
//         }
//         catch(err){
//             return res.status(500).json({
//                 success:false,
//                 message:err.message
//             })
//         }
//     }

//     return res.status(400).json({
//         success:false,
//         message:"invalid request"
//     })
// }