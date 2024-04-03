import React, { useEffect, useRef, useState } from 'react'
import { MdNoFood } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { updateCompletedLectures } from '../../../Slices/viewCourseSlice'
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import { FaPlay } from "react-icons/fa";

export const VideoDetails = () => {
  const {courseId,sectionId,subSectionId}=useParams()
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const location=useLocation()
  const playerRef=useRef()
  const {token}=useSelector((state)=>state.auth)
  const{courseSectionData,courseEntireData,completedLectures}=useSelector((state)=>state.viewCourse)
  const [videoData,setVideoData]=useState([])
  const [videoEnded,setVideoEnded]=useState(false)
  const [loading,setLoading]=useState(false)
  const [previewSource, setPreviewSource] = useState("")

  const ifFirstVideo=()=>{
    const currentSectionIndex=courseSectionData?.findIndex((data)=>data._id===sectionId)
    const currentSubSectionIndex=courseSectionData[currentSectionIndex]?.subSection.findIndex(
      (data)=>data._id===subSectionId
    )
    if(currentSectionIndex===0 && currentSubSectionIndex===0){
      return true
    }
    else{
      return false
    }
  }

  const isLastVideo=()=>{
    const currentSectionIndex=courseSectionData?.findIndex((data)=>data._id===sectionId)
    const currentSubSectionIndex=courseSectionData[currentSectionIndex]?.subSection.findIndex(
      (data)=>data._id===subSectionId
    )
    const noOfSubSection=courseSectionData[currentSectionIndex]?.subSection?.length;

    if(currentSectionIndex===courseSectionData.length-1 && currentSubSectionIndex===noOfSubSection-1)
    {
      return true
    }
    else{
      return false
    }
  }

  const goToNextVideo=()=>{
    const currentSectionIndex=courseSectionData?.findIndex((data)=>data._id===sectionId)
    const currentSubSectionIndex=courseSectionData[currentSectionIndex]?.subSection.findIndex(
      (data)=>data._id===subSectionId
    )
    const noOfSubSection=courseSectionData[currentSectionIndex]?.subSection?.length;

    if(currentSubSectionIndex!==noOfSubSection-1){
      const nextSubSectionId=courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex+1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    }
    else{
      const nextSectionId=courseSectionData[currentSectionIndex+1]._id
      const nextSubSectionId=courseSectionData[currentSectionIndex+1].subSection[0]._id
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }

  const goToPrevVideo=()=>{
    const currentSectionIndex=courseSectionData?.findIndex((data)=>data._id===sectionId)
    const currentSubSectionIndex=courseSectionData[currentSectionIndex]?.subSection.findIndex(
      (data)=>data._id===subSectionId
    )
    if(currentSubSectionIndex!==0){
      //same sec previous video
      const prevSubSectionId=courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex-1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    }
    else{
      const prevSectionId=courseSectionData[currentSectionIndex-1]._id
      const prevSubSectionIndex=courseSectionData[currentSectionIndex-1].subSection.length
      const prevSubSecId=courseSectionData[currentSectionIndex-1].subSection[prevSubSectionIndex-1]._id
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSecId}`)
    }
  }

  const handleLectureComplete=async()=>{
    console.log("handling lecture");
    setLoading(true)
    // const result=await markLectureAsComplete({courseId:courseId,subSectionId:subSectionId},token)
    // dispatch(updateCompletedLectures(subSectionId))
    setLoading(false)
  }

  useEffect(()=>{
    const setVideoSpecificDetails=async()=>{
      if(!courseSectionData.length){
        return
      }
      if(!courseId && !sectionId && !subSectionId){
        navigate('/dashboard/enrolled-courses')
      }
      else{
        const filteredData=courseSectionData?.filter((course)=>course._id===sectionId)
        const filteredVideoData=filteredData?.[0]?.subSection?.filter((data)=>data._id===subSectionId)
        setVideoData(filteredVideoData?.[0])
        console.log("video data is ",videoData,filteredData,filteredVideoData);
        setPreviewSource(courseEntireData?.thumbnail)
        setVideoEnded(false)
      }
    }
    setVideoSpecificDetails()
  },[courseSectionData,courseEntireData,location.pathname])

  return (
    <div className='text-white'>
      {
        !videoData ? (
          <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
        ):(
          <div>
            <Player ref={playerRef} aspectRatio='16:9' playsInline onEnded={()=>setVideoEnded(true)} src={videoData?.videoUrl} className='flex justify-center relative'>
            <FaPlay className='absolute top-[50%] z-50 left-[50%] text-3xl cursor-pointer'/>
            </Player>
            {
              videoEnded && (
                <div className='flex gap-x-5 mt-10'>
                  {
                    !completedLectures.includes(subSectionId) && (
                      <button disabled={loading} onClick={handleLectureComplete} className='text-black bg-yellow-50 px-4 py-2 rounded-md text-lg'>Mark As Completed</button>
                    )
                  }
                  
                  <button disabled={loading} onClick={()=>{
                    if(playerRef?.current){
                      playerRef.current?.seek(0);
                      setVideoEnded(false)
                    }
                  }} className='text-black bg-yellow-50 px-4 py-2 rounded-md text-lg'>Rewatch</button>

                 <div className='flex gap-x-5'>
                 {
                    !ifFirstVideo() && (
                      <button disabled={loading} onClick={goToPrevVideo} className='text-black bg-yellow-50 px-4 py-2 rounded-md text-lg'>Previous</button>
                    ) 
                  }
                  {
                    !isLastVideo() && (
                      <button disabled={loading} onClick={goToNextVideo} className='text-black bg-yellow-50 px-4 py-2 rounded-md text-lg'>Next</button>
                    )
                  }
                 </div>
                </div>
              )
            }
          

          <div className='flex flex-col mt-10 gap-y-3'>
            <h1 className='text-white text-3xl font-semibold'>{videoData?.title}</h1>
            <p className='text-xl text-richblack-400'>{videoData?.description}</p>
          </div>
          </div>
        )
      }
    </div>
  )
}
