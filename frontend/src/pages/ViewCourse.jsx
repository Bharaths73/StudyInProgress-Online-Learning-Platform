import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../Slices/viewCourseSlice'
import { VideoDetailsSidebar } from '../components/core/ViewCourse/VideoDetailsSidebar'
import { fetchCoursesDetails } from '../Services/operations/CourseApi'
import { CourseReviewModal } from '../components/core/ViewCourse/CourseReviewModal'

export const ViewCourse = () => {
    const [reviewModal,setReviewModal]=useState(false)
    const [loading,setLoading]=useState(false)
    const {courseId}=useParams()
    const {token}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()

    useEffect(()=>{
        const getParticularCourseDetails=async()=>{
            setLoading(true)
            const result=await fetchCoursesDetails(courseId,token)

            if(result){
                dispatch(setCourseSectionData(result?.courseContent))
                dispatch(setEntireCourseData(result))
                // dispatch(setCompletedLectures())
                let lectures=0
                result?.courseContent?.forEach(element => {
                lectures+=element.subSection?.length
        })
        dispatch(setTotalNoOfLectures(lectures))
            }
            setLoading(false)
        }
        getParticularCourseDetails()
    },[])

  return (
    <div>
        <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
            <VideoDetailsSidebar setReviewModal={setReviewModal}/>

           <div className='h-[calc(100vh-3.5rem)] overflow-auto mx-auto w-full'>
           <div className='mx-auto w-[90%] py-10 mt-1'>
                <Outlet/>
            </div>
           </div>
        </div>
        {
            reviewModal &&  (<CourseReviewModal setReviewModal={setReviewModal}/>)
        }
    </div>
  )
}
