import React, { useEffect, useRef, useState } from 'react';
import { Chart,registrables } from 'chart.js';
// Chart.register(...registrables);
const InstructorChart=({courses})=>{
    const[currChart,setCurrChart]=useState("students");
    const chartRef=useRef(null);
    const chartInstance=useRef(null);

    useEffect(()=>{
        // if(chartInstance.current){
        //     chartInstance.current.destroy();
        // }
        const myChartRef=chartRef.current.getContext('2d');

        chartInstance.current=new Chart(myChartRef,{
            type:'pie',
            data:{
                labels:courses.map((course)=>course.courseName),
                datasets:currChart==='students' ? [
                    {
                        data:courses.map((course)=>course.totalStudentsEnrolled),
                        backgroundColor:getRandomColors(courses.length),
                    }
                ] : [
                    {
                        data:courses.map((course)=>course.totalAmountGenerated),
                        backgroundColor:getRandomColors(courses.length),
                    }
                ]
            }
        })
        // return ()=>{
        //     if(chartInstance.current){
        //         chartInstance.current.destroy();
        //     }
        // }
    },[currChart])

    const getRandomColors=(numColors)=>{
        const colors=[];
        for(let i=0;i<numColors;i++){
            const color=`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
            colors.push(color);
        }
        return colors;
    }

    // const chartDataForStudents={
    //     labels:courses.map((course)=>course.courseName),
    //     datasets:[
    //         {
    //             data:courses.map((course)=>course.totalStudentsEnrolled),
    //             backgroundColor:getRandomColors(courses.length),
    //         }
    //     ]
    // }

    // const chartDataForIncome={
    //     labels:courses.map((course)=>course.courseName),
    //     datasets:[
    //         {
    //             data:courses.map((course)=>course.totalAmountGenerated),
    //             backgroundColor:getRandomColors(courses.length),
    //         }
    //     ]
    // }

    const options={

    }

    return(
        <div className='flex flex-col gap-5  w-[60%]'>
            <div className='flex flex-col items-start gap-5'>
            <p className='font-semibold text-2xl text-richblack-100'>Visulalize</p>
            <div className='flex flex-row gap-2 text-lg border rounded-lg border-yellow-50'>
                <button onClick={()=>setCurrChart('students')} className={`px-4 py-2  rounded-lg transition-all ${currChart==='students' ? 'bg-yellow-50 text-richblack-800' : null}`}>Student</button>
                <button onClick={()=>setCurrChart('income')} className= {`px-4 py-2  rounded-lg transition-all ${currChart==='income' ? 'bg-yellow-50 text-richblack-800' : null}`}>Income</button>
            </div>
            </div>

            <div className=' py-5'>
                {/* <Pie data={currChart === 'students' ? chartDataForStudents : chartDataForIncome} options={options}>

                </Pie> */}
                <canvas ref={chartRef} style={{width:'400px', height:'400px'}} />
            </div>

        </div>
    )
}

export default InstructorChart;