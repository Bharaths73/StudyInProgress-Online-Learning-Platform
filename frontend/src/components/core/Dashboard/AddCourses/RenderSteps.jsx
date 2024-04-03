import React from 'react'
import { useSelector } from 'react-redux'
import { CourseInformationForm } from './CourseInformation/CourseInformationForm'
import { CourseBuilderForm } from './CourseInformation/CourseBuilderForm'
import { CoursePublish } from './CourseInformation/CoursePublish'
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdCheck } from "react-icons/md";

export const RenderSteps = () => {
const {step}=useSelector((state)=>state.course)
  const steps=[
    {
      id:1,
      title:"Course Information"
    },
    {
      id:2,
      title:"Course Builder"
    },
    {
      id:3,
      title:"Course Publish"
    }
  ]

  return (
    <div className='flex flex-col '>
       <div className='flex ml-4 mr-7'>
           {steps.map((item,index)=>(
            (
              <div key={index} className='flex items-center'>
               <div className=''>
               <div className={`border rounded-full  px-3 py-1 ${step===item.id||step>item.id ? "bg-yellow-50 border-yellow-50 text-black" : "border-richblack-100 bg-richblack-800 text-richblack-300"}`}>
                {
                  step>item.id ? (<MdCheck className='mt-2 mb-2 text-black bg-yellow-50 text-xl'/>) : (<p>{item.id}</p>)
                }
              </div>
               </div>

               {
                item.id!==steps.length && 
                <div className={` w-52 h-1 ${step>item.id ? "bg-yellow-100" : "bg-richblack-400"}`}>
                </div>
               }
              </div>
            )
           ))}
       </div>
       <div className='flex justify-between w-full mt-2'>
        {steps.map((item,index)=>((
          <div  key={index} className=''>
            <div>
              <p className='text-sm'>{item.title}</p>
            </div>
          </div>
        )))}
       </div>

       {step===1 && <CourseInformationForm/>}
       {step===2 && <CourseBuilderForm/>}
       {step==3 && <CoursePublish/>}
    </div>
  )
}
