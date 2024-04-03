import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../Services/operations/AuthApi'
import { useDispatch, useSelector } from 'react-redux'
import  SidebarLinks  from './SidebarLinks'
import { VscSettingsGear } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from "react-icons/vsc";
import { ConfirmatinModal } from '../../common/ConfirmatinModal'

export const Sidebar = () => {
    const {user,loading:profileLoading}=useSelector((state)=>state.profile)
    const {loading:authLoading}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [confirmationModal,setConfirmationModal]=useState(null)

    if(profileLoading || authLoading){
        return(
            <div className='text-black'>Loading....</div>
        )
    }

    function logging(){
        console.log("changing modal");
    }
  return (
    <div>
        <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700  bg-richblack-800 py-10 text-white h-[100%] items-start'>
            <div className='flex flex-col gap-y-2 items-start w-full'>
                {
                    sidebarLinks.map((link,index)=>{
                        if(link.type && user?.accountType!==link.type) return null
                        {console.log(link.name);}
                        return(
                            <SidebarLinks link={link} iconName={link.icon} key={link.id}/>
                        )
                    })
                }
            </div>

                <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'>
                </div>
                     
                     <div className='flex flex-col text-white items-start gap-y-2 w-full'>
                        <SidebarLinks link={{name:"Settings",path:"dashboard/settings"}} iconName="VscSettingsGear"/>
                        <button onClick={()=>setConfirmationModal({
                            // logHandler:()=>logging(),
                            text1:"Are You Sure ?",
                            text2:"you will be logged out of your account",
                            btn1Text:'Logout',
                            btn2Text:"Cancel",
                            btn1Handler:()=>dispatch(logout(navigate)),
                            btn2Handler:()=>setConfirmationModal(null)
                        })} className='text-sm font-medium text-richblack-300 w-full px-8 flex items-center'>

                            <div className='flex items-center gap-x-2 text-white'>
                                <VscSignOut className='text-lg'/>
                                <p className='text-lg'>Logout</p>
                            </div>
                        </button>
                     </div>
                   </div>

                   {confirmationModal && <ConfirmatinModal modalData={confirmationModal}/>}
    </div>
  )
}
