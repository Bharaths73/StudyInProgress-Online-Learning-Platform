import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import {FreeMode,Pagination,Autoplay,Navigation} from 'swiper/modules'
import { CourseCard } from './CourseCard';

export const CourseSlider = ({courses}) => {
  return (
    <div className='px-5 rounded-md mt-5'>
    {
        courses?.length? (
            <div>
                <Swiper loop={true} slidesPerView={1} spaceBetween={20} pagination={true} modules={[Pagination,Autoplay,Navigation]} autoplay={{delay:2500,disableOnInteraction:false}} breakpoints={{1024:{slidesPerView:3,}}}>
                    {
                        courses?.map((course,index)=>((
                            <SwiperSlide key={index}>
                                <CourseCard course={course} height={'h-[250px]'}/>
                            </SwiperSlide>
                        )))
                    }
                </Swiper>
            </div>
        ) :(
            <p>No Course Found</p>
        )
    }
    </div>
  )
}
