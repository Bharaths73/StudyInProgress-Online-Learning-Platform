import React from 'react';
// import Logo1 from "../../../assests/TimeLineLogo/Logo1.svg"
// import Logo2 from "../../../assests/TimeLineLogo/Logo2.svg"
// import Logo3 from "../../../assests/TimeLineLogo/Logo3.svg"
// import Logo4 from "../../../assests/TimeLineLogo/Logo4.svg"
//import timelineImage from "../../../assets/Images/TimelineImage.png"
import timeLineImg from "../../../assests/Images/TimelineImage.png"

export const TimeLineSection = () => {
  const timeLine=[
    {
      // logo:Logo1,
      heading:"Leadership",
      description:"Fully committed to the success company"
    },
    {
      // logo:Logo2,
      heading:"Leadership",
      description:"Fully committed to the success company"
    },
    {
      // logo:Logo3,
      heading:"Leadership",
      description:"Fully committed to the success company"
    },
    {
      // logo:Logo4,
      heading:"Leadership",
      description:"Fully committed to the success company"
    },
  ]
  return (
    <div>
      <div className='flex flex-row gap-20 items-center'>
        <div className='flex flex-col w-[45%] gap-5'>
          {
            timeLine.map((ele,index)=>(
              (
                <div className='flex flex-row gap-6' key={index}>
                  <div className='w-[50px] h-50px bg-white flex items-center'>
                    {/* {ele.logo} */}
                  </div>
                  
                  <div className='flex flex-col'>
                    <h2 className='font-semibold test-[18px]'>{ele.heading}</h2>
                    <p className='text-base'>{ele.description}</p>
                  </div>
                </div>
              )
            ))
          }
        </div>

        <div className='relative shadow-blue-200'>
          <div>
            <img src={timeLineImg} className='shadow-white abject-cover h-fit'/>
          </div>

          <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
            <div className='flex gap-5 items-center border-r border-caribbeangreen-300 px-7'>
              <p className='text-3xl font-bold'>10</p>
              <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
            </div>

            <div className='flex gap-5 items-center px-7'>
              <p className='text-3xl font-bold'>10</p>
              <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
