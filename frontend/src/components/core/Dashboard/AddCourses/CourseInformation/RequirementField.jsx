import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const RequirementField = ({name,label,register,errors,setValue,getValue,editCourse}) => {
    const [requirement,setRequirement]=useState("")
    const [requirementList,setRequirementList]=useState([])
    const {course}=useSelector((state)=>state.course)
    const handleAddRequirements=()=>{
        if(requirement){
            setRequirementList([...requirementList,requirement])
            setRequirement('')
        }
    }

    useEffect(()=>{
        register(name,{
            required:true,
            validate:(value)=>value.length>0
        })
        if(editCourse){
            const currentValue=getValue()
            setRequirementList(course.instructions)
        }
    },[])

    useEffect(()=>{
       setValue(name,requirementList)
    },[requirementList])

    const removeRequirements=(index)=>{
       const updateRequirementList=[...requirementList]
       updateRequirementList.splice(index,1)
       setRequirementList(updateRequirementList)
    }
  return (
    <div>
        <label>{label}<sup>*</sup></label>
        <input type='text' id={name} value={requirement} placeholder='Enter Course Requirements' onChange={(e)=>setRequirement(e.target.value)} className='w-full py-2 text-black px-2 rounded-md'/>
        <button type='button' onClick={handleAddRequirements} className='font-semibold text-yellow-50 text mt-3'>Add</button>

        <div className='mt-2 '>
            {
                requirementList.length>0 &&
                 <ul className='rounded-md max-w-max px-5 py-2 bg-richblack-600 flex flex-col items-start text-richblack-100'>
                     {
                        requirementList.map((require,index)=>(
                            <li key={index} className=' py-1 flex flex-row gap-2 items-center' ><span>{require}</span> <button type='button' onClick={(index)=>removeRequirements(index)} className='text-xs bg-pink-400 px-2 py-1 text-richblack-100 rounded-md'>clear</button></li>
                        ))
                     }
                 </ul>
            }
        </div>
        {
            errors[name] && (
                <span>{label} is required</span>
            )
        }
    </div>
  )
}
