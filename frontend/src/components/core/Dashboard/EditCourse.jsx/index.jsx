import {React, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RenderSteps } from '../AddCourses/RenderSteps'
import { setCourse, setEditCourse } from '../../../../Slices/CourseSlice'
import { fetchCoursesDetails } from '../../../../Services/operations/CourseApi'

export const EditCourse=()=>{
    const dispatch=useDispatch()
    const {courseId}=useParams()
    const {course}=useSelector((state)=>state.course)
    const {token}=useSelector((state)=>state.auth)
    const[loading,setLoading]=useState(false)

    useEffect(()=>{
        const populateCourseDetails=async()=>{
            setLoading(true)
            console.log("course id of edit course is ",courseId);
            const result=await fetchCoursesDetails(courseId,token)
            console.log("result of course details ",result);
            if(result){
                dispatch(setEditCourse(true))
                dispatch(setCourse(result))
                console.log("course of state is ",course);
            }
            setLoading(false)
        }
        populateCourseDetails()
    },[courseId])

    if (loading) {
        return (
          <div className="grid flex-1 place-items-center">
            <div className='text-white'> Loading....</div>
          </div>
        )
      }

    return(
        <div className='text-white'>
            <h1 className=' text-2xl font-semibold'>Edit Course</h1>
            <div>
                {
                    course ? (<RenderSteps/>):(<p>Course not found</p>)
                }
            </div>
        </div>
    )
}