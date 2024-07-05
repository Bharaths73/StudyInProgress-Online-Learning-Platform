import toast from "react-hot-toast"
import { endPoints, profileEndPoints } from "../Api"
import { apiConnector } from "../ApiConnector"
import { setUser } from "../../Slices/ProfileSlice"
import { useDispatch } from "react-redux"

export async function getUserEnrolledCourses(token){
        const toastId=toast.loading()
        let data=[]
        try{
            const result=await apiConnector("GET",profileEndPoints.ENROLLED_COURSES_API,null,{Authorisation:`Bearer ${token}`})
            
            if(!result.data.success){
                throw new Error(result.data.message)
            }
            data=result.data.data
            console.log("fetched user enrolled course successfully");
        }
        catch(err){
            console.log("failed to fetch enrolled courses ",err);
            toast.error("Failed to fetch enrolled courses")
        }
        toast.dismiss(toastId)
        return data
    }

    export function uploadFileToBackend(file,token){
       return async(dispatch)=>{
        const toastId=toast.loading()
        try{
            const response=await apiConnector("POST",profileEndPoints.UPADATE_PROFILE_PIC_API,file,{"Content-Type": "multipart/form-data",Authorisation:`Bearer ${token}`})

            console.log("update profile pic response is ",response);
            
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            // const userImage=response?.data?.data?.image 

            toast.success("Profile picture uploaded successfully")
            dispatch(setUser(response.data.data))
            localStorage.setItem('user',JSON.stringify(response.data.data))
            toast.dismiss(toastId)
           
        }
        catch(err){
            console.log("error while uploading file ",err);
            toast.error("Failed to upload profile picture")
        }
        toast.dismiss(toastId)
       }
    }

    export const updateUser=(formData,token)=>{
       
        return async(dispatch)=>{
            const toastId=toast.loading("Loading...")
            try {
                const response=await apiConnector("PUT",profileEndPoints.UPDATE_USER_API,formData,{Authorisation:`Bearer ${token}`})
    
                console.log("updated user details is ",response);
    
                if(!response.data.success){
                    throw new Error(response.data.message)
                }

                const userImage=response?.data?.data?.image ? response.data.data.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`

                dispatch(setUser({...response.data.data,image:userImage}))

                localStorage.setItem("user", JSON.stringify(response.data.data))
                toast.dismiss(toastId)

            } catch (error) {
                console.log("failed to update user details ",error);
            }
            toast.dismiss(toastId)
        }
       
    }

    export const changePassword=async(data,token)=>{
        const toastId=toast.loading('Loading...')
        try {
            const response=await apiConnector('POST',endPoints.CHANGE_PASSWORD,data,{
                Authorisation:`Bearer ${token}`
            })

            console.log("changed password details is  ",response);

                if(!response.data.success){
                    throw new Error(response.data.message)
                }
                toast.success("Password changed successfully")

        } catch (error) {
            console.log("failed to change password ",error);
        }
        toast.dismiss(toastId)
    }

export async function getInstructorData(token){
    const toast_id=toast.loading("Loading...");
    let result=[];
    try {
        const response=await apiConnector("GET",profileEndPoints.GET_INSTRUCTOR_DATA_API,null,{
            Authorisation:`Bearer ${token}`
        })
        console.log("get instructor api response ",response);
        result=response?.data?.data
        console.log("result is ",result);
    } catch (error) {
        console.log("get instructor api error ",error);
        toast.error("Failed to get instructor data");
    }
    toast.dismiss(toast_id);
    return result;
}