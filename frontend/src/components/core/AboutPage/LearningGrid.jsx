import React from "react";
import { HighLightText } from "../homePage/HighLightText";
import CTAButton from "../homePage/CTAButton";

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "CourseStack partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "CourseStack partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "CourseStack partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "CourseStack partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "CourseStack partners with more than 275+ leading universities and companies to bring",
    },
  ];
export const LearningGrid=()=>{
    return(
        <div className="w-11/12 max-w-maxContent mt-40 flex items-center justify-center">
            <div className="grid lg:grid-cols-4 grid-cols-1 mb-10 w-fit">
                {
                    LearningGridArray.map((card,index)=>(
                        (
                            <div className={`${index===0 && "lg:col-span-2 bg-richblack-900"} ${card.order % 2===1 ? "bg-richblack-700" : "bg-richblack-800"} ${card.order===3 && "lg:col-start-2"} text-white p-10 `} key={index}>
                                {
                                    card.order < 0 ? (
                                        <div className="lg:w-[90%] flex flex-col justify-center items-center gap-3 ">
                                            <h1 className="font-semibold text-3xl">{card.heading} <HighLightText text={card.highlightText}/></h1>
                                            <p>{card.description}</p>
                                            <CTAButton active={true} linkto={card.BtnLink}>
                                                {card.BtnText}
                                            </CTAButton>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-3">
                                            <p className="font-semibold">{card.heading}</p>
                                            <p>{card.description}</p>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    ))
                }
            </div>
        </div>
    )
}