import React from "react";
import { ContactUsForm } from "../components/common/ContactUsForm";
import { ContactForm } from "../components/core/AboutPage/ContactForm";

export const ContactUs=()=>{
    return(
      <div className="flex items-center justify-center">
        <div className="w-11/12 max-w-maxContent flex items-center justify-center">
          <ContactForm />
        </div>
      </div>

    )
}