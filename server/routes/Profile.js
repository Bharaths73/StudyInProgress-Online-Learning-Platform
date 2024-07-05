const express=require('express')
const router=express.Router();

const {UpdateProfile,deleteAccount, getEnrolledCourses, updateProfilePicture, instructorDashboard}=require('../controllers/Profile');
const {auth, isStudent, isInstructor}=require('../middleware/auth');


router.put('/updateUserDetails',auth,UpdateProfile);
router.delete('/deleteProfile',auth,deleteAccount);
router.get('/getEnrolledCourses',auth,isStudent,getEnrolledCourses)
router.post('/updateProfilePicture',auth,updateProfilePicture)
router.get('/instructorDashboard',auth,isInstructor,instructorDashboard)

module.exports=router;