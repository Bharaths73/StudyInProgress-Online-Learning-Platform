const ratingAndReview=require('../models/RatingAndReview')
const course=require('../models/Course');
const { default: mongoose } = require('mongoose');

//create rating
exports.createRating=async(req,res)=>{
    try{
        const {rating,review,courseId}=req.body;
        const userId=req.user.id;

        const userDetails=await course.findOne({_id:courseId,studentsEnrolled:{$elemMatch:{$eq:userId}}})

        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:'user not enrolled to this course'
            })
        }
        
        const alreadyReviewed=await ratingAndReview.findOne({user:userId,course:courseId})
        if(alreadyReviewed){
            return res.status(400).json({
                success:false,
                message:"user already reviewed the course"
            })
        }

        const ratingReview=await ratingAndReview.create({rating,review,course:courseId,user:userId})

        //update course with this rating
        const updatedCourseDetails=await course.findByIdAndUpdate(courseId,{$push:{ratingAndReview:ratingReview._id}},{new:true})

        return res.status(200).json({
            success:true,
            message:"successfully rated",
            ratingReview
        })

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

//get average rating
exports.getAverageRating=async(req,res)=>{
    try{
        const {courseId}=req.body;

        const result=await ratingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId)
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:'$rating'}
                }
            }
        ])

        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            })
        }

        return res.status(400).json({
            success:false,
            Message:"no ratings for this course",
            averageRating:0
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            Message:err.message,
        })
    }
}

//get all rating
exports.getAllRatingAndReview=async(req,res)=>{
    try{
        const allReviews=await ratingAndReview.find({}).sort({rating:'desc'}).populate({path:'user',select:'firstName,lastName,email,image'}).populate({path:'course',select:'courseName'}).exec();

        return res.status(400).json({
            success:true,
            Message:"all reviews fetched successfully",
            data:allReviews
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            Message:err.message,
        })
    }
}