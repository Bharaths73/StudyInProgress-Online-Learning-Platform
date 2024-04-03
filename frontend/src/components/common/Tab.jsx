import React from 'react'

export const Tab = ({tabData,accountType,setAccountType}) => {
  return (
    <div>
        <div className='flex gap-2 bg-richblack-700 w-56 border rounded-md border-richblack-700 justify-center py-1 mt-7'>
            {
                tabData.map((tab,index)=>(
                    (
                        <div className={`flex py-2 px-4 items-center font-semibold cursor-pointer  ${tab.type==accountType ? "bg-richblack-900 border border-richblack-900 rounded-lg" : ""}`} key={index} onClick={()=>setAccountType(tab.type)}>{tab.tabName}</div>
                    )
                ))
            }
        </div>
    </div>
  )
}
