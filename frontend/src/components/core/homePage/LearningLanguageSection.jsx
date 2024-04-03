import React from 'react'
import { HighLightText } from './HighLightText';
import knowYourProgress from "../../../assests/Images/Know_your_progress.png";
import compareWithOthers from "../../../assests/Images/Compare_with_others.png";
import planYourLessons from "../../../assests/Images/Plan_your_lessons.png"
import CTAButton from './CTAButton';

export const LearningLanguageSection = () => {
  return (
    <div className='mt-[150px] mb-4'>
        <div className='flex flex-col gap-5 items-center'>
            <div className='font-semibold text-4xl text-center'>
                Your Swiiss Knife for <HighLightText text={"Learning any language"}/>
            </div>

            <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[70%]'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className='relative flex flex-row items-center justify-center mt-5'>
                <img src={knowYourProgress} className='object-cover -mr-32'/>
                <img src={compareWithOthers}/>
                <img src={planYourLessons} className='object-cover -ml-36'/>
            </div>

           <div className='w-fit mb-10'>
           <CTAButton active={true} linkto={"/signUp"}>
                Learn more
           </CTAButton>
           </div>
        </div>
    </div>
  )
}
