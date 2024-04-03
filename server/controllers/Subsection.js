const SubSection=require('../models/SubSection');
const Section=require('../models/Section');
const {uploadImageToCloudinary}=require('../utils/ImageUploader');
const Course = require('../models/Course');
require('dotenv').config();

exports.createSubSection=async(req,res)=>{
    try{
        const {title,desc,
            // duration,
            secId,courseId}=req.body;
        const video=req.files.video;

        console.log("subsection data ",title,desc,secId);
        if(!title||!desc||
            // !duration||
            !secId||!video||!courseId){
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            })
        }
        const videoUrl=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        console.log(videoUrl);
        const SubSectionDetails=await SubSection.create({title:title,description:desc,
        // timeDuration:`${videoUrl.duration}`
        videoUrl:videoUrl.secure_url});
        const SectionUpdation=await Section.findByIdAndUpdate(secId,{$push:{subSection:SubSectionDetails._id}},{new:true});

        const courseDetails=await Course.findById(courseId).populate({
            path: 'courseContent',
            populate: {
                path: 'subSection'
            }
        }).exec()

         return res.status(200).json({
                success:true,
                message:"Subsection added success",
                data:courseDetails
            })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.updateSubSection=async(req,res)=>{
    const {secId,subSecId,courseId}=req.body
}

exports.deleteSubSection=async(req,res)=>{
    try {
        const{secId,subSecId,courseId}=req.body

        if(!secId||!subSecId||!courseId){
            return res.status(400).json({
                success:false,
                message:"failed to delete sub section"
            })
        }
    
        const sectionDetails=await Section.findById(secId)
    
        if(!sectionDetails){
            return res.status(400).json({
                success:false,
                message:"section not found"
            })
        }
    
        const SubSectionDetails=await SubSection.findById(subSecId)
    
        if(!SubSectionDetails){
            return res.status(400).json({
                success:false,
                message:"sub section not found"
            })
        }
    
        const updatedSubSection=await SubSection.findByIdAndDelete(subSecId)
        const updatedSection=await Section.findByIdAndUpdate(secId,{$pull:{subSection:subSecId}},{new:true})
        const courseDetails=await Course.findById(courseId).populate({
            path:'courseContent',
            populate:{
                path:'subSection'
            }
        }).exec()

        return res.status(200).json({
            success:true,
            message:"sub section deleted successfully",
            data:courseDetails
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}