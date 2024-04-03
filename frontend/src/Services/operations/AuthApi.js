import { apiConnector } from "../ApiConnector";
import { endPoints } from "../Api";
import { toast} from "react-hot-toast";
import { setLoading, setToken } from "../../Slices/AuthSlice";
import { setUser } from "../../Slices/ProfileSlice";
import { useSelector } from "react-redux";

export function loginAuth(email,password,navigate){
    return async(dispatch)=>{
        const toastId=toast.loading()
            try{
                console.log("email is ",email,password);
                const result=await apiConnector("POST",endPoints.LOGIN_API,{email,password})
                console.log("response is ",result);
                
                if(!result.data.success){
                    throw new Error(result.data.message)
                }
                toast.success("Login successfull")
                dispatch(setToken(result.data.token))

                const userImage=result.data?.user?.image ? result.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${result.data.user.firstName} ${result.data.user.lastName}`

                dispatch(setUser({ ...result.data.user, image: userImage }))

                localStorage.setItem("token", JSON.stringify(result.data.token))
                localStorage.setItem("user", JSON.stringify(result.data.user))
                navigate("/dashboard/my-profile")
            }
            catch(err){
                console.log("login error is ",err);
                toast.error("Login failed")
            }
            toast.dismiss(toastId)
    }
}

export const getPasswordResetToken=(email,setSentEmail)=>{
    return async (dispatch)=>{
        const toastId=toast.loading()
        dispatch(setLoading(true))
        try{
            const response=await apiConnector("POST",endPoints.RESETPASSWORD_API,{email})
            console.log("reset password response is ",response);

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Reset email sent")
            setSentEmail(true)
            
        }
        catch(err){
            console.log("reset password failed ",err);
            toast.error("Failed to send email")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export const resetPassword=(password,confirmPassword,token,navigate)=>{
    return async(dispatch)=>{
        const toastId=toast.loading()
        dispatch(setLoading(true))
        try{
            const response=await apiConnector("POST",endPoints.UPDATEPASSWORD_API,{password,confirmPassword,token})
            console.log("update password response is ",response);

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Updated password successfully")
            navigate("/login")
        }
        catch(err){
            console.log("reset password failed ",err);
            toast.error("Failed to update password")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export const sendOtp=(email,navigate)=>{
    return async(dispatch)=>{
        const toastId=toast.loading()
        dispatch(setLoading(true))
        try{
            const response=await apiConnector("POST",endPoints.SEND_OTP_API,{email})
            console.log("otp response is ",response);

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("OTP sent successfully")
            navigate("/verify-email")
        }
        catch(err){
            console.log("Failed to send otp ",err);
            toast.error("Failed to send otp")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export const signUp=(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate)=>{
    return async(dispatch)=>{
        const toastId=toast.loading()
        dispatch(setLoading(true))
        try{
            const response=await apiConnector("POST",endPoints.SIGN_UP_API,{accountType,firstName,lastName,email,password,confirmPassword,otp})

            console.log("signUp response is ",response);

            if(!response.data.success){
                throw new Error(response.data.message)
            }
          
            toast.success("SignUp successfull")
            navigate("/login")
        } 
        catch(err){
            console.log("signup failed ",err);
            toast.error("Failed to signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
    //   dispatch(resetCart())
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
  }
