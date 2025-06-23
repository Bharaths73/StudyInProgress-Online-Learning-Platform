import React from 'react';
import Instructor from "../../../assests/Images/Instructor.png"
import { HighLightText } from './HighLightText';
import CTAButton from './CTAButton';
import { FaArrowRight } from 'react-icons/fa6';

export const InstructorSection = () => {
  return (
     <div>
         <div className='flex sm:flex-row flex-col gap-20 items-center mt-16 sm:px-0 px-4'>
        <div className='sm:w-[50%]'>
            <img src={Instructor}/>
        </div>

        <div className='sm:w-[50%] w-full flex flex-col gap-10'>
            <div className='sm:text-4xl text-3xl font-semibold w-[50%]'>
                Become an <HighLightText text={"Instructor"}/>
            </div>

            <p className='font-medium text-[16px] w-[80%] text-richblack-300'>
            Instructors from around the world teach millions of students on CourseStack. We provide the tools and skills to teach what you love.
            </p>

            <div className='w-fit'>
            <CTAButton active={true} linkto={"signUp"}>
                <div className='flex gap-2 items-center'>
                    Start Learning Today
                    <FaArrowRight/>
                </div>
            </CTAButton>
            </div>
            
        </div>

    </div>
     </div>
  )
}
