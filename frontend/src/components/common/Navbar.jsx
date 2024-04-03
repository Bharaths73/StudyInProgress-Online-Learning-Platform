import React, { useEffect, useState } from 'react'
import { Link, matchPath, useNavigate } from 'react-router-dom'
import logo from '../../assests/Logo/StudyInprogress.png'
import {NavbarLinks} from '../../data/navbar-links'
import {useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineShoppingCart } from "react-icons/md";
import { ProfileDropDown } from '../core/Auth/ProfileDropDown'
import { IoIosArrowDown } from "react-icons/io";
import { apiConnector } from '../../Services/ApiConnector'
import { categories } from '../../Services/Api'
import { logout } from '../../Services/operations/AuthApi'
import { HiBars3 } from "react-icons/hi2";


export const Navbar = () => {

    const {token}=useSelector((state)=>state.auth)
    const {user}=useSelector((state)=>state.profile)
    const {totalItems}=useSelector((state)=>state.cart)
    const [subLinks,setSubLinks]=useState([])
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const location=useLocation();
    const matchRoute=(route)=>{
        return matchPath({path:route},location.pathname)
    }

   

    const fetchSubLinks=async()=>{
        try{
            const result=await apiConnector("GET",categories.CATEGORIES_API)
            console.log("printing result ",result);
            const data=result.data.data;
            setSubLinks(data)
            console.log("catalog data is ",data);
        }
        catch(err){
            console.log("cloud not fetch the catalog list ",err);
        }
    }

   useEffect(()=>{
    fetchSubLinks()
   },[])

  return (
    <div className='flex lg:h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
            <Link to={'/'}>
                <img src={logo} className='h-10'/>
            </Link>
            <nav>
                <ul className='flex lg:flex-row gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map((e,index)=>(
                            (
                                <li key={index}>
                                    {
                                        e.title==='Catalog' ? 
                                        (
                                        <div className='relative flex items-center gap-1 group cursor-pointer'>
                                            <p>{e.title}</p>
                                            <IoIosArrowDown/>

                                            <div className='invisible absolute left-[50%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] translate-x-[-50%] translate-y-[20%] z-20 gap-y-3'>
                                                <div className='absolute left-[50%] top-0 h-3.5 w-6 rotate-45 rounded bg-richblack-5 translate-y-[-20%] translate-x-[70%] '></div>
                                                
                                                {
                                                   subLinks
                                                   ?.filter(
                                                     (subLink) => subLink?.course?.length > 0
                                                   ) ?.map((subLink, i) => (
                                                    <Link
                                                      to={`/catalog/${subLink.name
                                                        .split(" ")
                                                        .join("-")
                                                        .toLowerCase()}`}
                                                      className="rounded-lg bg-transparent py-3 px-4 border border-richblack-500 hover:bg-richblack-50 "
                                                      key={i}
                                                    >
                                                      <p>{subLink.name}</p>
                                                    </Link>
                                                  )) 
                                                }
                                            </div>
                                        </div>
                                        ):
                                        (
                                        <Link to={e?.path}>
                                            <p className={`${matchRoute(e?.path) ? 'text-yellow-25' : 'text-richblack-25'}`}>
                                                {e.title}
                                            </p>
                                        </Link>
                                            )
                                     }
                                </li>
                            )
                        ))
                    }
                </ul>
            </nav>

            <div className='flex gap-x-6 items-center'>
                {
                    user && user?.accountType!='Instructor' &&  (
                        <Link to={'/dashboard/cart'} className='relative text-white text-2xl'>
                            <MdOutlineShoppingCart className='relative'/>
                            {
                                totalItems > 0 && (
                                    <span className='absolute -top-2 left-3 z-40 text-sm text-yellow-25 bg-pink-300 rounded-full h-5 w-5 flex justify-center'>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }
                {
                    token==null && (
                        <Link to={'/login'}>
                          <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>Log in</button>
                        </Link>
                    )
                }
                {
                    token==null && (
                        <Link to={'/signUp'}>
                          <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>SignUp</button>
                        </Link>
                    )
                }
                {
                    token !== null && (
                        <div className='flex gap-x-6 justify-center items-center'>
                         <ProfileDropDown/>
                          {/* <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md' onClick={logoutHandler}>Log out</button> */}
                        </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}
