import {combineReducers, createReducer} from '@reduxjs/toolkit'
import authReducer from '../Slices/AuthSlice'
import profileReducer from '../Slices/ProfileSlice'
import cartReducer from '../Slices/CartSlice'
import courseReducer from '../Slices/CourseSlice'
import viewCourseReducer from '../Slices/viewCourseSlice'

const rootReducer=combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
    viewCourse:viewCourseReducer
})
export default rootReducer;