const express=require('express')
const router=express.Router();

const {UpdateProfile,deleteAccount, getEnrolledCourses, updateProfilePicture}=require('../controllers/Profile');
const {auth, isStudent}=require('../middleware/auth')

router.put('/updateUserDetails',auth,UpdateProfile);
router.delete('/deleteProfile',auth,deleteAccount);
router.get('/getEnrolledCourses',auth,isStudent,getEnrolledCourses)
router.post('/updateProfilePicture',auth,updateProfilePicture)

module.exports=router;