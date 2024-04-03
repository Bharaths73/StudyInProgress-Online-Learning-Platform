const Course=require('../models/Course');
const User=require('../models/User');
const Category=require('../models/Category')
const {uploadImageToCloudinary}=require('../utils/ImageUploader');
const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const mongoose=require('mongoose')
require('dotenv').config();

exports.createCourse=async(req,res)=>{
    try{
        const {courseName,courseDescription,whatYouWillLearn,price,tag,category,status,instructions}=req.body;
        console.log('requirements are ',instructions);
        const thumbnail=req.files.thumbnailImage;

        if(!courseName||!courseDescription||!whatYouWillLearn||!price||!tag
            ||!thumbnail
            ||!category||!instructions){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const userId=req.user.id;
        const instructorDetails=await User.findById(userId);
        console.log("instructor details ",instructorDetails);

        if(!instructorDetails){
            return res.status(400).json({
                success:false,
                message:"Instructor not found"
            })
        }

        const categoryDetails=await Category.findById(category);
        if(!categoryDetails){
            return res.status(400).json({
                success:false,
                message:"Category details not found"
            })
        }

        // upload image to cloudinary
        console.log("image is "+thumbnail);
        const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        //create new course entry in database
        const courseDetails=await Course.create({courseName:courseName,courseDescription:courseDescription,instructor:instructorDetails._id,whatYouWillLearn:whatYouWillLearn,price:price,category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
            status:status,instructions:JSON.parse(instructions),tag})

        console.log("course details are "+courseDetails);

        const updateCategory=await Category.findByIdAndUpdate(category,{$push:{course:courseDetails._id}},{new:true})

        //insructor course list should be updated
        await User.findByIdAndUpdate({_id:instructorDetails._id},{$push:{courses:courseDetails._id}},{new:true})

        //update tag to schema

        return res.status(200).json({
            success:true,
            message:"Course created successfully",
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

//get All courses

exports.showAllCourses=async(req,res)=>{
    try{
        const allCourses=await Course.find({},{courseName:true,price:true,thumbnail:true,instructor:true,ratingAndReview:true,studentsEnrolled:true}).populate('instructor').exec();

        return res.status(200).json({
            success:true,
            message:"Courses fetched successfully",
            allCourses
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Error fetching course"
        })
    }
}

//getCourseDetails
exports.getCourseDetails=async(req,res)=>{
    try{
        const  courseId  = req.body.courseId
        console.log("course is inside course details is ",courseId);
        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"course Id is Missing"
            })
        }

        const courseDetails=await Course.findById(courseId).populate({
            path:'instructor',populate:{path:'additionalDetails'},}).populate('category').populate('ratingAndReview').populate({path:'courseContent',populate:{path:'subSection'}}).exec();

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`could not find the course details of ${courseId}`
            })
        }

        return res.status(200).json({
            success:true,
            message:"Course Details fetched successfully",
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

exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      console.log("course is inside course edit is ",courseId);
      if(!courseId){
          return res.status(400).json({
              success:false,
              message:"course Id is Missing"
          })
      }

      const updates = req.body
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          }
          else if(key==='category'){
            const deletedCategory=await Category.findByIdAndUpdate(course.category,{$pull:{course:courseId}},{new:true})
            console.log("old category is ",deletedCategory);
            const updatedCategory=await Category.findByIdAndUpdate(updates[key],{$push:{course:courseId}},{new:true})
            course[key]=updates[key]
            console.log("new category is ",updatedCategory);

            if(!deletedCategory || !updatedCategory){
              return res.status(400).json({
                success:false,
                message:"could not change category"
              })
            }
            console.log("category id is ",updates[key]);
          } 
          else{
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      }).populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReview")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
        return res.status(200).json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  exports.getInstructorCourses=async(req,res)=>{
    console.log("hitting instructor course");
    try {
      const{id}=req.user;

      if(!id){
        return res.status(400).json({
          success:false,
          message:"user not found"
        })
      }

      const instructorCourses = await Course.find({
        instructor: id,
      })
      // .sort({ createdAt: -1 })
  

      return res.status(200).json({
        success:true,
        message:"course fetched successfully",
        data:instructorCourses
      })
    } catch (error) {
      return res.status(500).json({
        success:false,
        message:error.message
      })
    }
  }

  // Delete the Course
exports.deleteCourse = async (req, res) => {
  try {
    const {courseId} = req.body
    console.log("course id is ",courseId);
    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    const deletedCategory=await Category.findByIdAndUpdate(course.category,{$pull:{course:courseId}},{new:true})

    console.log("deleted category is ",deletedCategory);
    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}