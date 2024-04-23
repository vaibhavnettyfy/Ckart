export const userRegisterIv = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNo: "",
    pancard: "",
    gstNo: "",
    addresses: [
        {
            address1: "",
            address2: "",
            landmark: "",
            state: "",
            city: "",
            pincode: "",
            isBillingAddress: 1,
            addLet: "",
            addLong: ""
        }, {
            address1: "",
            address2: "",
            landmark: "",
            state: "",
            city: "",
            pincode: "",
            isBillingAddress: 0,
            addLet: "",
            addLong: ""
        }
    ]
};

export const loginWithPasswordIv = {
    email: "",
    password: ""
};


export const LoginWithOtpIv = {
    email: "",
    otp: ""
}

export const SendOtpIv = {
    email: ""
}

export const forgotPasswordIv = {
    email: ""
}

export const verifyForgotOtpIv = {
    email: "",
    otp: ""
}

export const resetPasswordIv = {
    email: "",
    password: "",
    confirmPassword: ""
}

export const bookAppointmentIv = {
    date: "",
    time: "",
    userId: "",
    type: "",
    fullName: "",
    email: "",
    phoneNo: "",
    companyName: "",
    position: "",
    productCategory: "",
    estimatedQuantity: "",
    skus: "",
    projectType: "",
    deliveryPinCode: "",
    expeditedShipping: "",
    brandPreference: "",
    deliveryTimeline: "",
    questionsComments: "",
    indicativeBudget: "",
    termsOfServiceAgreed: "",
    notificationPreference: "",
    scopeofConsultation: "",
    previousExperience: "",
    materialType: "",
    architecturalPlans: "",
    estimatedBudget: "",
    financingNeeded: "",
    additionalnotes: ""
};

export const bulkOrderIv = {
    fullName: "",
    phoneNo: "",
    email: "",
    companyName: "",
    position: "",
    productCategory: "",
    estimatedQuantity: "",
    skus: [],
    projectType: "", 
    deliveryPinCode: "",
    expeditedShipping: "", 
    brandPreference: "",
    deliveryTimeline: "",
    indicativeBudget: "",
    notificationPreference: "", 
    date: "",
    time: "", 
    questionsComments: "",
    termsConditions: false,
};

export const consultationIv ={
    fullName: "",
    phoneNo: "",
    email: "",
    projectType: "", 
    scopeofConsultation: "", 
    previousExperience: "",  
    materialType:"",  
    sustainability:"", 
    architecturalPlans: "", 
    indicativeBudget: "", 
    financingNeeded: "", 
    notificationPreference: "", 
    date: "", 
    time: "", 
    additionalnotes: "", 
    termsConditions: false,
};

export const basicUserDetails ={
    profile : "",
    firstName:"",
    lastName:"",
    email:"",
    mobileNo:"",
    pancard:"",
    gstNo:"",
};

export const  userBillingAddressIv ={
    userId:"",
    fullName:"",
    address1: "",
    address2: "",
    phoneNo:"",
    landmark: "",
    state: "",
    city: "",
    pincode: "",
    isBillingAddress: 1,
    addLet: "",
    addLong: ""
};

export const  userShippingAddressIv ={
    userId:"",
    fullName:"",
    address1: "",
    address2: "",
    phoneNo:"",
    landmark: "",
    state: "",
    city: "",
    pincode: "",
    isBillingAddress: 1,
    addLet: "",
    addLong: ""
};

export const contactUsIv ={
    name : "",
    email : "",
    phoneNo:"",
    message : "",
    subject : "",
};

export const updateLocationIv = {
    pincode :"",
};