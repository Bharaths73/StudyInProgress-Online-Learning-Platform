import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import{ConfirmatinModal} from '../../../../common/ConfirmatinModal'
import { BiDownArrow, BiSolidDownArrow } from "react-icons/bi";
import { SubSectionModal } from './SubSectionModal';
import { setCourse } from '../../../../../Slices/CourseSlice';
import { deleteSection } from '../../../../../Services/operations/CourseApi';
import { deleteSubSection } from '../../../../../Services/operations/CourseApi';

export const NestedView = ({handleEditSection}) => {
    const {course}=useSelector((state)=>state.course)
    console.log("course content is ",course);

    const {token}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()

    const[addSubSection,setAddSubSection]=useState(null)
    console.log("addsub section ",addSubSection);

    const[editSubSection,setEditSubSection]=useState(null)
    const[viewSubSection,setViewSubSection]=useState(null)

    const[confirmationModal,setConfirmationModal]=useState(null)

    const handleDeleteSection=async (secId)=>{
        console.log("inside delete section ",secId);
        const result=await deleteSection({secId,courseId:course._id},token)

        if(result){
            dispatch(setCourse(result))
        }
        setConfirmationModal(null)
    }

    const handleDeleteSubSection=async(subSecId,secId)=>{
        const result=await deleteSubSection({subSecId,secId,courseId:course._id},token);

        if(result){
            dispatch(setCourse(result))
        }
        setConfirmationModal(null)
    }

    // const handleEditSubSection=()=>{

    // }

  return (
    <div>
        <div className='mt-6 flex flex-col gap-5 text-md bg-richblack-700 rounded-md p-10'>
            {
                course?.courseContent.map((section,index)=>((
                    <details key={index} open >
                        <summary className='flex items-center justify-between gap-x-3 border-b-2'>
                            <div className='flex items-center gap-3'>
                                <RxDropdownMenu/>
                                <p>{section.sectionName}</p>
                            </div>

                            <div className='flex gap-3 items-center'>
                                <button onClick={()=>handleEditSection(section._id,section.sectionName)}>{<MdOutlineModeEdit/>}
                                </button>

                            <button onClick={()=>setConfirmationModal({
                                text1: "Delete this Section?",
                                text2: "All lectures will be deleted",
                                btn1Text: "Delete",
                                btn2Text: "Cancel",
                                btn1Handler: () =>handleDeleteSection(section._id),
                                btn2Handler: () =>setConfirmationModal(null),
                            })}>{<MdOutlineDeleteOutline/>}</button>

                            <span>|</span>
                            <BiSolidDownArrow/>
                            </div>

                        </summary>

                        <div className='flex flex-col mt-3 w-[95%] text-md ml-6 gap-y-3'>
                            {
                                section.subSection.map((sub,index)=>((
                                    <div key={index}  className='flex items-center justify-between border-b-2 text-white flex-row '>
                                        <div className='flex items-center gap-x-3' onClick={()=>setViewSubSection(sub)}>
                                        <RxDropdownMenu/>
                                         <p>{sub.title}</p>
                                        </div>

                                        <div className='flex items-center gap-x-3'>
                                        <button onClick={()=>setEditSubSection({...sub,sectionId:section._id})}>{<MdOutlineModeEdit/>}</button>

                                <button onClick={()=>setConfirmationModal({
                                text1: "Delete this Sub-Section?",
                                text2: "This lecture will be deleted",
                                btn1Text: "Delete",
                                btn2Text: "Cancel",
                                btn1Handler: () =>
                                  handleDeleteSubSection(sub._id,section._id),
                                btn2Handler: () => setConfirmationModal(null),
                            })}>{<MdOutlineDeleteOutline/>}</button>

                                        </div>


                                    </div>
                                )))
                            }

                            <button type='button' onClick={()=>setAddSubSection(section._id)}className='mt-2 flex items-centergap-x-2 text-yellow-50'>Add Lecture</button>
                        </div>
                    </details>
                )))
            }

        </div>
        {
            addSubSection ? (<SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true}/>) :
             viewSubSection ? (<SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true}/>) : 
             editSubSection ? (<SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true}/>):
             (<></>)    
        }

         {confirmationModal ? (<ConfirmatinModal modalData={confirmationModal}/>):
         (<div></div>)}
    </div>
  )
}
