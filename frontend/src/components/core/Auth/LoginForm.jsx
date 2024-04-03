import React, { useEffect, useState } from 'react'
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import CTAButton from '../homePage/CTAButton';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { dispatch } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../../../Services/ApiConnector';
import { endPoints } from '../../../Services/Api';
import { loginAuth } from '../../../Services/operations/AuthApi';




export const LoginForm = () => {
    const {user}=useSelector((state)=>state.profile)
    const dispatch=useDispatch();

    const [loginData,setLoginData]=useState(
        {
            email:"",
            password:""
        }
    )

const {email,password}=loginData;

    const navigate=useNavigate()
    const [isVisible,setIsVisible]=useState(false)
    const onChangeHandler=(e)=>{
        setLoginData((prev)=>(
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))
        console.log(loginData);
    }

  

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(loginAuth(email,password,navigate))
    }

    
  return (
    <div>
        {
            user!==null ? (
                <div>
                    Already logged in
                </div>
            ) : (
                <form className='flex flex-col gap-7 mt-6' onSubmit={(e)=>submitHandler(e)}>
            <div className='flex flex-col gap-2'>
                <label htmlFor='email' className='font-bold'>Email Address <sup className="text-pink-200 text-sm">*</sup></label>
                <input type='text' name='email' value={loginData.email} onChange={(e)=>onChangeHandler(e)} className='border-b border-richblack-400 bg-richblack-700 rounded-md p-2 text-richblack-50 outline-none' placeholder='Enter email Address'/>
            </div>

            <div className='flex flex-col gap-2 relative'>
                <label htmlFor='password' className='font-bold'>Password <sup className='text-pink-200 text-sm'>*</sup></label>
                <input type={isVisible ? "text":"password"} name='password' value={loginData.password} onChange={(e)=>onChangeHandler(e)} className='border-b border-richblack-400 bg-richblack-700 rounded-md p-2 text-richblack-50 outline-none' placeholder='Enter Password '>
                </input>
                <span className='absolute left-[93%] top-[42%]' onClick={()=>setIsVisible((prev)=>!prev)}>
                    {
                        isVisible ? (<BsEyeSlash fontSize={18} fill="#AFB2BF"/>) : (<BsEye fontSize={18} fill="#AFB2BF"/>)
                    }
                </span>

                  <Link to="/forgot-password">
                      <p className="mt-1 ml-auto max-w-max text-xs text-blue-50">
                          Forgot Password
                      </p>
                  </Link>
            </div>

              <button
                  type="submit"
                  className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
                  Sign In
              </button>
        </form>
            )
        }
    </div>
  )
}
