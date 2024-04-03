const Section=require('../models/Section');
const SubSection=require('../models/SubSection');
const Course=require('../models/Course');

exports.createSection=async(req,res)=>{
    try{
        const {secName,courseId}=req.body;
        console.log("section name is ",secName);

        if(!secName||!courseId){
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            })
        }

        const sectionDetails=await Section.create({sectionName:secName});
        const courseDetails=await Course.findByIdAndUpdate(courseId,{$push:{courseContent:sectionDetails._id}},{new:true}).populate({
            path:'courseContent',
            populate:{
                path:"subSection"
            }
        })
    
        return res.status(200).json({
            success:true,
            message:"section created successfully",
            data:courseDetails,
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }

   
}

//update section
exports.updateSection=async(req,res)=>{
    try{
        const {secName,sectionId,courseId}=req.body;

        if(!secName||!sectionId||!courseId){
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            })
        }

        const updatedSection=await Section.findByIdAndUpdate(sectionId,{sectionName:secName},{new:true});
        const courseDetails=await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec()

        return res.status(200).json({
            success:true,
            message:"Section Updated successfully",
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

//delete Section
exports.deleteSection=async (req,res)=>{
    try{
        const {secId,courseId}=req.body;

        if(!secId){
            return res.status(500).json({
                success:false,
                message:"Section deletion failed"
            })
        }
    
        const section = await Section.findById(secId);
        if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}


        await SubSection.deleteMany({_id: {$in: section.subSection}});
        
        const sectionAfterDelete=await Section.findByIdAndDelete(secId);
        const coursAfterDeletion=await Course.findByIdAndUpdate(courseId,{$pull:{courseContent:secId}},{new:true}).populate({
            path:'courseContent',
            populate:{
                path:'subSection'
            }
        }).exec();    

       

        return res.status(200).json({
            success:true,
            message:"Section deleted successfully",
            data:coursAfterDeletion
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Section deletion failed"
        })
    }
}