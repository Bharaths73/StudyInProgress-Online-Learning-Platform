import React from 'react'
import { BiDownArrow, BiDownArrowAlt } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../../Services/operations/AuthApi'
import { IoIosArrowDown } from "react-icons/io";

export const ProfileDropDown = () => {
  const {user}=useSelector((state)=>state.profile)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  function logoutHandler(){
    dispatch(logout(navigate))
}
  return (
    <div className='flex items-center group relative'>
      <div className='flex items-center justify-center gap-x-1'>
      <img src={user.image} alt='Profile' className='text-white border-richblack-900 rounded-full cursor-pointer group' width={30} height={30}/>
      <IoIosArrowDown className='text-white'/>
      </div>
      
      
      <div className='invisible flex flex-col opacity-0 absolute group-hover:visible group-hover:opacity-100 top-[120%] left-[-100%] bg-richblack-700 px-[12px] py-[8px] text-richblack-100 rounded-md border border-richblack-700 gap-2 z-20'>
      <div className='absolute left-[35%] top-0 h-5 w-6 rotate-45 rounded  translate-y-[-50%] translate-x-[70%] bg-richblack-700'></div>
        <Link to={'/dashboard/my-profile'} className='py-3 px-10  rounded-md border border-richblack-600 hover:bg-richblack-500 mt-2'>Dashboard</Link>

        <button className='py-3 px-10 rounded-md border border-richblack-600 hover:bg-richblack-500' onClick={logoutHandler}>Log out</button>
      </div>
    </div>
  )
}
