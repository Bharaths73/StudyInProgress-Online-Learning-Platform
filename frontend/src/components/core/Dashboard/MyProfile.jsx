import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IconButton } from '../../common/IconButton'

export const MyProfile = () => {
    const {user}=useSelector((state)=>state.profile)
    console.log(user.additionalDetails.about);
    const navigate=useNavigate()

  return (
    <div className='text-white flex flex-col mx-auto gap-10'>
        <h1 className='font-semibold text-2xl'>My Profile</h1>

        <div className='flex bg-richblack-700 rounded-md justify-between px-8'>
            <div className='flex items-center gap-x-3  py-8'>
                <img src={`${user?.image}`} alt={`${user?.firstName}`} className='aspect-square w-[78px] rounded-full object-cover'/>
                <div className='flex flex-col gap-y-1'>
                    <p className='font-semibold text-xl'>{user?.firstName+" "+user?.lastName}</p>
                    <p className='text-sm text-richblack-300'>{user?.email}</p>
                </div>
            </div>

           <div className='flex items-center'>
           <button onClick={()=>{navigate("/dashboard/settings")}} className='text-black bg-yellow-200 py-2 px-6 rounded-md'>Edit</button>
           </div>
        </div>


        <div className='flex bg-richblack-700 rounded-md justify-between px-8 py-5 flex-col gap-5'>
            <div className='flex justify-between items-center'>
                <p className='font-semibold text-lg'>About</p>
                <button onClick={()=>{navigate("/dashboard/settings")}} className='text-black bg-yellow-200 py-2 px-6 rounded-md'>Edit</button>
            </div>
            <p className='text-richblack-300'>{user?.additionalDetails?.about ?? "Write About You"}</p>
        </div>

        <div className='flex bg-richblack-700 rounded-md justify-between px-8 py-6 flex-col gap-6'>
            <div className='flex justify-between items-center'>
                <p className='font-semibold text-lg'>Personal Details</p>
                <button onClick={()=>{navigate("/dashboard/settings")}} className='text-black bg-yellow-200 py-2 px-6 rounded-md'>Edit</button>
            </div>

            <div className='flex gap-56 lg:flex-row'>
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-richblack-300'>First Name</p>
                        <p>{user?.firstName}</p>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p className='text-richblack-300'>Gmail</p>
                        <p>{user?.email}</p>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p className='text-richblack-300'>Gender</p>
                        <p>{user?.additionalDetails?.gender? `${user?.additionalDetails?.gender}`:"Add Gender"}</p>
                    </div>
                </div>

                  <div className='flex flex-col gap-5'>
                      <div className='flex flex-col gap-1'>
                          <p className='text-richblack-300'>Last Name</p>
                          <p>{user?.lastName}</p>
                      </div>

                      <div className='flex flex-col gap-1'>
                          <p className='text-richblack-300'>Contact Number</p>
                          <p>{user?.additionalDetails?.contactNumber? `${user?.additionalDetails?.contactNumber}`:"Add Contact Number"}</p>
                      </div>

                      <div className='flex flex-col gap-1'>
                          <p className='text-richblack-300'>Date of Birth</p>
                          <p>{user?.additionalDetails?.dateOfBirth? `${user?.additionalDetails?.dateOfBirth}`:"Add Your Date of Birth"}</p>
                      </div>
                  </div>
            </div>
        </div>
    </div>
  )
}
