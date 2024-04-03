import React from 'react'
import {useSelector} from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/core/Dashboard/Sidebar'

export const Dashboard = () => {

    const {loading:authLoading}=useSelector((state)=>state.auth)
    const {loading:profileLoading}=useSelector((state)=>state.profile)

    if(profileLoading || authLoading){
        return(
            <div className='text-black'>Loading....</div>
        )
    }
  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
       <Sidebar/>
        <div className='h-[calc(100vh-3.5rem)] overflow-auto mx-auto w-full'>
            <div className='mx-auto w-[80%] py-10'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}
