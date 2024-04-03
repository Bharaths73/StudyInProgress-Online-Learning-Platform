import toast from "react-hot-toast"
import { apiConnector } from "../ApiConnector"
import { categoryPageEndPoints } from "../Api"

export const getCatalogPageData=async(categoryId)=>{
    let result=[]
    const toastId=toast.loading("Loading...")
    try {
        const response=await apiConnector('POST',categoryPageEndPoints.CATALOG_API,{categoryId})

        console.log("category page details ",response);
        if(!response.data.success){
            throw new Error(response.data.message)
        }

        result=response?.data?.data

    } catch (error) {
        console.log("failed to fetch category page details ",error);
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}