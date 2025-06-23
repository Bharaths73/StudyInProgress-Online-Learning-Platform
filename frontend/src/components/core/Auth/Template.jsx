import React from 'react'
import { LoginForm } from './LoginForm'
import { SignUpForm } from './SignUpForm'
import loginImg from '../../../assests/Images/login.webp'

import { HighLightText } from '../homePage/HighLightText'

export const Template = ({formType,heading}) => {

  return (
    <div>
        <div className='flex md:flex-row flex-col-reverse w-11/12 max-w-maxContent mx-auto md:justify-between mt-16 md:items-center justify-center gap-5 sm:gap-y-20'>
              <div className='flex flex-col md:w-[45%] w-full p-5 md:p-0'>
                  <div className='flex flex-col gap-4'>
                      <h1 className='font-semibold text-richblack-5 text-3xl'>{heading}</h1>
                      <p className=' text-lg tracking-wide'>Build skills for today, tomorrow, and beyond.<HighLightText text="Education to future-proof your career" /></p>
                  </div>

                  <div>
                    {
                        formType == 'LoginForm' ? (<LoginForm/>):(<SignUpForm/>)
                    }
                  </div>
                  {/* <div className='mt-5 w-full'> */}
                   
                  {/* </div> */}
              </div>

            <div className='md:w-[45%] w-full p-5 md:p-0'>
                <img src={loginImg} className='w-full'></img>
            </div>
        </div>
    </div>
  )
}
