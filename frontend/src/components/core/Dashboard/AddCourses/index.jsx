import React from 'react'
import { RenderSteps } from './RenderSteps'

export const AddCourse= () => {
  return (
    <div className='text-white flex flex-col '>
        <div className='flex lg:justify-around lg:flex-row sm:flex-col-reverse sm:gap-8'>
            <div className='flex flex-col gap-y-8'>
                <h1 className='font-semibold text-2xl'>Add Course</h1>
                <div className=''>
                    <RenderSteps/>
                </div>
            </div>

            <div className='flex flex-col gap-4 bg-richblack-700 p-8 rounded justify-center items-center h-max '>
                <p className='font-semibold text-lg'>Code Upload Tips</p>
                <ul className='flex flex-col gap-2 text-sm' style={{ listStyleType: 'disc' }}>
                    <li>Lorem ipsum dolor sit amet consectetur </li>
                    <li>Lorem ipsum dolor sit amet consectetur</li>
                    <li>Lorem ipsum dolor sit amet consectetur </li>
                    <li>Lorem ipsum dolor sit amet consectetur </li>
                    <li>Lorem ipsum dolor sit amet consectetur </li>
                    <li>Lorem ipsum dolor sit amet consectetur </li>
                    <li>Lorem ipsum dolor sit amet consectetur </li>
                    <li>Lorem ipsum dolor sit amet consectetur </li>
                    <li>Lorem ipsum dolor sit amet consectetur </li>
                    <li>Lorem ipsum dolor sit amet consectetur </li>
                    <li>Lorem ipsum dolor sit amet consectetur </li>
                </ul>
            </div>
        </div>
    </div>
  )
}
