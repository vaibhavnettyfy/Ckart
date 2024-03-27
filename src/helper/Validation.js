import * as Yup from "yup";

export const userRegisterValidation = Yup.object({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  email: Yup.string()
    .trim()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email format"
    )
    .required("Email is required"),
  mobileNo: Yup.string()
    .trim()
    .matches(/^\d+$/, "Mobile number must contain only numbers")
    .length(10, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{6,16}$/,
      "Password must be 6-16 characters long and contain at least one number, one uppercase letter, one lowercase letter, and one special character (!@#$%^&*()-_=+{};:,<.>)."
    ),
  addresses: Yup.array().of(
    Yup.object().shape({
      address1: Yup.string()
        .trim()
        .when("isBillingAddress", (isBillingAddress, schema) => {
          return isBillingAddress[0] === 1
            ? schema.required("Address line 1 is required")
            : schema;
        }),
      address2: Yup.string()
        .trim()
        .when("isBillingAddress", (isBillingAddress, schema) => {
          return isBillingAddress[0] === 1
            ? schema.required("Address line 2 is required")
            : schema;
        }),
      landmark: Yup.string()
        .trim()
        .when("isBillingAddress", (isBillingAddress, schema) => {
          return isBillingAddress[0] === 1
            ? schema.required("Landmark is required")
            : schema;
        }),
      state: Yup.string()
        .trim()
        .when("isBillingAddress", (isBillingAddress, schema) => {
          return isBillingAddress[0] === 1
            ? schema.required("State is required")
            : schema;
        }),
      city: Yup.string()
        .trim()
        .when("isBillingAddress", (isBillingAddress, schema) => {
          return isBillingAddress[0] === 1
            ? schema.required("City is required")
            : schema;
        }),
      pincode: Yup.string()
        .trim()
        .when("isBillingAddress", (isBillingAddress, schema) => {
          return isBillingAddress[0] === 1
            ? schema
                .matches(/^\d{6}$/, "Invalid pincode format")
                .required("Pincode is required")
            : schema;
        }),
      isBillingAddress: Yup.number().required("isBillingAddress is required"),
    })
  ),
});

export const LoginPasswordValidation = Yup.object({
  email: Yup.string()
    .trim()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email format"
    )
    .required("Email is required"),
  password: Yup.string().trim().required("Password is required"),
});

export const LoginOtpValidation = Yup.object({
  email: Yup.string()
  .trim()
  .matches(
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    "Invalid email format"
  )
  .required("Email is required"),
  otp: Yup.string().trim().required("Otp is required"),
});


export const SendOtpValidation = Yup.object({
  email: Yup.string()
  .trim()
  .matches(
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    "Invalid email format"
  )
  .required("Email is required"),
});

export const forgotPasswordValidation = Yup.object({
  email: Yup.string()
    .trim()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email format"
    )
    .required("Email is required"),
});


export const verfiyForgotOtpValidation = Yup.object({
  email: Yup.string()
    .trim()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email format"
    )
    .required("Email is required"),
    otp : Yup.string().trim().required("Otp is required")
});

export const resetPasswordValidation = Yup.object({
  email: Yup.string()
    .trim()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email format"
    )
    .required("Email is required"),
  password: Yup.string().trim().required("Password is required"),
  confirmPassword: Yup.string()
   .trim()
   .required("Confirm password is required")
   .oneOf([Yup.ref("password"), null], "Passwords must match"),
})
