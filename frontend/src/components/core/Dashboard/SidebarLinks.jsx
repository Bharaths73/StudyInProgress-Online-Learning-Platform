import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux'
import { matchPath, useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const SidebarLinks = ({link,iconName}) => {

    const Icon=Icons[iconName]
    const location=useLocation();
    const dispatch=useDispatch();
   
    const matchRoute=(route)=>{
        const myPath= matchPath({path:route},location.pathname)
        console.log("path match is ",myPath);
        return myPath
    }
  return (
    <NavLink to={link.path} className={`relative px-8 py-2 w-full
    font-medium ${matchRoute(link.path) ?  "bg-yellow-300" : "bg-opacity-0"}`}>
      <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}></span>

        <div className='flex gap-x-2 items-start'>
            <Icon className='text-lg'/>
            <span>{link.name}</span>
        </div>
        {
           console.log("outside link")
        }
    </NavLink>
  )
}

export default SidebarLinks;
