const express=require('express');
const router=express.Router();

const{sendOtp,signUp,login,changePassword}=require('../controllers/Auth')
const{resetPassword,resetPasswordToken}=require('../controllers/ResetPassword')
const{isAdmin,auth,isInstructor,isStudent}=require('../middleware/auth')

router.post('/login',login);
router.post('/signUp',signUp);
router.post('/sendOtp',sendOtp);
router.post('/changePassword',auth,changePassword);
router.post('/resetPassword',resetPassword);
router.post('/resetPasswordToken',resetPasswordToken)

module.exports=router;