import React from 'react';
import { useSelector } from 'react-redux';
import { RenderCartCourses } from './RenderCartCourses';
import { RenderTotalAmount } from './RenderTotalAmount';

export const Cart=()=>{

    const {total,totalItems}=useSelector((state)=>state.cart)
    return(
        <div className='text-white'>
            <h1 className='text-2xl font-semibold'>Your Cart</h1>
            <p className='mt-5 text-md text-richblack-400'>{totalItems} Courses in Cart</p>
            {
                total>0 ?
                (
                    <div className='flex gap-x-20 mt-5 h-44'>
                        <RenderCartCourses/>
                        <RenderTotalAmount/>
                    </div>
                ):(
                    <p className='text-3xl text-richblack-300 flex justify-center mt-10'>Your Cart is Empty</p>
                )
            }
        </div>
    )
}