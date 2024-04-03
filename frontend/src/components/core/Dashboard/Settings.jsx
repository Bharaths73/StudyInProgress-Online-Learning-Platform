import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { MdOutlineFileUpload } from "react-icons/md";
import { uploadFileToBackend } from '../../../Services/operations/ProfileApi';
import { useForm,Controller } from 'react-hook-form';
import { setUser } from '../../../Slices/ProfileSlice';
import { updateUser } from '../../../Services/operations/ProfileApi';
import toast from 'react-hot-toast';
import { UpdatePassword } from './UpdatePassword';

export const Settings = () => {

  const {token}=useSelector((state)=>state.auth)
  const {user}=useSelector((state)=>state.profile)
  const {register,setValue,getValues,handleSubmit,formState:{errors},control}=useForm()
  const dispatch=useDispatch();

    console.log(user.additionalDetails.about);
    const navigate=useNavigate()
    const[loading,setLoading]=useState(false)

    const [tempFile,setTempFile]=useState(user?.image);
    const [updateFile,setUpdateFile]=useState(null)

    console.log("temp file is",tempFile);
    console.log(("user file is ",user.image));

    function tempFileHandler(e){
      const file = e.target.files[0]
      if(file){
        previewFile(file)
        setUpdateFile(file)
      }
    }

    const previewFile = (file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setTempFile(reader.result)
      }
    }

    const uploadFile=()=>{
      try{
        setLoading(true)
        const formData = new FormData()
        formData.append("displayPicture",updateFile)
        dispatch(uploadFileToBackend(formData,token))
      }
      catch(err){
        console.log("Failed to update profile picture");
      }
      setLoading(false)
    }

    const isFormEdited=()=>{
      const currentValue=getValues()

      if(currentValue.firstName!==user?.firstName || currentValue.lastName!==user?.lastName||currentValue.dateOfBirth!==user.additionalDetails.dateOfBirth||currentValue.phoneNumber!==user.additionalDetails.contactNumber||currentValue.about!==user.additionalDetails.about||currentValue.gender!==user.additionalDetails.gender){
        return true
      }
      else{
        return false
      }
    }

    const onSubmitHandler=async(data)=>{
      const currentValue=getValues()
      console.log("values are ",currentValue);
      if(isFormEdited()){
        const formData=new FormData()

        if(currentValue.dateOfBirth.toString()!==user.additionalDetails.dateOfBirth.toString()){
          formData.append('dateOfBirth',JSON.stringify(currentValue.dateOfBirth))
        }
        if(currentValue.phoneNumber!==user.additionalDetails.contactNumber){
          formData.append('contactNumber',currentValue.phoneNumber)
        }
        if(currentValue.about!==user.additionalDetails.about){
          formData.append('about',currentValue.about)
        }
        if(currentValue.gender!==user.additionalDetails.gender){
          formData.append('gender',currentValue.gender)
        }
        setLoading(true)
        dispatch(updateUser(formData,token))
        
        setLoading(false)
      }
      else{
        toast.error("No information changed")
        return
      }
    }
const currentValue=getValues()
    useEffect(()=>{
      setValue('firstName',user?.firstName)
      setValue('lastName',user?.lastName)
      setValue('dateOfBirth',user?.additionalDetails.dateOfBirth)
      setValue('gender',user.additionalDetails.gender)
      setValue('phoneNumber',user?.additionalDetails.contactNumber)
      setValue('about',user?.additionalDetails.about)
    },[])

  return (
    <div className='text-white flex flex-col mx-auto gap-10'>
        <h1 className='font-semibold text-2xl'>Edit Profile</h1>

        <div className='flex bg-richblack-700 rounded-md justify-between px-8'>
            <div className='flex items-center gap-x-5  py-8'>
                <img src={`${tempFile}`} alt={`${user?.firstName}`} className='aspect-square w-[78px] rounded-full object-cover'/>
                <div className='flex flex-col gap-y-2'>
                    <p className='f text-lg'>Change Profile Picture</p>
                   <div className='flex items-center gap-3'>
                    <label htmlFor='profilePic' className='bg-yellow-200 py-2 px-6 text-black rounded-md'>Select</label>
                     <input type='file' name='profilePic' id='profilePic' className='hidden' onChange={(e)=>{tempFileHandler(e)}}/>
                     <button onClick={()=>{uploadFile()}} className=' border border-richblack-300 py-2 px-4 rounded-md flex gap-2 items-center text-richblack-100' >{loading? "Uploading..." : 'upload'} {<MdOutlineFileUpload className='text-lg'/>}</button>
                   </div>
                </div>
            </div>
        </div>

        <div className='flex flex-col bg-richblack-700 rounded-md px-8 py-5'>
        <form onSubmit={handleSubmit(onSubmitHandler)} >
          <p className='font-semibold text-xl'>Profile Information</p>
          <div className='flex gap-x-10 mt-5 items-center'>
            <div className='flex flex-col gap-y-1 flex-1'>
            <label>First Name</label>
            <input type='text' placeholder='Enter First Name' id='firstName' {...register('firstName')} className='w-full py-2 text-black px-2 rounded-md' disabled={true}/>
            </div>

            <div className='flex flex-col gap-y-1 flex-1'>
            <label>Last Name</label>
            <input type='text' placeholder='Enter Last Name' id='lastName' {...register('lastName')} className='w-full py-2 text-black px-2 rounded-md' disabled={true}/>
            </div>
          </div>

          <div className='flex gap-x-10 mt-5 items-center'>
            <div className='flex flex-col gap-y-1 flex-1'>
              <label>Date of Birth</label>
              <input type='date' id='dateOfBirth' {...register('dateOfBirth')} className='w-full py-2 text-black px-2 rounded-md'/>
            </div>

            <div className='flex flex-col gap-y-1 text-white flex-1'>
              <label>Gender</label>
               <div className='flex gap-x-2 '>
               <input type='radio' id='male' name='gender' value='male' {...register('gender',)} defaultChecked={user.additionalDetails.gender === 'male'} /><span>Male</span>
              <input type='radio' id='female' name='gender' value='female' {...register('gender')} defaultChecked={user.additionalDetails.gender === 'female'} /><span>Female</span>
              <input type='radio' id='other' name='gender' value='other' {...register('gender')} defaultChecked={user.additionalDetails.gender === 'other'} /><span>Other</span>
               </div>
            </div>
          </div>

          <div className='flex gap-x-10 mt-5 items-start'>
            <div className='flex flex-col gap-y-1 flex-1'>
              <label>Contact Number</label>
              <input type='text' placeholder='Enter Your Contact Number' id='phoneNumber' {...register('phoneNumber',{required:true,valueAsNumber:true})} className='w-full py-2 text-black px-2 rounded-md'/>
              {
                errors.phoneNumber && (
                  <span className='text-pink-400'>Contact number is required</span>
                )
              }
            </div>

            <div className='flex flex-col gap-y-1 flex-1'>
              <label>About</label>
              <textarea placeholder='Write About You' id='about' {...register('about')} className='w-full py-2 text-black px-2 rounded-md'/>
            </div>
          </div>

          <div className='flex items-center justify-end mt-7'>
          <button className='text-black bg-yellow-50 px-4 py-2 rounded-md'>Save</button>
          </div>
        </form>
        </div>

       <UpdatePassword/>
    </div>
  )
}
