import React, { useEffect, useState } from "react";
import {useForm} from 'react-hook-form'
import CTAButton from "../core/homePage/CTAButton";
import { apiConnector } from "../../Services/ApiConnector";
import { endPoints } from "../../Services/Api";
import CountryCode from '../../data/countrycode.json'

export const ContactUsForm=()=>{

    const[loading,setLoading]=useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    }=useForm()

const submitContactForm=async(data)=>{
    console.log("Logging data",data);
    
    try{
        setLoading(true)
        const response=await apiConnector("POST",endPoints.CONTACT_US_API,data);
        console.log("logging response is ",response);
        setLoading(false)
    }
    catch(err){
        console.log(("Error",err));
        setLoading(false)
    }
}
    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNo:""
            })
        }
    },[reset,isSubmitSuccessful])

    return(
        <form onSubmit={handleSubmit(submitContactForm)} className="flex flex-col gap-5 mt-5">
          <div className=" flex flex-row gap-5">
          <div className="flex flex-col gap-2">
                <label htmlFor="firstName">First Name</label>
                <input type='text' name='firstName' id="firstName" placeholder="First Name" {...register("firstName",{required:true})} className="text-black p-2"/>
                {
                    errors.firstName && (
                        <span>Please enter your first name</span>
                    )
                }
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="lastName">Last Name</label>
                <input type='text' name='lastName' id="lastName" placeholder="Last Name" {...register("lastName",{required:true})} className="text-black p-2"/>
                {
                    errors.lastName && (
                        <span>Please enter your last name</span>
                    )
                }
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="email">Email</label>
            <input type='text' name='email' id='email' placeholder="Email Address"  {...register("email",{required:true})} className="text-black p-2"/>
           {
            errors.email && (
                <span>Please Enter a valid email</span>
            )
           }
          </div>

          <div className="flex flex-col gap-3">
            <label>Phone No</label>
            <div className="flex flex-row gap-5">
                <div className="flex flex-row text-black">
                <select name='code' id='code' {...register("countryCode",{required:true})}className='w-[80px] p-2'>
                    {
                        CountryCode.map((code,index)=>(
                            (
                                <option value={code.code} key={index}>{code.code}-{code.country}</option>
                            )
                        ))
                    }
                </select>
                </div>

                <div className="w-full">
                    <input type="number" name="phoneNo" id="phoneNo" placeholder="1234567890" className="text-black w-full p-2"{...register("phoneNo",{required:{value:true,message:"Please enter Phone Number"},maxLength:{value:10,message:"Invalid phone no"},minLength:{value:8,message:"Invalid Phone No"}})}/>
                </div>
            </div>
            {
                errors.phoneNo && (
                    <span>{errors.phoneNo.message}</span>
                )
            }
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="message">Message</label>
            <textarea name='message' placeholder="write your message" color="30" rows="7" {...register("message",{required:true})} className="text-black p-2"></textarea>
            {
                errors.message && (
                    <span>Please enter your message</span>
                )
            }
          </div>

          <button type="submit" className="rounded-md bg-yellow-25 text-center px-6 text-[15px] font-bold text-richblack-900 py-3">Send Message</button>
        </form>
    )
}