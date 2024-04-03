import React, { useState } from 'react';
import {HomePageExplore} from '../../../data/homepage-explore'
import { HighLightText } from './HighLightText';
import { CourseCard } from './CourseCard';

export const ExploreMore = () => {
    const tabsName=['Free','New to coding','Most popular', 'Skills paths','Career paths']

    const [currentTab,setCurrentTab]=useState(tabsName[0]);
    const [courses,setCourses]=useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading)

    const setMyCards=(value)=>{
        setCurrentTab(value);
        console.log(value);
        const result=HomePageExplore.filter((course)=>course.tag===value);
        console.log(result);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

  return (
    <div>
        <div>
        <div className='font-semibold text-4xl text-center mt-16'>
            Unlock the <HighLightText text={"Power of Code"}/>
        </div>

        <p className='text-center text-richblack-300 text-lg mt-3'>Learn to build anything you can imagine</p>
        </div>
        

        <div className='hidden lg:flex gap-5 mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
            {
                tabsName.map((ele,index)=>(
                    (
                        <div className={`text-[16px] flex flex-row items-center gap-2 ${currentTab===ele ? 'bg-richblack-900 text-richblack-5 font-medium':' text-richblack-200'} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-3`} 
                        key={index} 
                        onClick={()=>setMyCards(ele)}
                        >
                            {ele}
                        </div>
                    )
                ))
            }
        </div>
        <div className='hidden lg:block lg:h-[300px]'></div>

        {/* courseCARD */}
        <div className='lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[30%] text-black lg:mb-0 mb-7 lg:px-0 px-3'>
            
            {
                courses.map((ele,index)=>(
                    (
                        <CourseCard key={index} cardData={ele} currentCard={currentCard} setCurrentCard={setCurrentCard}/>
                    )
                ))
            }
        </div>
    </div>
  )
}
