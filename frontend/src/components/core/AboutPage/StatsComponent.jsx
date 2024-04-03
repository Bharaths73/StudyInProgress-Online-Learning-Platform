import React from "react";


const StatsData=[
    {
        count:"5K",
        label:"Active Students"
    },
    {
        count:"10+",
        label:"Mentors"
    },
    {
        count:"200+",
        label:"Courses"
    },
    {
        count:"50+",
        label:"Awards"
    }
]
export const StatsComponent=()=>{
    return(
        <section className="flex items-center justify-center">
            <div className="flex w-11/12 max-w-maxContent items-center justify-center mt-20 bg-richblack-700"> 
                <div className="text-white flex justify-between w-[90%] p-10" >
                    {
                        StatsData.map((data, index)=>(
                            (
                                <div key={index} className="flex flex-col items-center justify-center">
                                    <h1>{data.count}</h1>
                                    <p>{data.label}</p>
                                </div>
                            )
                        ))
                    }
                </div>
            </div>
        </section>
    )
}