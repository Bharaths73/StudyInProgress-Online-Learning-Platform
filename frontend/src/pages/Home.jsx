import React from 'react'
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";
import { HighLightText } from '../components/core/homePage/HighLightText';
import CTAButton from '../components/core/homePage/CTAButton';
import Banner from "../assests/Images/banner.mp4"
import { CodeBlocks } from '../components/core/homePage/CodeBlocks';
import { TimeLineSection } from '../components/core/homePage/TimeLineSection';
import { LearningLanguageSection } from '../components/core/homePage/LearningLanguageSection';
import { InstructorSection } from '../components/core/homePage/InstructorSection';
import { ExploreMore } from '../components/core/homePage/ExploreMore';
import Footer from '../components/common/Footer';
//import Footer from '../components/common/Footer';

const Home = () => {
  return (
    <div>
        {/*Section 1*/ }
        <div className='relative mx-auto flex flex-col w-11/12 items-center justify-between text-white max-w-maxContent'>
            <Link to={'/signUp'}>
                <div className='group mt-12 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900'>
                        <p>Become an instructor</p>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-8'>
                Empower Your Future with 
                <HighLightText text={"Coding Skills"}/>
            </div>

              <div className='mt-5 w-[90%] text-lg font-bold text-richblack-300 text-center'>
                  With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
              </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={'/signUp'}>Learn more</CTAButton>
                <CTAButton active={false} linkto={'/login'}>Book a Demo</CTAButton>
            </div>

            <div className='shadow-blue-200 my-12 mx-3'>
                <video muted loop autoPlay controls>
                    <source src={Banner} type='video/mp4'/>
                </video>
            </div>

            {/* code section 1* */}
            <div>
                <CodeBlocks 
                position={"lg:flex-row"} 
                heading={
                <div className='text-4xl font-semibold '>
                    Unlock Your <HighLightText text={"Coding Potentials"}/>With our online courses</div>
                } 
                subheading={ "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."} 
                      ctabtn1={
                          {
                              btnText: "try it yourself",
                              linkto: "/signUp",
                              active: true
                          }
                      } 
                      ctabtn2={
                        {
                            btnText: "learn more",
                            linkto: "/login",
                            active: false
                        }
                    }
                    codeblock={
                        `<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n`
                    }
                    codeColor={'text-blue-200'}/>
            </div>


            {/* code section 2* */}
            <div>
                <CodeBlocks 
                position={"lg:flex-row-reverse"} 
                heading={
                <div className='text-4xl font-semibold '>
                    Start <HighLightText text={"Coding in Seconds"}/></div>
                } 
                subheading={ "Go ahead, give it a try,Our hands-on learning environment means you'll be writing real code from your very first lesson."} 
                      ctabtn1={
                          {
                              btnText: "try it yourself",
                              linkto: "/signUp",
                              active: true
                          }
                      } 
                      ctabtn2={
                        {
                            btnText: "learn more",
                            linkto: "/login",
                            active: false
                        }
                    }
                    codeblock={
                        `<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n`
                    }
                    codeColor={'text-blue-200'}/>
            </div>

            <ExploreMore/>
        </div>


        {/** section 2 */}
        <div className='bg-pure-greys-5'>
            <div className='homepage_bg h-[270px]'>
                <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto justify-between'>
                    <div className='h-[150px]'></div>
                    <div className='flex flex-row gap-7 text-white'>
                        <CTAButton active={true} linkto={'/signup'}>
                            <div className='flex flex-row items-center gap-3'>
                                Explore Full Catalog
                            <FaArrowRight/>
                            </div>
                        </CTAButton>

                        <CTAButton active={false} linkto={'/signup'}>
                            <div className='flex flex-row items-center gap-3'>
                                Learn more
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>

            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center gap-7 justify-between'>
                <div className='flex flex-row justify-between mt-[95px] mb-16'>
                    <div className='text-4xl font-semibold w-[45%]'>
                        Get the Skills you need for a <HighLightText text={"Job that is in demand"}/>
                    </div>

                    <div className='flex flex-col gap-10 w-[40%] items-start'>
                    <div className='text-[16px]'>
                    The modern CourseStack is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                    </div>

                    <CTAButton active={true} linkto={"/signUp"}>
                        <div>
                            Learn more
                        </div>
                    </CTAButton>
                </div>
                </div>

                <TimeLineSection/>

                <LearningLanguageSection/>
            </div>


            
        </div>

        {/**  */}
        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col justify-between gap-8 bg-richblack-900 text-white'>
           <InstructorSection/>

           <h2 className='text-center text-4xl font-semibold mt-10'>Review from other learners</h2>

        </div>

        <Footer/>
    </div>
  )
}
export default Home;
