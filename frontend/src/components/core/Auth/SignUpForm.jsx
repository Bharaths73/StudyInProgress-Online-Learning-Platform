import React, { useState } from 'react'
import { Template } from './Template'
import { Tab } from '../../common/Tab'
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux';
import { setSignupData } from '../../../Slices/AuthSlice';
import { sendOtp } from '../../../Services/operations/AuthApi';
import { useNavigate } from 'react-router-dom';

export const SignUpForm = () => {
  const {user}=useSelector((state)=>state.profile)
  const dispatch=useDispatch()
  const navigate=useNavigate()
    const [accountType,setAccountType]=useState("Student")
    const [signUpData,setSignUpData]=useState(
      {
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
      }
    )

    const {email,firstName,lastName, password,confirmPassword}=signUpData;
    const [isVisible,setIsVisible]=useState(false)

    const onChangeHandler=(e)=>{
      setSignUpData((prev)=>(
        {
          ...prev,
          [e.target.name]:e.target.value
        }
      ))
      console.log(signUpData);
    }

    const onSubmitHandler=(e)=>{
      e.preventDefault();
      if (signUpData.password !== signUpData.confirmPassword) {
        toast.error("Passwords Do Not Match")
        return
      }
      const signupData={
        ...signUpData,
        accountType
      }
     console.log("account type is ",signupData);
      dispatch(setSignupData(signupData))
      dispatch(sendOtp(email,navigate))

     setSignUpData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
      setAccountType("Student")
  }

    const tabData = [
        {
          id: 1,
          tabName: "Student",
          type: "Student",
        },
        {
          id: 2,
          tabName: "Instructor",
          type: "Instructor",
        },
      ]

  return (
    <div>
        {
          user !== null ? (
            <div>Please logout from current account</div>
          ) :(
            <div>
              <Tab accountType={accountType} setAccountType={setAccountType} tabData={tabData}/>
        <form className='mt-7 flex flex-col gap-4' onSubmit={(e)=>onSubmitHandler(e)}>
        <div className='flex gap-5'>
          <div className='flex flex-col gap-2 w-[50%]'>
            <label htmlFor='firstName' className='font-bold'>First Name <sup className="text-pink-200 text-sm">*</sup></label>
            <input type='text' name='firstName' value={signUpData.firstName} onChange={(e) => onChangeHandler(e)} className='border-b border-richblack-400 bg-richblack-700 rounded-md p-2 text-richblack-50 outline-none' placeholder='Enter first name' />
          </div>

          <div className='flex flex-col gap-2 w-[50%]'>
            <label htmlFor='lastName' className='font-bold'>Last Name <sup className="text-pink-200 text-sm">*</sup></label>
            <input type='text' name='lastName' value={signUpData.lastName} onChange={(e) => onChangeHandler(e)} className='border-b border-richblack-400 bg-richblack-700 rounded-md p-2 text-richblack-50 outline-none' placeholder='Enter last name' />
          </div>
        </div>

        <div className='flex flex-col gap-2 '>
        <label htmlFor='email' className='font-bold'>Email Address <sup className="text-pink-200 text-sm">*</sup></label>
                <input type='text' name='email' value={signUpData.email} onChange={(e)=>onChangeHandler(e)} className='border-b border-richblack-400 bg-richblack-700 rounded-md p-2 text-richblack-50 outline-none w-[100%]' placeholder='Enter email Address'/>
                </div>

        <div className='flex gap-5 w-[100%]'>
          <div className='flex flex-col gap-2 relative w-[50%]'>
            <label htmlFor='password' className='font-bold'>Password <sup className='text-pink-200 text-sm'>*</sup></label>
            <input type={isVisible ? "text" : "password"} name='password' value={signUpData.password} onChange={(e) => onChangeHandler(e)} className='border-b border-richblack-400 bg-richblack-700 rounded-md p-2 text-richblack-50 outline-none' placeholder='Enter Password '>
            </input>
            <span className='absolute left-[85%] top-[60%]' onClick={() => setIsVisible((prev) => !prev)}>
              {
                isVisible ? (<BsEyeSlash fontSize={18} fill="#AFB2BF" />) : (<BsEye fontSize={18} fill="#AFB2BF" />)
              }
            </span>
          </div>

          <div className='flex flex-col gap-2 relative w-[50%]'>
            <label htmlFor='confirmPassword' className='font-bold'>Confirm Password <sup className='text-pink-200 text-sm'>*</sup></label>
            <input type={isVisible ? "text" : "password"} name='confirmPassword' value={signUpData.confirmPassword} onChange={(e) => onChangeHandler(e)} className='border-b border-richblack-400 bg-richblack-700 rounded-md p-2 text-richblack-50 outline-none' placeholder='Confirm Password '>
            </input>
            <span className='absolute left-[85%] top-[60%]' onClick={() => setIsVisible((prev) => !prev)}>
              {
                isVisible ? (<BsEyeSlash fontSize={18} fill="#AFB2BF" />) : (<BsEye fontSize={18} fill="#AFB2BF" />)
              }
            </span>
          </div>
          </div>

          <button
                  type="submit"
                  className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
                  Create Account
          </button>
        </form>

            </div>
          )
        }
    </div>
  )
}
