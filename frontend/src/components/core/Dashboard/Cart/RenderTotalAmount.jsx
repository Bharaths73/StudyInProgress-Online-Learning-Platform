import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "../../../common/IconButton";
import { buyCourse } from "../../../../Services/operations/StudentFeaturesApi";
import { useNavigate } from "react-router-dom";

export const RenderTotalAmount=()=>{
    const{total,cart}=useSelector((state)=>state.cart)
    const {user}=useSelector((state)=>state.profile)
    const {token}=useSelector((state)=>state.auth)
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const handleBuyCourse=()=>{
        const courses=cart.map((course)=>course._id);
        console.log("selected courses are ",courses);
        buyCourse(courses,token,user,navigate,dispatch)
    }

    return(
        <div className="flex flex-col bg-richblack-600 border border-richblack-600 rounded-md py-2 px-4 items-center justify-center gap-y-3 w-52">
            <p className="text-md text-richblack-200">Total:</p>
            <p className="text-xl text-yellow-50">Rs {total}</p>
            {/* <IconButton text="Buy Now" onClick={handleBuyCourse} customClasses={'w-full justify-center'}/> */}
            <button onClick={handleBuyCourse} className="w-full py-2 px-4 text-black bg-yellow-50 rounded-md">Buy Now</button>
        </div>
    )
}