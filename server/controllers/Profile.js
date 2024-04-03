const User=require('../models/User');
const Profile=require('../models/Profile');
const { uploadImageToCloudinary } = require('../utils/ImageUploader');

exports.UpdateProfile=async(req,res)=>{
    try{
        console.log("user details updation is ",req.body);
        const updates=req.body;
        const userId=req.user.id

        // if(
        //     // !gender||
        //     !contactNumber){
        //     return res.status(401).json({
        //         success:false,
        //         message:"all fields are required"
        //     })
        // }

        const userDetails=await User.findById(userId);
        const profileId=userDetails.additionalDetails;
        const profile=await Profile.findById(profileId)

        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
              if (key === "dateOfBirth") {
                profile[key] = JSON.parse(updates[key])
              } else {
                profile[key] = updates[key]
              }
            }
          }

          await profile.save()

        // const profileDetails=await Profile.findByIdAndUpdate(profileId,{gender:gender,dateOfBirth:dob,about:about,contactNumber:contactNumber},{new:true});
        const updatedDetails=await User.findById(userId).populate('additionalDetails').exec()

        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            data:updatedDetails
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

//delete account
exports.deleteAccount=async(req,res)=>{
    try{
        const userId=req.user.id
        const userDetails=await User.findById(userId);

        if(!userId){
            return res.status(400).json({
                success:false,
                message:"user not found"
            })
        }

        const deleteProfile=await Profile.findByIdAndDelete(userDetails.additionalDetails);
        const deleteUser=await User.findByIdAndDelete(userId);

        res.clearCookie('token',{path:'/'})

        return res.status(200).json({
            success:true,
            message:"Profile deleted successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Profile deletion failed"
        })
    }
}

exports.getEnrolledCourses=async(req,res)=>{
    try{
        const userId=req.user.id;

        const userDetails=await User.findOne({_id:userId}).populate({
            path:'courses',
            populate:{
                path:'courseContent',
                populate:{
                    path:'subSection'
                }
            }
        }).exec()

        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"no user found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"courses fetched successfully",
            data:userDetails.courses
        })
    }
    catch{
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.updateProfilePicture=async(req,res)=>{
    try{
        const {displayPicture}=req.files
        const userId=req.user.id
        console.log("uploaded file is ",displayPicture);

        if(!displayPicture||!userId){
            return res.status(400).json({
                success:false,
                message:`missing display picture or userId`
            })
        }

        const updatedPicture=await uploadImageToCloudinary(displayPicture,process.env.FOLDER_NAME)
        const pictureUrl=updatedPicture.secure_url

        const userDetails=await User.findByIdAndUpdate({_id:userId},{image:pictureUrl},{new:true}).populate('additionalDetails').exec()
        return res.status(200).json({
            success:true,
            message:"profile picture updated successfully",
            data:userDetails
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}