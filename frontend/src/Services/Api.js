const BASE_URL=process.env.REACT_APP_BASE_URL

export const categories={
    CATEGORIES_API:BASE_URL+"/course/showAllCategories"
}

export const endPoints={
    LOGIN_API:BASE_URL+"/auth/login",
    RESETPASSWORD_API:BASE_URL+"/auth/resetPasswordToken",
    UPDATEPASSWORD_API:BASE_URL+"/auth/resetPassword",
    SEND_OTP_API:BASE_URL+"/auth/sendOtp",
    SIGN_UP_API:BASE_URL+"/auth/signUp",
    CONTACT_US_API:BASE_URL+"/about/contactus",
    CHANGE_PASSWORD:BASE_URL+'/auth/changePassword'
}

export const profileEndPoints={
    ENROLLED_COURSES_API:BASE_URL+"/profile/getEnrolledCourses",
    UPADATE_PROFILE_PIC_API:BASE_URL+"/profile/updateProfilePicture",
    UPDATE_USER_API:BASE_URL+'/profile/updateUserDetails'
}

export const courseEndPoints={
    ADD_NEW_COURSE_API:BASE_URL+"/course/createCourse",
    ADD_NEW_SECTION_API:BASE_URL+"/course/addSection",
    UPDATE_SECTION_API:BASE_URL+"/course/updateSection",
    ADD_NEW_SUB_SECTION_API:BASE_URL+"/course/addSubSection",
    DELETE_SECTION_API:BASE_URL+"/course/deleteSection",
    DELETE_SUB_SECTION_API:BASE_URL+"/course/deleteSubSection",
    EDIT_COURSE_API:BASE_URL+"/course/editCourse",
    FETCH_INSTRUCTOR_COURSES:BASE_URL+"/course/getInstructorCourses",
    DELETE_COURSE_API:BASE_URL+"/course/deleteCourse",
    COURSE_DETAILS_API:BASE_URL+"/course/getCourseDetails"
}

export const categoryPageEndPoints={
    CATALOG_API:BASE_URL+"/course/getCategoryPageDetails"
}

export const studentEndPoints={
    COURSE_PAYMENT_API:BASE_URL+'/payment/capturePayment',
    COURSE_VERIFY_API:BASE_URL+'/payment/verifyPayment',
    SEND_PAYMENT_SUCCESS_EMAIL_API:BASE_URL+'/payment/sendPaymentSuccessEmail',
    SEND_RATING_REVIEW:BASE_URL+"/course/createRating"
}