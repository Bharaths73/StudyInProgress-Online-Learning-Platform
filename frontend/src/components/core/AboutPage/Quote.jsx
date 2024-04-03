import React from "react";
import { HighLightText } from "../homePage/HighLightText";

export const Quote=()=>{
     return(
        <div className="text-center">
            We are passionate about revolutionizing the way we learn, Our innovative platform<HighLightText text={"combines Technology"}/>,<span className='text-brown-200'>{" "} expertise</span>, and community to create an <span>unparalled educational experience</span>      </div>
     )
}