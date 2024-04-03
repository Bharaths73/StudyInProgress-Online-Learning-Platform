import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse } from '../../../../../Slices/CourseSlice'
import { RxCross2 } from "react-icons/rx";
import { createSubSection } from '../../../../../Services/operations/CourseApi'
import {Upload} from '../Upload'

export const SubSectionModal = ({modalData,setModalData,add=false,view=false,edit=false}) => {

    console.log("subsection model hitting",modalData,edit);
    const {register,setValue,getValues,handleSubmit,formState:{errors}}=useForm()
    const dispatch=useDispatch()
    const [loading,setLoading]=useState(false)
    const{course}=useSelector((state)=>state.course)
    const{token}=useSelector((state)=>state.auth)

    useEffect(()=>{
        if(view || edit){
            setValue("lectureTitle",modalData.title)
            setValue("lectureDesc",modalData.description)
            setValue("lectureVideo",modalData.videoUrl)
        }
    },[])

    const isFormUpdate=()=>{
        const currentValue=getValues()
        if(currentValue.lectureTitle!==modalData.title||currentValue.lectureDesc!==modalData.description||currentValue.lectureVideo!==modalData.videoUrl)
        {
            return true
        }
        else{
            return false
        }
    }
const handleEditSubSection=async()=>{
    const currentValue=getValues()
    const formData=new FormData()

    formData.append("secId",modalData.sectionId)
    formData.append("subSecId",modalData.subSectionId)
    formData.append("courseId",course._id)

    if(currentValue.lectureTitle!==modalData.title)
    {
        formData.append("title",currentValue.lectureTitle)
    }
    if(currentValue.lectureDesc!==modalData.description){
        formData.append("desc",currentValue.lectureDesc)
    }
    if(currentValue.lectureVideo!==modalData.videoUrl){
        formData.append("vieo",currentValue.lectureVideo)
    }
    setLoading(true)

    // const result=await editSubSection(formData,token)
}
    const onSubmit=async(data)=>{
        if(view){
            return
        }
        if(edit){
            if(!isFormUpdate){
                toast.error("No changes made to the form")
                return;
            }
            else{
                handleEditSubSection()
            }
            return
        }
        console.log("data is ",data,modalData);
        const formData=new FormData()
        formData.append('secId',modalData)
        formData.append('title',data.lectureTitle)
        formData.append('video',data.lectureVideo)
        formData.append('desc',data.lectureDesc)
        formData.append("courseId",course._id)
        console.log("subsection data is ",formData.title);
        setLoading(true)

        const result=await createSubSection(formData,token)
        if(result){
            //todo
            dispatch(setCourse(result));
        }
        setModalData(null)
        setLoading(false)
    }

  return(
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className='w-11/12 max-w-[40%] rounded-lg border border-richblack-400 bg-richblack-800 px-6 py-4'>
            <div className='flex justify-between items-center'>
                <p className='font-semibold text-xl'>{view && 'Viewing'} {add && "Adding"} {edit && "Editing"} Lecture</p>
                <button onClick={!loading ? ()=>setModalData(null) : (<></>)}><RxCross2 className='text-xl bg-richblack-800'/></button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className=''>
                <Upload name='lectureVideo' label='lectureVideo' register={register} setValue={setValue} errors={errors} video={true} viewData={view ? modalData.videoUrl:null} editData={edit ? modalData.videoUrl : null}/>

                <div className='flex flex-col gap-y-1 mt-5'>
                    <label>Lecture Title</label>
                    <input type='text' id='lectureTitle' placeholder='Enter lecture title' {...register("lectureTitle",{required:true})} className='w-full text-black py-2 px-2 rounded-md'/>
                    {
                        errors.lectureTitle && (
                            <span>Lecture title is required</span>
                        )
                    }
                </div>

                <div className='flex flex-col gap-y-1 mt-5'>
                    <label>Lecture Description</label>
                    <textarea placeholder='Enter lecture Description' {...register("lectureDesc",{required:true})} className='w-full text-black py-2 px-2 rounded-md'/>
                    {
                        errors.lectureDesc && (
                            <span>Lecture description is required</span>
                        )
                    }
                </div>

                {
                    !view && (
                        <div className='mt-5 flex justify-end'>
                            <button className='bg-yellow-50 px-4 py-2 rounded-md'>{edit ? "Save Changes" : "Save"}</button>
                        </div>
                    )
                }
            </form>

        </div>
    </div>
  )
}
