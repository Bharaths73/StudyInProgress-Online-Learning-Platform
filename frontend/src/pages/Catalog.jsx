import {React, useEffect, useState} from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { getCatalogPageData } from '../Services/operations/PageDetails'
import { apiConnector } from '../Services/ApiConnector'
import { categories } from '../Services/Api'
import { CourseCard } from '../components/core/Catalog/CourseCard'
import { CourseSlider } from '../components/core/Catalog/CourseSlider'

export const Catalog=()=>{

    const {catalogName}=useParams()
    const [catalogPageData,setCatalogPageData]=useState()
    const[categoryId,setCategoryId]=useState()

    useEffect(()=>{
        const getCategoryDetails=async()=>{
            const result=await apiConnector('GET',categories.CATEGORIES_API)
            const category_id=result?.data?.data?.filter((ct)=>ct.name.split(' ').join('-').toLowerCase()===catalogName)[0]._id
            console.log("category id from backend is ",category_id);
            setCategoryId(category_id)
        }

            getCategoryDetails()

    },[catalogName])

    useEffect(()=>{
        const getCategoryPageDetails=async()=>{
            console.log("category id is ",categoryId);
            const result=await getCatalogPageData(categoryId)
            console.log("category details ",result);
            setCatalogPageData(result)
        }
        getCategoryPageDetails()
    },[categoryId])

    return(
        <div className='text-white'>
            <div className='flex flex-col bg-richblack-800 p-10 gap-y-3'>
                <p className='text-sm'>{'Home / Catalog / '}<span>{catalogPageData?.selectedCategory?.name}</span></p>
                <p className='text-3xl font-semibold'>{catalogPageData?.selectedCategory?.name}</p>
                <p className='text-md text-richblack-400'>{catalogPageData?.selectedCategory?.description}</p>
            </div>

            <div>
                <div className=' mt-10 flex flex-col gap-y-5'>
                    <div className='font-semibold text-2xl ml-5'>Courses to get you started</div>
                    <div className='flex gap-x-7 border-b ml-5'>
                        <p className='text-lg  mb-2'>Most Popular</p>
                        <p className='text-lg'>New</p>
                    </div>

                   <div >
                   <CourseSlider courses={catalogPageData?.selectedCategory?.course}/> 
                   </div>
                </div>

                <div className='mt-20'>
                    <p className='font-semibold text-xl ml-5'>Top Courses in <span>{catalogPageData?.selectedCategory?.name}</span></p>
                    <div>
                    <CourseSlider courses={catalogPageData?.differentCategory?.course}/>
                    </div>
                </div>

                <div className='mt-20'>
                    <p className='font-semibold text-xl ml-5'>Frequently Bought </p>
                    <div className='px-8 py-5'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-7'>
                            {
                                catalogPageData?.mostSellingCourses?.slice(0,4).map((course,index)=>((
                                   <CourseCard course={course} key={index} heigth={"h-[400px]"}/>
                                )))
                            }
                        </div>
                    </div>
                </div>

                <Footer/>
            </div>
        </div>
    )
}