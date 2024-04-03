import React from 'react'
import { Template } from '../components/core/Auth/Template'

export const Login = () => {
  return (
    <div className='text-richblack-5'>
       <Template formType={'LoginForm'} heading={"Welcome Back"}/>
    </div>
  )
}
