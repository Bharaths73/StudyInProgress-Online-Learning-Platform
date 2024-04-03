const mailSender=require("../utils/MailSender")
exports.Contact=async(req,res)=>{
     console.log(req.body);
    try{
        const {firstName,lastName,countryCode,email,message,phoeNo}=req.body;

        const response=await mailSender(email,"Message Sent","Thank you for contacting us")
        if(!response){
            return res.status(400).json({
                status:false,
                message:"could not able to send message"
            })
        }
        return  res.status(200).json({
            success:true,
            message:"message sent Successfully"
         })
    }
    catch(err){
        return res.status(500).json({
            success:fasle,
            message:"Something went wrong",
            err:err.message
         })
    }
}