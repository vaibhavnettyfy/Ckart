export const userRegisterIv={
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    mobileNo:"",
    addresses:[
        {
            address1:"",
            address2:"",
            landmark:"",
            state:"",
            city:"",
            pincode:"",
            isBillingAddress: 1,
            addLet:"",
            addLong:""
        },{
            address1:"",
            address2:"",
            landmark:"",
            state:"",
            city:"",
            pincode:"",
            isBillingAddress: 0,
            addLet:"1232224",
            addLong:"431232"
        }
    ]
};

export const loginWithPasswordIv={
    email : "",
    password:""
};   


export const LoginWithOtpIv = {
    email:"",
    otp:""
}

export const SendOtpIv ={
    email:""
}

export const forgotPasswordIv = {
    email:""
}

export const verifyForgotOtpIv = {
    email:"",
    otp:""
}

export const resetPasswordIv = {
    email:"",
    password:"",
    confirmPassword:""
}