import React, { useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';
import {useForm} from 'react-hook-form'
import ReactStars from "react-rating-stars-component";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { publishRatingAndReview } from '../../../Services/operations/StudentFeaturesApi';


export const CourseReviewModal = ({setReviewModal}) => {
    const {user}=useSelector((state)=>state.profile)
    const{token}=useSelector((state)=>state.auth)
    const {handleSubmit,register,setValue,getValues,formState:{errors}}=useForm()
    const {courseEntireData}=useSelector((state)=>state.viewCourse)

    const RatingAndReviewHandler=async(data)=>{
        const result=await publishRatingAndReview({rating:data.rating,courseId:courseEntireData._id,review:data.review},token)

        setReviewModal(false)
    }

    const ratingChanged=(newRating)=>{
        setValue("rating",newRating)
    }

    useEffect(()=>{
        setValue('rating',0)
        setValue('review',"")
    },[])
  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>

        <div className='w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 flex flex-col items-start gap-y-4'>
        <div className='flex justify-between w-full bg-richblack-500 px-3 py-3 items-center border-b-2 border-richblack-200'>
            <div className='font-semiBold text-xl text-white items-center'>Add Review</div>
            <div className='cursor-pointer' onClick={()=>setReviewModal(false)}>
                <RxCross2 className='text-white text-xl'/>
            </div>
        </div>
        
        <div className='flex items-center mx-auto gap-5'>
            <img src={user?.image} className=' h-16 rounded-full'/>
            <div className='text-white flex flex-col'>
                <p className='font-semi-bold text-lg'>{user?.firstName}</p>
                <p className='text-sm text-richblack-300'>Post Publicaly</p>
            </div>
        </div>

        <div className='mx-auto'>
        <ReactStars count={5} size={20} edit={true} activeColor='#ffd700' emptyIcon={<FaRegStar/>} fullIcon={<FaStar/>} onChange={ratingChanged}/>
        </div>

        <form onSubmit={handleSubmit(RatingAndReviewHandler)} className='w-full flex flex-col px-5 gap-y-2'>
            <label htmlFor='review' className='text-md text-richblack-200'>Add your Experience</label>
            <textarea id='review' name='review' {...register('review',{required:true})} rows={5}className='rounded-md bg-richblack-400 px-3 py-3 text-white' placeholder='Enter Your Review'/>
            {
                errors.review && (
                    <span>Review is required</span>
                )
            }
            <div className='flex mb-3 mt-3 justify-end gap-x-3 items-center'>
            <button onClick={()=>setReviewModal(false)} className='text-white px-3 py-2 rounded-md bg-richblack-600'>Cancel</button>
            <button className='text-black px-3 py-2 rounded-md bg-yellow-50'>Save</button>
        </div>
        </form>
        </div>
        
    </div>
  )
}