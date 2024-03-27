import { POST, post } from "../../../web.request";


// For Sending otp For Forgot Password
export const forgotPasswordApiHandler = (data)=>{
    return post(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/sendForgotOtp`,data);
};  


// To verify that otp is correct or not While Forgot Password Flow 
export const verifyForgotOtpApiHandler = (data) =>{
    return post(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/verifyForgotOtp`,data);
};

// to set password
export const resetPasswordApiHandler = (data)=>{
    return POST(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/userForgotPassword`, data)
}