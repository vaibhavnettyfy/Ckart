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
  gstNo: Yup.string()
    .test("required", "GST number is required", (value, context) => {
      if (!context.hasOwnProperty("required")) {
        return true;
      }
      return value.trim().length === 0 ? false : true; // Check for empty strings
    })
    .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, {
      message: "Invalid GST number format",
    }),
  pancard: Yup.string()
    .test("required", "PAN Number is required.", (value, context) => {
      if (!context.hasOwnProperty("required")) {
        return true;
      }
      return value.trim().length === 0 ? false : true; // Check for empty strings
    })
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "PAN Number is not valid."),
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

export const bulkOrderValidation = Yup.object({
  phoneNo: Yup.string()
    .trim()
    .matches(/^\d+$/, "Phone number must contain only numbers")
    .length(10, "Phone number must be 10 digits")
    .required("Phone number is required"),
  email: Yup.string()
    .trim()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email format"
    )
    .required("Email is required"),
  termsConditions: Yup.boolean()
    .oneOf([true], "Please accept the terms and conditions")
    .required("Terms and conditions must be accepted"),
  date: Yup.string().trim().required("Date is required"),
  indicativeBudget: Yup.string()
    .trim()
    .matches(/^\d+$/, "Budget number must contain only numbers")
    .required("Budget number is required"),
  time: Yup.string().trim().required("slot is required"),
});

export const consultationValidation = Yup.object({
  phoneNo: Yup.string()
    .trim()
    .matches(/^\d+$/, "Phone number must contain only numbers")
    .length(10, "Phone number must be 10 digits")
    .required("Phone number is required"),
  email: Yup.string()
    .trim()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email format"
    )
    .required("Email is required"),
  termsConditions: Yup.boolean()
    .oneOf([true], "Please accept the terms and conditions")
    .required("Terms and conditions must be accepted"),
  date: Yup.string().trim().required("Date is required"),
  indicativeBudget: Yup.string()
    .trim()
    .matches(/^\d+$/, "Budget number must contain only numbers")
    .required("Budget number is required"),
  time: Yup.string().trim().required("slot is required"),
});

export const basicUserDetailsValidation = Yup.object({
  firstName: Yup.string().trim().required("First name is required"),
  // profile: Yup.string().trim().required("profile is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  mobileNo: Yup.string()
    .trim()
    .matches(/^\d+$/, "Mobile number must contain only numbers")
    .length(10, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  gstNo: Yup.string()
    .test("required", "GST number is required", (value, context) => {
      if (!context.hasOwnProperty("required")) {
        return true;
      }
      return value.trim().length === 0 ? false : true; // Check for empty strings
    })
    .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, {
      message: "Invalid GST number format",
    }),
  pancard: Yup.string()
    .test("required", "PAN Number is required.", (value, context) => {
      if (!context.hasOwnProperty("required")) {
        return true;
      }
      return value.trim().length === 0 ? false : true; // Check for empty strings
    })
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "PAN Number is not valid."),
});
