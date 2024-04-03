// Import the required modules
const express = require("express")
const router = express.Router()

const{capturePayments,verifySignature, sendPaymentSuccessEmail}=require('../controllers/Payments')
const { auth, isInstructor, isStudent, isAdmin } = require('../middleware/auth');

router.post("/capturePayment", auth, isStudent,capturePayments);
router.post("/verifyPayment",auth, isStudent, verifySignature)
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = router;