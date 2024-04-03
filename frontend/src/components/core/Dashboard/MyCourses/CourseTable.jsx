import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Table, Tbody, Td, Thead, Tr,Th} from 'react-super-responsive-table'
import { COURSE_STATUS } from '../../../../utils/constants'
import { ConfirmatinModal } from '../../../common/ConfirmatinModal'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { deleteCourse, fetchInstructorCourses } from '../../../../Services/operations/CourseApi'
import {useNavigate} from 'react-router-dom'
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";


export const CourseTable = ({courses,setCourses}) => {
    const dispatch=useDispatch()
    const {token}=useSelector((state)=>state.auth)
    const [confirmationModal,setConfirmationModal]=useState(null)
    const[loading,setLoading]=useState(false)
    const navigate=useNavigate()
    

    const courseDeleteHandler=async(courseId)=>{
        setLoading(true)
        console.log("course is inside the component is ",courseId);
       await deleteCourse(courseId,token)
       
       const result=await fetchInstructorCourses(token)
        if(result){
            setCourses(result)
        }
        setConfirmationModal(null)
        setLoading(false)
        
    }
  return (
    <div className='text-white mt-10'>
       <Table className="rounded-xl border border-richblack-800 ">
        <Thead>
            <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                    Courses
                </Th>
                <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                    Duration
                </Th>
                <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                    Price
                </Th>
                <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                    Action
                </Th>
            </Tr>
        </Thead>

        <Tbody>
            {
                courses.length===0 ? (
                    <Tr >
                        <Td className="py-10 text-center text-2xl font-medium text-richblack-100">No courses Found</Td>
                    </Tr>
                ): (
                    courses.map((course,index)=>((
                        <Tr key={course._id} className="flex gap-x-10 border-b border-richblack-800 px-6 py-8">
                            <Td className='flex flex-1 gap-x-4'>
                               <img src={course?.thumbnail} className='h-[150px] w-[220px] rounded-lg object-cover'/>
                               <div className="flex flex-col justify-between">
                                <p className="text-lg font-semibold text-richblack-5">{course.courseName}</p>
                                <p className="text-xs text-richblack-300">{course.courseDescription}</p>
                                <p className="text-[12px] text-white">Created:</p>
                                {
                                    course.status === COURSE_STATUS.DRAFT ? (
                                        <p  className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">Drafted</p>
                                    ):(
                                        <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">Published</p>
                                    )
                                }
                               </div>
                            </Td>

                            <Td className="text-sm font-medium text-richblack-100">
                                2hr 30min
                            </Td>
                            <Td className="text-sm font-medium text-richblack-100">{course.price}rs</Td>
                            <Td className="text-xl font-medium text-richblack-100 ">
                            <button disabled={loading}  className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300" onClick={()=>{navigate(`/dashboard/edit-course/${course._id}`)}}>{<MdOutlineModeEdit/>}</button>
                            <button onClick={()=>setConfirmationModal({
                            text1:"Are You Sure?",
                            text2:"Course will be deleted permenently",
                            btn1Text:'Delete',
                            btn2Text:"Cancel",
                            btn1Handler:()=>courseDeleteHandler(course._id),
                            btn2Handler:()=>setConfirmationModal(null)
                        })} className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]">{<MdOutlineDeleteOutline/>}</button>
                            </Td>
                        </Tr>
                    )))
                )
            }
        </Tbody>
       </Table>

       {confirmationModal && <ConfirmatinModal modalData={confirmationModal}/>}
    </div>
  )
}
