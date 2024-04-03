import React, { useEffect ,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCoursesDetails } from '../Services/operations/CourseApi'
import { useDispatch, useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../Services/operations/ProfileApi'
import { addToCart } from '../Slices/CartSlice'
import toast from 'react-hot-toast'
import { buyCourse } from '../Services/operations/StudentFeaturesApi'

export const BuyNow = () => {
    const {courseId}=useParams()
    const[courseDetails,setCourseDetails]=useState()
    const[totalLectures,setTotalLectures]=useState(0)
    const {token}=useSelector((state)=>state.auth)
    const {user}=useSelector((state)=>state.profile)
    const {cart}=useSelector((state)=>state.cart)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    useEffect(()=>{
        const getParticularCourseDetails=async()=>{
            const result=await fetchCoursesDetails(courseId,token)

            if(result){
                setCourseDetails(result)
            }
        }
        getParticularCourseDetails()
    },[])

    const [enrolledCourses,setEnrolledCourses]=useState()

    const getEnrolledCourses=async()=>{
        try{
            const response=await getUserEnrolledCourses(token)
            console.log("enrolled corses are ",response);
            setEnrolledCourses(response)
        }
        catch(err){
            console.log("unable to fetch courses");
        }
    }

    useEffect(()=>{
        getEnrolledCourses()
    },[])

    const addItemToCart=()=>{
        if(token && user.accountType==='Student'){
            const toastId=toast.loading('Loading...')
            dispatch(addToCart(courseDetails))
            toast.dismiss(toastId)
        }
        if(token && user.accountType==='Instructor'){
            toast.error("Login has student to buy this course")
        }
        else{
            navigate('/login')
        }
        
    }

    const handleBuyCourse=()=>{
        if(token && user.accountType==='Student'){
            buyCourse([courseId],token,user,navigate,dispatch)
            return
        }
        if(token && user.accountType==='Instructor'){
            toast.error("Login has student to buy this course")
        }
        else{
            navigate('/login')
        }
    }

useEffect(()=>{
    const totalLectures=()=>{
        let lectures=0
        courseDetails?.courseContent?.forEach(element => {
            lectures+=element.subSection?.length
        })
        setTotalLectures(lectures)
    }
    totalLectures()
},[courseDetails])

    const shareHandler=()=>{

    }
  return (
    <div className='flex flex-col'>
          {/* section 1 */}
        <div className='w-full bg-richblack-700 relative'>
            <div className='flex flex-col mt-10 gap-3  w-11/12 max-w-maxContent mx-auto text-white mb-10'>
                <h1 className='font-semibold text-3xl'>{courseDetails?.courseName}</h1>
                <p className='text-sm text-richblack-400'>{courseDetails?.courseDescription}</p>
                <div className='flex gap-x-4'>
                    <p className='text-yellow-50 text-md'><span>0 Ratings</span></p>
                    <p><span>{courseDetails?.studentsEnrolled?.length} Students</span></p>
                </div>
                <p>Created by <span>{courseDetails?.instructor?.firstName} {courseDetails?.instructor?.lastName}</span></p>
                <div className='flex gap-x-4'>
                  <p>Created at</p>
                  <p>English</p>
                </div>
            </div>

            <div className='flex flex-col text-white w-[25%] bg-richblack-700 p-5 border border-richblack-600 rounded-md absolute top-28 left-[65%] gap-y-4'>
                <img src={courseDetails?.thumbnail}/>
                <p className='text-xl font-semibold'><span>Rs.</span>{courseDetails?.price}</p>
                <div className='flex flex-col'>
                    {
                        enrolledCourses?.find(enroll=>enroll._id===courseId) ? (
                            <div className='flex justify-center'>
                                <button className='bg-yellow-50 text-black rounded-md px-4 py-2 w-full' onClick={()=>navigate('/dashboard/enrolled-courses')}>Go to Course</button>
                            </div>
                        ):(
                      <div className='flex flex-col gap-y-3'>
                        <button  className='bg-yellow-50 text-black rounded-md px-4 py-2' onClick={handleBuyCourse}>Buy Now</button>
                        <button className=' bg-richblack-500 text-richblack-100 rounded-md px-4 py-2' onClick={addItemToCart}>Add to Cart</button>
                      </div>
                        )
                      
                    }
                </div>
                <div className='flex items-center justify-center'>
                   <p>30 day money back gaurantee</p>
                </div>

                <div className='flex flex-col items-start gap-y-2'>
                    <p className='font-semibold'>This course includes</p>
                    <ul className='flex flex-col gap-2 text-md ml-5' style={{ listStyleType: 'disc'}}>
                        {
                            courseDetails?.instructions?.map((include,index)=>((
                                <li className='text-caribbeangreen-400' key={index}>{include}</li>
                            )))
                        }
                    </ul>
                </div>

                <div className='flex justify-center'>
                    <button className=' bg-richblack-500 text-yellow-50 rounded-md px-4 py-2 w-full' onClick={shareHandler}>Share</button>
                </div>
            </div>
        </div>

        {/* section2 */}
        <div>
            <div className='w-11/12 max-w-maxContent mx-auto mt-10'>
                <p className='text-white text-3xl font-semibold'>what you'll learn</p>
                <div className='flex flex-col mt-5 gap-y-3'>
                   <p className='text-richblack-200 text-md'>{courseDetails?.whatYouWillLearn}</p>
                </div>
            </div>
        </div>

        {/* section 3 */}
        <div>
            <div className='w-11/12 max-w-maxContent mx-auto flex flex-col mt-10 gap-y-3'>
                <p className='text-white text-3xl font-semibold'>Course Content</p>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <p className='text-richblack-200 text-md'>{courseDetails?.courseContent?.length} Sections</p>
                        <p className='text-richblack-200 text-md'>{totalLectures} Lectures</p>
                        {/* <p>{courseDetails?.courseContent?.length}</p> */}
                    </div>

                    {/* <div>
                        <p className='text-yellow-50'>Collapse all sections</p>
                    </div> */}
                </div>

                <div>
                    <details>
                        <summary></summary>
                    </details>
                </div>

            </div>
        </div>
    </div>
  )
}
