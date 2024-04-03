const express=require('express');
const router=express.Router();

const {createCourse,showAllCourses,getCourseDetails, editCourse, getInstructorCourses, deleteCourse}=require('../controllers/Course');
const {createCategory,categoryPageDetails,showAllCategory}=require('../controllers/Category');
const {updateSection,createSection,deleteSection}=require('../controllers/Section')
const {createSubSection, deleteSubSection}=require('../controllers/Subsection')
const {createRating,getAllRatingAndReview,getAverageRating}=require('../controllers/RatingAndReview');
const{auth,isStudent,isInstructor, isAdmin}=require('../middleware/auth')


router.post('/createCourse',auth,isInstructor,createCourse);
router.post('/addSection',auth,isInstructor,createSection)
router.post('/addSubSection',auth,isInstructor,createSubSection)
router.post('/createCategory',auth,isAdmin,createCategory);
router.get('/showAllCategories',showAllCategory);
router.post('/getCategoryPageDetails',categoryPageDetails);
router.post('/createRating',auth,isStudent,createRating);
router.get('/getAverageRating',getAverageRating);
router.get('/getReviews',getAllRatingAndReview);
router.get('/showAllCourses',auth,showAllCourses);
router.post('/updateSection',auth,isInstructor,updateSection);
router.delete('/deleteSection',auth,isInstructor,deleteSection);
router.delete('/deleteSubSection',auth,isInstructor,deleteSubSection)
router.post('/editCourse',auth,isInstructor,editCourse)
router.get('/getInstructorCourses',auth,isInstructor,getInstructorCourses)
router.delete('/deleteCourse',auth,isInstructor,deleteCourse)
router.post('/getCourseDetails',getCourseDetails)


module.exports=router;