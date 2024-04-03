import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../Services/operations/ProfileApi'
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from 'react-router-dom';

export const EnrolledCourses = () => {
    const {token}=useSelector((state)=>state.auth)
    const [enrolledCourses,setEnrolledCourses]=useState()
    const navigate=useNavigate()

    const getEnrolledCourses=async()=>{
        try{
            const response=await getUserEnrolledCourses(token)
            console.log("enrolled corses are ",response);
            setEnrolledCourses(response)
        }
        catch(err){
            console.log("unable to fetch courses");
        }
    }

    useEffect(()=>{
        getEnrolledCourses()
    },[])

  return (
    <div className='text-white'>
        <div className='text-3xl text-white font-semibold mt-10'>Enrolled Courses</div>
        {
            !enrolledCourses? 
            (
                <div>Loading....</div>
            ):
                !enrolledCourses.length?(<p>You have not enrolled course</p>)
            :(
                <div className='mt-10'>
                    <div className='flex justify-between flex-wrap bg-richblack-600 py-3 px-4'>
                        <p className='flex flex-1 items-center'>Course Name</p>
                        {/* <p className='flex flex-1 justify-center'>Duration</p> */}
                        <p className='flex w-[30%] justify-center'>Progress</p>
                    </div>
                    {
                        enrolledCourses?.map((course,index)=>(
                            (
                                <div className='flex px-3 py-5 justify-between' key={index}>
                                    <div className='flex gap-4 flex-1 cursor-pointer' onClick={()=>navigate(`/view-course/${course._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`)}>
                                        <img src={course.thumbnail} className='h-20 w-32 border border-richblack-900 rounded-lg'/>
                                        <div className='flex flex-col w-full'>
                                            <p className='text-white text-lg font-semibold w-full'>{course.courseName}</p>
                                            <p className='text-md text-richblack-600 w-full'>{course?.courseDescription}</p>
                                        </div>
                                    </div>

                                    {/* <div className='flex flex-1'>
                                        {course?.totalDuration}
                                    </div> */}

                                    <div className='flex flex-col w-[30%] gap-x-2 ml-10'>
                                        <p>Progess: {course.progressPercentage || 0}%</p>
                                        <ProgressBar completed={course.progressPercentage || 0} height='8px' isLabelVisible={false} className='w-full'/>
                                    </div>
                                </div>
                            )
                        ))
                    }
                </div>
            )
        }
    </div>
  )
}
