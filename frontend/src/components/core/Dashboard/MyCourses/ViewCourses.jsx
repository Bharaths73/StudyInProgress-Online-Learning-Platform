import {React, useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { CourseTable } from './CourseTable'
import { fetchInstructorCourses } from '../../../../Services/operations/CourseApi'

export const ViewCourses=()=>{
    const {user}=useSelector((state)=>state.profile)
    const {token}=useSelector((state)=>state.auth)
    const [courses,setCourses]=useState()
    const navigate=useNavigate()
    // console.log("user courses are ",user.courses);

    const fetchCourses=async()=>{
        const result=await fetchInstructorCourses(token)
        if(result){
            console.log("courses result is ",result);
            setCourses(result)
        }
    }

    useEffect(()=>{
        fetchCourses()
    },[])

    return(
        <div className=''>
           <div className='flex justify-between'>
           <h1 className='text-white font-semibold text-2xl'>My Courses</h1>
            <button type='button' onClick={()=>navigate('/dashboard/add-course')} className='bg-yellow-50 rounded-md px-4 py-2 text-black'>Add Course</button>
           </div>

           {
            courses && <CourseTable courses={courses} setCourses={setCourses}/>
           }
        </div>
    )
}