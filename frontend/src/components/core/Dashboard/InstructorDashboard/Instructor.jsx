import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../Services/operations/CourseApi';
import { getInstructorData } from '../../../../Services/operations/ProfileApi';
import InstructorChart from './InstructorChart'

const Instructor=()=>{
    const {token}=useSelector((state)=>state.auth)
    const {user}=useSelector((state)=>state.profile);
    const [loading,setLoading]=useState(false);
    const[instructorData,setInstructorData]=useState(null);
    const [courses,setCourses]=useState([]);
    useEffect(()=>{
        const getCourseDataStats=async()=>{
            setLoading(true);
            const instructorApiData=await getInstructorData(token);
            const result =await fetchInstructorCourses(token);

            console.log(instructorApiData);

            if(instructorApiData.length){
                setInstructorData(instructorApiData)
            }
            if(result){
                setCourses(result);
            }
            setLoading(false);
        }
        getCourseDataStats()
    },[])

    const totalAmount=instructorData?.reduce((acc,curr)=>acc+curr.totalAmountGenerated,0);
    const totalStudents=instructorData?.reduce((acc,curr)=>acc+curr.totalStudentsEnrolled,0);
    return(
        <div className=' text-white h-full w-full flex flex-col gap-10'>
            <div className='flex flex-col gap-2'>
                <h1 className='font-semibold text-3xl'>Hi {user?.firstName}</h1>
                <p className=' text-xl text-richblack-300'>Let's Start Something New</p>
            </div>
            {loading ? (<div>Loading...</div>):courses.length>0 ? (
                <div className='flex flex-row'>
                    <div className='flex md:flex-col lg:flex-row lg:justify-between lg:w-full'>
                        <InstructorChart courses={instructorData}/>
                        <div className='flex flex-col gap-5 border-richblack-500 px-20 py-12 rounded-lg border-2 h-96'>
                            <p className=' font-semibold text-2xl text-richblack-100'>Statistics</p>
                            <div className='flex flex-col gap-2 mt-2'>
                                <p className='text-xl text-richblack-300'>Total Courses</p>
                                <p className='text-xl font-semibold text-richblack-300'>{courses.length}</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                            <p className='text-xl text-richblack-300'>Total Students</p>
                            <p className='text-xl font-semibold text-richblack-300'>{totalStudents}</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-xl text-richblack-300'>Total Income</p>
                                <p className='text-xl font-semibold text-richblack-300'>{totalAmount}</p>
                                </div>
                        </div>
                    </div>
                </div>
            ):(<div></div>)
            }
        </div>
    )
}

export default Instructor;