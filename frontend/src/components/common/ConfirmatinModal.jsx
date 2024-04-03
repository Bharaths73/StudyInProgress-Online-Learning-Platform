import React from 'react'
import { IconButton } from './IconButton'

export const ConfirmatinModal = ({modalData}) => {
  console.log("hitting modal",modalData);
  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className='w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6 flex flex-col items-start gap-y-4'>
            <p className='font-semiBold text-xl text-white'>{modalData.text1}</p>
            <p className='text-md text-white'>{modalData.text2}</p>
            <div className='flex gap-3 items-center mt-5'>
                <button onClick={modalData?.btn2Handler}  className='bg-richblack-600 px-4 py-2 rounded-md text-white'>{modalData?.btn2Text}</button>
                <button onClick={modalData?.btn1Handler} className='bg-yellow-50 px-4 py-2 rounded-md text-black'>{modalData?.btn1Text}</button>
            </div>
        </div>
    </div>
  )
}
