import toast from "react-hot-toast";
import { apiConnector } from "../ApiConnector";
import { studentEndPoints } from "../Api";
import { MdDescription } from "react-icons/md";
import rzpLogo from '../../assests/Logo/rzp_logo.png'
import { setPaymentLoading } from "../../Slices/CourseSlice";
import { resetCart } from "../../Slices/CartSlice";
const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY;


function loadRazorPayscript(src){
    return new Promise((resolve)=>{
        const script=document.createElement('script');
        script.src=src;

        script.onload=()=>{
            resolve(true)
        }
        script.onerror=()=>{
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

//course buy

export async function buyCourse(courses,token,userDetails,navigate,dispatch){
    const toastId=toast.loading('Loading...')
    try {
        const res=await loadRazorPayscript("https://checkout.razorpay.com/v1/checkout.js")
        if(!res){
            toast.error("Razorpay sdk failed to load")
        }

        //initiate order
        const orderResponse=await apiConnector('POST',studentEndPoints.COURSE_PAYMENT_API,{courses},{Authorisation:`Bearer ${token}`})

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message)
        }

        const options={
            key:razorpayKey,
            currency:orderResponse.data.data.currency,
            amount:orderResponse.data.data.amount,
            order_id:orderResponse.data.data.id,
            name:"StudyProgress",
            description:"Thank you for purchasing the course",
            image:rzpLogo,
            prefill:{
                name:`${userDetails.firstName}`,
                email:`${userDetails.email}`
            },
            handler:function(response){
                sendPaymentSendEmail(response,orderResponse.data.data.amount,token)
                verifyPayment({...response,courses},token,navigate,dispatch)
            }
        }
        console.log("option is ",options);
        const paymentObject=new window.Razorpay(options)
        paymentObject.open()
        paymentObject.on("payment.failed",function(response){
            toast.error("oops, payment failed")
            console.log(response.error);
        })
    } 
    catch (error) {
        console.log(("error while payment ",error));
        toast.error("Failed to make payment")
    }
    toast.dismiss(toastId)
}

async function sendPaymentSendEmail(response,amount,token){
    try {
        const res=await apiConnector("POST",studentEndPoints.SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            amount
        },{
            Authorisation:`Bearer ${token}`
        })
    } catch (error) {
        console.log("Payment success email error ",error);
    }
}

async function verifyPayment(bodyData,token,navigate,dispatch){
    const toastId=toast.loading('Loading Payment...');
    dispatch(setPaymentLoading(true))
    try {
        console.log("frontend verify payment");
        const response=await apiConnector("POST",studentEndPoints.COURSE_VERIFY_API,bodyData,{Authorisation:`Bearer ${token}`})

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success('Payment successfull you are registered to the course')
        navigate('/dashboard/enrolled-courses');
        dispatch(resetCart())
    } 
    catch (error) {
        console.log("Payment verify error",error);
        toast.error("Could not verify payment")
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))
}

export async function publishRatingAndReview(data,token){
    const toastId=toast.loading('Sending review please wait')
    try {
        const response=await apiConnector("POST",studentEndPoints.SEND_RATING_REVIEW,data,{Authorisation:`Bearer ${token}`})

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        console.log("rating and review response is ",response);
    } catch (error) {
        console.log("failed to send rating and review ",error);
    }
    toast.dismiss(toastId)
}