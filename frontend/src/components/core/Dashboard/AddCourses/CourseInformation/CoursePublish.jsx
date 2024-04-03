import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { resetCourseState, setStep } from '../../../../../Slices/CourseSlice'
import { COURSE_STATUS } from '../../../../../utils/constants'
import { useNavigate } from 'react-router-dom'
import { editCourseDetails } from '../../../../../Services/operations/CourseApi'


export const CoursePublish = () => {

  const{register,setValue,getValues,formState:{errors},handleSubmit}=useForm()
  const dispatch=useDispatch()
  const {token}=useSelector((state)=>state.auth)
  const {course}=useSelector((state)=>state.course)
  const navigate=useNavigate()

  const goToCourses=()=>{
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }

  const handleCoursePublish=async()=>{
    if((course?.status===COURSE_STATUS.PUBLISHED && getValues('public')===true) || (course?.status===COURSE_STATUS.DRAFT && getValues('public')===false)){
      //NO UPDATION IS REQUIRED NO API CALL

      goToCourses()
      return;
    }

    //form has been updated
    const formData=new FormData()
    formData.append('courseId',course._id)
    const courseStatus=getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
    formData.append('status',courseStatus)

    const result=await editCourseDetails(formData,token)
    
    if(result){
      goToCourses()
    }
  }
  const onSubmit=()=>{
    handleCoursePublish()
  }

  const goBackHandler=()=>{
    dispatch(setStep(2))
  }

  useEffect(()=>{
    if(course?.status===COURSE_STATUS.PUBLISHED){
      setValue('public',true)
    }
  },[])

  return (
    <div className='rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700 mt-10 flex flex-col'>
      <p className='font-semibold text-xl mb-3'>Publish Course</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-row-reverse gap-2 items-center justify-end'>
          <label>Make this course as public</label>
          <input type='checkbox' id='public' {...register('public')} className='rounded h-4 w-4'/>
        </div>

        <div className='flex justify-end items-center gap-4 mt-10'>
          <button onClick={()=>goBackHandler()} className=' bg-richblack-400 px-4 py-2 rounded-md text-black' type='button'>Back</button>
          <button  className='bg-yellow-50 px-4 py-2 rounded-md text-black' type='submit'>Save Changes</button>
        </div>
      </form>
    </div>
  )
}
