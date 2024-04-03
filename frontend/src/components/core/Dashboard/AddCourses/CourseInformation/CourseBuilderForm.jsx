import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { NestedView } from './NestedView'
import { setCourse, setEditCourse, setStep } from '../../../../../Slices/CourseSlice'
import toast from 'react-hot-toast'
import { AiFillPlusCircle } from "react-icons/ai";
import { createSection } from '../../../../../Services/operations/CourseApi'
import { updateSection } from '../../../../../Services/operations/CourseApi'

export const CourseBuilderForm = () => {
  const {register,handleSubmit,setValue,getValues,formState:{errors}}=useForm()
  const[editSection,setEditSection]=useState(null)
  const{course,editCourse}=useSelector((state)=>state.course)
  const{token}=useSelector((state)=>state.auth)
  const[loading,setLoading]=useState(false)
  const dispatch=useDispatch()

  const submitHandler=async(data)=>{
    setLoading(true)
    let result;

    if(editSection){
      result=await updateSection({secName:data.sectionName,sectionId:editSection,courseId:course._id},token)
    }
    else{
      result=await createSection({secName:data.sectionName,courseId:course._id},token)
    }

    if(result){
      dispatch(setCourse(result))
      setEditSection(null)
      setValue('sectionName','')
    }
    
    setLoading(false)
  }

  const cancelEdit=()=>{
    setEditSection(null)
    setValue("sectionName",'')
  }

  const goToNext=()=>{
    if(course.courseContent.length===0){
      toast.error("Please add atleast one section")
      return
    }
    if(course.courseContent.some((section)=>section.subSection.length===0)){
      toast.error("Please add atlest one lecture")
      return
    }
    dispatch(setStep(3))
  }

  const goBack=()=>{
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  const handleEditSection=(sectionId,sectionName)=>{
    if(editSection===sectionId){
      cancelEdit();
      return
    }
    setEditSection(sectionId)
    setValue('sectionName',sectionName)
  }

  return (
    <div className='text-white mt-10 '>
      <p className='font-semibold text-2xl mb-5'>Course Builder</p>
      <form onSubmit={handleSubmit(submitHandler)}>
        <label className='font-semibold mb-1'>Section Name<sup>*</sup></label>
        <input id='sectionName' placeholder='Add Section Name' {...register('sectionName',{required:true})} className='w-full py-2 px-2 rounded-md text-black'/>
        {
          errors.sectionName && (
            <span>Section Name is required</span>
          )
        }
        <div className='flex gap-4 items-center mt-3'>
        <button type='submit' className='text-yellow-50 border border-yellow-50 px-4 py-2  rounded-md'>
          {
            editSection ? 'Edit Section' : 'Create Section'
          }
        </button>
        {
          editSection && <button type='button' onClick={cancelEdit} className='bg-richblack-600 px-3 py-2 rounded-md'>Cancel Edit</button>
        }
        </div>
      </form>

      {
        course?.courseContent?.length>0 && (
         <NestedView handleEditSection={handleEditSection}/>
        )
      }

      <div className='mt-10 flex items-center gap-4 justify-end'>
        <button onClick={()=>goBack()}  className='bg-richblack-600 px-4 py-2 rounded-md'>Back</button>
        <button onClick={()=>goToNext()} className='text-black  px-4 py-2  rounded-md bg-yellow-50'>Next</button>
      </div>
    </div>
  )
}
