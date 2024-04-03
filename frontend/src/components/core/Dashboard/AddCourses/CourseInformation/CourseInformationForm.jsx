import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { apiConnector } from '../../../../../Services/ApiConnector'
import { addCourseDetails, fetchCourseCategories,editCourseDetails } from '../../../../../Services/operations/CourseApi'
import { FaIndianRupeeSign } from "react-icons/fa6";
import { RequirementField } from './RequirementField'
import { setStep ,setCourse} from '../../../../../Slices/CourseSlice'
import {toast} from 'react-hot-toast'
import { Upload } from '../Upload'
import { COURSE_STATUS } from '../../../../../utils/constants'


export const CourseInformationForm = () => {
    const {register,handleSubmit,setValue,getValues,formState:{errors}}=useForm()
    const {token}=useSelector((state)=>state.auth)

    const dispatch=useDispatch()
    const {course,editCourse}=useSelector((state)=>state.course)
    const[loading,setLoading]=useState(false)
    const[courseCategories,setCourseCategories]=useState([])


    const getCategories=async()=>{
        try {
            setLoading(true)
            const result=await fetchCourseCategories()
            if(result.length>0){
                setCourseCategories(result)
            }
            console.log("categories are ",result);
        } catch (error) {
            console.log("failed to fetch categories");
        }
        setLoading(false)

        if(editCourse){
          console.log("course state value is ",course);
            setValue("courseTitle",course.courseName)
            setValue("courseShortDesc",course.courseDescription)
            setValue("coursePrice",course.price)
            setValue("courseTags",course.courseTag)
            setValue("courseBenefits",course.whatYouWillLearn)
            setValue("courseCategory",course.category)
            setValue("courseRequirements",course.instructions)
            setValue("courseImage",course.thumbnail)
            console.log("thumbnail is ",course.thumbnail);
        }
    }

    useEffect(()=>{
        getCategories()
    },[])


    const isFormUpdated=()=>{
        const currentValue=getValues();
        if(currentValue.courseTitle!==course.courseName||currentValue.courseShortDesc !== course.courseDescription||currentValue.coursePrice !== course.price||
          // currentValue.courseTags.toString() !== course.tag.toString()||
          currentValue.courseBenefits !== course.whatYouWillLearn||currentValue.courseCategory._id !== course.category._id||currentValue.courseRequirements.toString() !==
        course.instructions.toString()||currentValue.courseImage !== course.thumbnail){
            return true
        }
        else{
            return false
        }
    }

    const onSubmit = async (data) => {
        // console.log(data)
    
        if (editCourse) {
          // const currentValues = getValues()
          // console.log("changes after editing form values:", currentValues)
          // console.log("now course:", course)
          // console.log("Has Form Changed:", isFormUpdated())
          console.log("hitting edit");
          if (isFormUpdated()) {
            const currentValues = getValues()
            const formData = new FormData()
            // console.log(data)
            formData.append("courseId", course._id)
            if (currentValues.courseTitle !== course.courseName) {
              formData.append("courseName", data.courseTitle)
            }
            if (currentValues.courseShortDesc !== course.courseDescription) {
              formData.append("courseDescription", data.courseShortDesc)
            }
            if (currentValues.coursePrice !== course.price) {
              formData.append("price", data.coursePrice)
            }
            // if (currentValues.courseTags.toString() !== course.tag.toString()) {
            //   formData.append("tag", JSON.stringify(data.courseTags))
            // }
            if (currentValues.courseBenefits !== course.whatYouWillLearn) {
              formData.append("whatYouWillLearn", data.courseBenefits)
            }
            if (currentValues?.courseCategory?._id !== course?.category?._id) {
              formData.append("category", data.courseCategory)
              // formData.append('oldCategory',course.category)
            }
            if (
              currentValues.courseRequirements.toString() !==
              course.instructions.toString()
            ) {
              formData.append(
                "instructions",
                JSON.stringify(data.courseRequirements)
              )
            }
            if (currentValues.courseImage !== course.thumbnail) {
              formData.append("thumbnailImage", data.courseImage)
            }
            // console.log("Edit Form data: ", formData)
            setLoading(true)
            const result = await editCourseDetails(formData, token)
            setLoading(false)
            if (result) {
              dispatch(setStep(2))
              dispatch(setCourse(result))
            }
          } else {
            toast.error("No changes made to the form")
          }
          return
        }
    
        // create a new course when edit off
        const formData = new FormData()
       
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("whatYouWillLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)
        formData.append("status", COURSE_STATUS.DRAFT)
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        formData.append("thumbnailImage", data.courseImage)
        console.log("course data of form ",formData.courseName);
        setLoading(true)
        const result = await addCourseDetails(formData, token)
        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
        setLoading(false)
      }

  return (
    <div className='mt-10'>
        <form onSubmit={handleSubmit(onSubmit)} className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'>
            <div>
                <label>Course Title<sup>*</sup></label>
                <input type='text' id='courseTitle' placeholder='Enter Course Title' {...register("courseTitle",{required:true})} className='w-full py-2 text-black px-2 rounded-md'/>
                {
                    errors.courseTitle && (
                        <span>Course title is required</span>
                    )
                }
            </div>

            <div>
            <label>Course Short Description<sup>*</sup></label>
                <textarea id='courseShortDesc' placeholder='Enter Course Description' {...register("courseShortDesc",{required:true})} className='w-full py-1 text-black px-2 rounded-md'/>
                {
                    errors.courseShortDesc && (
                        <span>Course description is required</span>
                    )
                }
            </div>

            <div className='relative'>
            <label>Course Price<sup>*</sup></label>
                <input type='text' id='coursePrice' placeholder='Enter Course Price' {...register("coursePrice",{required:true,valueAsNumber:true})} className='w-full py-2 px-7 text-black rounded-md'/>
                <FaIndianRupeeSign className='absolute left-1 text-lg top-[55%] text-richblack-900 '/>
                {
                    errors.coursePrice && (
                        <span>Course Price is required</span>
                    )
                }
            </div>

            <div>
                <label>Course Category<sup>*</sup></label>
                <select id='courseCategory' defaultValue="" {...register("courseCategory",{required:true})} className='w-full py-2 px-2 text-black rounded-md'>
                    <option value='' disabled>Choose a Category</option>
                    {
                        !loading && courseCategories.map((category,index)=>((
                            <option key={index} value={category?._id}>{category?.name}</option>
                        )))
                    }
                </select>
                {
                    errors.courseCategory && (
                        <span>
                            Course Category is Required
                        </span>
                    )
                }
            </div>

            {/* <CourseTag/> */}

            <div>
              {
                <Upload name='courseImage'
                label='courseImage'
                register={register}
                setValue={setValue}
                errors={errors}
                editData={course?.thumbnail}/>
              }
            </div>

            <div>
                <label>Course Benefits<sup>*</sup></label>
                <textarea id='courseBenefits' placeholder='Enter Course Benefits' {...register("courseBenefits",{required:true})} className='min-h-[130px] w-full text-black px-2 py-1 rounded-md'/>
                {
                    errors.courseBenefits && (
                        <span>Course Benefits is required</span>
                    )
                }
            </div>

            <RequirementField name='courseRequirements' label='Requirements' register={register} errors={errors} setValue={setValue} getValue={getValues} editCourse={editCourse}/>

            <div className='flex justify-end gap-x-3'>
                {
                    editCourse && (
                        <button onClick={()=>dispatch(setStep(2))} className='bg-richblack-600 px-4 py-2 rounded-md'>Continue without saving</button>
                    )
                }

                <button className='text-black bg-yellow-100 rounded-md px-5 py-2'>{!editCourse ? "Next":"Save Changes"}</button>
            </div>
        </form>
    </div>
  )
}
