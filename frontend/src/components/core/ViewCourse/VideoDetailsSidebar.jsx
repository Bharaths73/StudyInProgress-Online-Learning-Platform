import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { setEntireCourseData } from '../../../Slices/viewCourseSlice'
import { TiArrowSortedDown } from "react-icons/ti";
import { IoArrowBackOutline } from "react-icons/io5";

export const VideoDetailsSidebar = ({setReviewModal}) => {
    const [activeSection,setActiveSection]=useState("")
    const [videoBarActive,setVideoBarActive]=useState("")
    const {sectionId,subSectionId}=useParams()
    const navigate=useNavigate()
    const location=useLocation()
    const {courseSectionData,courseEntireData,totalNoOfLectures,completedLectures}=useSelector((state)=>state.viewCourse)

    useEffect(()=>{
        ;(()=>{
            if(!courseSectionData.length){
                return
            }
            const currentSectionIndex=courseSectionData?.findIndex((data)=>data._id===sectionId)
            const currentSubSectionIndex=courseSectionData[currentSectionIndex]?.subSection?.findIndex((data)=>data._id===subSectionId)

            const activeSubSectionId=courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex]?._id

            setActiveSection(courseSectionData?.[currentSectionIndex]?._id)
            setVideoBarActive(activeSubSectionId)
            console.log("video bar active is ",videoBarActive,activeSubSectionId);
        })()
    },[courseSectionData,setEntireCourseData,location.pathname])

    const handleSection=(subSecId,secId)=>{
        navigate(`/view-course/${courseEntireData?._id}/section/${secId}/sub-section/${subSecId}`)
        setVideoBarActive(subSecId)
    }

  return (
    <div>
      <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700  bg-richblack-800 py-10 text-white h-[100%] items-start'>
        <div className='flex flex-col gap-y-10 mb-5 w-full px-3'>
            <div className='flex justify-between items-center gap-x-10'>
                <button onClick={()=>navigate('/dashboard/enrolled-courses')}className='text-xl text-white'><IoArrowBackOutline/></button>
                <button className='text-black bg-yellow-50 py-2 px-3 rounded-md' onClick={()=>setReviewModal(true)}>Add Review</button>
            </div>

            <div className='flex gap-x-4 items-center'>
                <p className='font-semibold text-xl'>{courseEntireData?.courseName}</p>
                <p className='text-caribbeangreen-300'>{completedLectures?.length} / {totalNoOfLectures}</p>
            </div>
        </div>

        <div className='flex flex-col gap-y-2 items-start w-full'>
            {
                courseSectionData?.map((section,index)=>((
                    <div onClick={()=>setActiveSection(section?._id)} key={index} className='w-full'>
                        <div className='flex justify-between cursor-pointer items-center bg-richblack-500 px-5 py-2 w-full'>
                            <div className='text-white text-lg font-semibold'>{section?.sectionName}</div>
                            <TiArrowSortedDown className='text-lg'/>
                        </div>

                        <div>
                            {
                                activeSection===section?._id && (
                                    <div className='flex flex-col gap-y-2 mt-2'>
                                        {
                                            section.subSection.map((subSec,index)=>((
                                                <div className={`${subSec._id===videoBarActive ? ('bg-yellow-50 text-black') : ('bg-richblack-900 text-white')} flex  px-5 py-2 cursor-pointer gap-x-2 items-center`} onClick={()=>handleSection(subSec._id,section._id)} key={index}>
                                                    <input type='checkbox' checked={completedLectures.includes(subSec?._id)} onChange={()=>{}}/>
                                                    <p><span className=' text-md text-richblack-400'>{subSec?.title}</span></p>
                                                </div>
                                            )))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )))
            }
        </div>
      </div>
    </div>
  )
}
