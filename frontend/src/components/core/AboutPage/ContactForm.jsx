import React from "react";
import { ContactUsForm } from "../../common/ContactUsForm";

export const ContactForm=()=>{
    return(
        <div className="mx-auto text-white mt-14">
            <h1 className="text-3xl font-semibold text-richblack-100">Get in Touch</h1>
            <p className="text-md font-semibold text-richblack-100">We'd love to here for you, please fill out this form</p>
            <div>
               <ContactUsForm/>
            </div>
        </div>
    )
}