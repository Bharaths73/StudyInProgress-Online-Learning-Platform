import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { removeFromCart } from '../../../../Slices/CartSlice';

export const RenderCartCourses=()=>{
    const dispatch=useDispatch()
     const {cart}=useSelector((state)=>state.cart)
    return(
        <div className='flex flex-col gap-y-7 flex-1'>
            {
                cart.map((course,index)=>(
                    (
                        <div className='flex items-start gap-x-10'>
                            <div className='flex items-start gap-x-7 flex-1'>
                                <img src={course?.thumbnail} className=' h-28 w-48 border border-richblack-900 rounded-lg'/>
                                <div className='flex flex-col gap-y-3 '>
                                    <p className='text-white font-semibold text-xl'>{course?.courseName}</p>
                                    <p className='text-sm text-richblack-200'>{course?.category?.name}</p>
                                    <div className='flex gap-x-2 items-center'>
                                        <span>4.5</span>
                                        <ReactStars count={5} size={20} edit={false} activeColor='#ffd700' emptyIcon={<FaRegStar/>} fullIcon={<FaStar/>}/>
                                        <span>{course?.ratingAndReviews?.length} Rating</span>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col gap-x-5 items-center justify-start gap-y-3 ml-10 h-full'>
                                <button onClick={()=>{dispatch(removeFromCart(course._id))}}  className='flex items-center gap-x-2 bg-richblack-600 rounded-md px-2 py-1'>
                                    <MdDeleteForever className='text-lg text-pink-300'/>
                                    <span className='text-lg text-pink-300'>Remove</span>
                                </button>
                                <p className='text-xl text-yellow-50 font-semibold'>Rs {course?.price}</p>
                            </div>
                        </div>
                    )
                ))
            }
        </div>
    )
}