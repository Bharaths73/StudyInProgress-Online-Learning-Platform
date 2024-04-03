import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'

export const CourseCard = ({course,height}) => {
    const[averageReviewCount,setAverageReviewCount]=useState(0)
    const {token}=useSelector((state)=>state.auth)

    useEffect(()=>{
        // const count=getAverageRating()
        // setAverageReviewCount(count)
    },[course])
  return (
    <div>
        <Link to={`/courses/${course._id}`}>
        <div>
            <div className='flex items-center'>
                <img src={course?.thumbnail} className={`${height} object-cover border border-richblack-900 rounded-xl w-full`}/>
            </div>
            <div className='flex flex-col gap-y-1 mt-2 '>
                <p className='text-lg'>{course?.courseName}</p>
                <p className='text-md'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                <div>
                    <span>{}</span>
                    {/* <RatingStars/> */}
                    <span className='text-yellow-50'>{course?.ratingAndReview?.length} <span>Ratings</span></span>
                </div>
                <p className='font-semibold text-lg'>Rs.{course?.price}</p>
            </div>
        </div>
        </Link>
    </div>
  )
}
