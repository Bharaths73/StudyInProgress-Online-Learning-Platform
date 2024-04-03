import { toast } from "react-hot-toast"
import { categories, courseEndPoints } from "../Api"
import { apiConnector } from "../ApiConnector"

export const fetchCourseCategories=async()=>{
    let data=[]
    try {
        const response=await apiConnector("GET",categories.CATEGORIES_API,null)
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        console.log("category array are ",response);
        data=response.data.data
    } catch (error) {
        console.log("unable to fetch categories ",error);
    }
    return data
}

export const addCourseDetails=async(formData,token)=>{
    const toastId=toast.loading('Loading...')
    try{
        const result=await apiConnector("POST",courseEndPoints.ADD_NEW_COURSE_API,formData,{Authorisation:`Bearer ${token}`})
        console.log("course result is ",result);

        if(!result.data.success){
            throw new Error(result.data.message)
        }
        toast.dismiss(toastId)
        return result.data.data
    }
    catch(err){
        console.log("error while creating course ",err);
    }
    toast.dismiss(toastId)
}

export const editCourseDetails=async(data,token)=>{
    const toastId=toast.loading("Loading...")
    try {
        const response=await apiConnector("POST",courseEndPoints.EDIT_COURSE_API,data,{Authorisation:`Bearer ${token}`})

        console.log("course result is ",response);

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.dismiss(toastId)
        return response.data.data
    
    } catch (error) {
        console.log("error while editing course ",error);
    }
    toast.dismiss(toastId)
}

export const createSection=async(data,token)=>{
    const {secName,courseId}=data
    const toastId=toast.loading('Loading...')
    try {
        const response=await apiConnector("POST",courseEndPoints.ADD_NEW_SECTION_API,{secName,courseId},{Authorisation:`Bearer ${token}`})

        console.log("response of add section is ",response);

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.dismiss(toastId)
        return response.data.data
    } catch (error) {
        console.log("failed to create section ",error);
    }
    toast.dismiss(toastId)
}

export const updateSection=async(data,token)=>{
    const {secName,sectionId,courseId}=data
    const toastId=toast.loading("Loading....")
    try {
        const response=await apiConnector('POST',courseEndPoints.UPDATE_SECTION_API,data,{Authorisation:`Bearer ${token}`})

        console.log("response of update section is ",response);

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.dismiss(toastId)
        return response.data.data

    } catch (error) {
         console.log("failed to update section ",error);
    }
    toast.dismiss(toastId)
}

export const deleteSection=async(data,token)=>{
    const toastId=toast.loading("Loading....")
    try {
        const response=await apiConnector("DELETE",courseEndPoints.DELETE_SECTION_API,data,{Authorisation:`Bearer ${token}`})

        console.log("section deleted ",response);

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        
        toast.dismiss(toastId)
        return response.data.data

    } catch (error) {
        console.log("failed to delete section ",error);
    }
    toast.dismiss(toastId)
}

export const createSubSection=async(formData,token)=>{
    console.log("formData is ",formData.secId);
    const toastId=toast.loading("Loading...")
    try {
        
        const response=await apiConnector("POST",courseEndPoints.ADD_NEW_SUB_SECTION_API,formData,{Authorisation:`Bearer ${token}`})

        console.log("subsection creation response is ",response);

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        console.log("subsection creation successfull ",response);
        toast.dismiss(toastId)
        return response.data.data

    } catch (error) {
        console.log("failed to create sub section",error);
    }
    toast.dismiss(toastId)
}

export const deleteSubSection=async(data,token)=>{
    const toastId=toast.loading("Loading...")
    try {
        const response=await apiConnector("DELETE",courseEndPoints.DELETE_SUB_SECTION_API,data,{Authorisation:`Bearer ${token}`})

        console.log("subsection creation response is ",response);

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        console.log("subsection deletion successfull ",response);
        toast.dismiss(toastId)
        return response.data.data

    } catch (error) {
        console.log("failed to delete subsection ",error);
    }
    toast.dismiss(toastId)
}

export const fetchInstructorCourses=async(token)=>{
    const toastId=toast.loading("Loading...")
    let result=[]
    try {
        const response=await apiConnector("GET",courseEndPoints.FETCH_INSTRUCTOR_COURSES,null,{Authorisation:`Bearer ${token}`})

        console.log("instructor courses are ",response);

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        result=response.data.data
    } catch (error) {
        console.log("failed to fetch instructor courses ",error);
    }
    
    toast.dismiss(toastId)
    return result
}

export const deleteCourse=async(courseId,token)=>{
    const toastId=toast.loading("Loading...")
    console.log("course id inside api is ",courseId);
    try {
        const response=await apiConnector("DELETE",courseEndPoints.DELETE_COURSE_API,{courseId},{Authorisation:`Bearer ${token}`})

        
        console.log("instructor courses are ",response);

        if(!response.data.success){
            throw new Error(response.data.message)
        }
    } catch (error) {
        console.log("failed to delete course ",error);
    }
    toast.dismiss(toastId)
}

export const fetchCoursesDetails=async(courseId,token)=>{
    const toastId=toast.loading("Loading...")
    console.log("course details id inside api is ",courseId);
    let result=[]
    try {
        const response=await apiConnector("POST",courseEndPoints.COURSE_DETAILS_API,{courseId},{Authorisation:`Bearer ${token}`})

        console.log(" course details are ",response);

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        result=response.data.data
    } catch (error) {
        console.log("failed to fetch course details ",error);
    }
    
    toast.dismiss(toastId)
    return result
}

