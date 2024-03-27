import { POST } from "../../../web.request";

// For user Registration
export const userRegisterApiHandler = (data) => {
  return POST(
    `${process.env.NEXT_PUBLIC_APIURL}/api/userV1/userRegister`,
    data
  );
};

// For User Login With Password
export const userLoginApiHandler = (data) => {
  return POST(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/userLogin`, data);
};

// Login With Otp 
export const loginWithOtpApiHandler = (data) => {
  return POST(
    `${process.env.NEXT_PUBLIC_APIURL}/api/userV1/verifyLoginOtp`,
    data
  );
};

// To send a request for Otp 
export const sendOtpApiHandler = (data) => {
  return POST(
    `${process.env.NEXT_PUBLIC_APIURL}/api/userV1/sendLoginOtp`,
    data
  );
};
