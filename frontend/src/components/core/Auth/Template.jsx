import React from 'react'
import { LoginForm } from './LoginForm'
import { SignUpForm } from './SignUpForm'
import loginImg from '../../../assests/Images/login.webp'
import { HighLightText } from '../homePage/HighLightText'

export const Template = ({formType,heading}) => {
  return (
    <div>
        <div className='flex lg:flex-row w-11/12 max-w-maxContent mx-auto justify-between mt-16 items-center gap-5 sm:flex-col-reverse sm:gap-y-20'>
              <div className='flex flex-col w-[45%]'>
                  <div className='flex flex-col gap-4'>
                      <h1 className='font-semibold text-richblack-5 text-3xl'>{heading}</h1>
                      <p className=' text-lg tracking-wide'>Build skills for today, tomorrow, and beyond.<HighLightText text="Education to future-proof your career" /></p>
                  </div>

                  <div>
                    {
                        formType == 'LoginForm' ? (<LoginForm/>):(<SignUpForm/>)
                    }
                  </div>
              </div>

            <div className='w-[45%]'>
                <img src={loginImg}></img>
            </div>
        </div>
    </div>
  )
}
