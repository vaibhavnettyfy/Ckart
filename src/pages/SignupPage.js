"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormik } from "formik";
import { userRegisterIv } from "@/helper/intialValues";
import { userRegisterValidation } from "@/helper/Validation";
import { userRegisterApiHandler } from "@/Service/Users/Users.Service";
import { getDetailsByPincode } from "@/helper";
import { errorNotification, successNotification } from "@/helper/Notification";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  // for billing Address if city and State is available then disable
  const [stateCityFlag1, setstateCityFlag1] = useState(false);
  // for billing Address if city and State is available then disable
  const [stateCityFlag2, setstateCityFlag2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [termsConditionFlag, setTermsConditionFlag] = useState(false);
  const [termsConditionFlagError, setTermsConditionFlagError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const userDataHandler = async () => {
    try {
      setLoading(true);
      const formValues = {
        ...formik.values,
        // Stringify the addresses array Backend Requements
        addresses: JSON.stringify(formik.values.addresses),
      };
      const { data, message, success } = await userRegisterApiHandler(
        formValues
      );
      if (success) {
        successNotification(message);
        router.push("/login");
      } else {
        errorNotification(message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const termsConditionHandler = (event) => {
    setTermsConditionFlag(event);
    if(event){
      setTermsConditionFlagError("");
    }
  };

  const formik = useFormik({
    initialValues: userRegisterIv,
    validationSchema: userRegisterValidation,
    onSubmit: userDataHandler,
  });

  useEffect(() => {
    // This is funcation for get Details state and City using Pincode for Billing Address
    if (
      formik.values.addresses[0].pincode != "" &&
      formik.values.addresses[0].pincode.length === 6
    ) {
      pincodeResults(formik.values.addresses[0].pincode);
    } else {
      setstateCityFlag1(false);
      formik.setFieldValue("addresses[0].state", "");
      formik.setFieldValue("addresses[0].city", "");
      formik.setFieldValue("addresses[0].addLet", "");
      formik.setFieldValue("addresses[0].addLong", "");
    }
  }, [formik.values.addresses[0].pincode]);

  // This is funcation for get Details state and City using Pincode for Billing Address
  const pincodeResults = async (pincode) => {
    const response = await getDetailsByPincode(pincode);
    if (response.data.status == "OK") {
      const location = response.data.results[0].address_components;
      const l1 = response.data.results[0];
      setstateCityFlag1(true);
      formik.setFieldValue(
        "addresses[0].state",
        location.find((component) =>
          component.types.includes("administrative_area_level_1")
        ).long_name
      );
      formik.setFieldValue(
        "addresses[0].city",
        location.find((component) => component.types.includes("locality"))
          .long_name
      );
      formik.setFieldValue("addresses[0].addLet", l1.geometry.location.lat);
      formik.setFieldValue("addresses[0].addLong", l1.geometry.location.lng);
    } else {
      setstateCityFlag1(false);
      formik.setFieldValue("addresses[0].state", "");
      formik.setFieldValue("addresses[0].city", "");
      formik.setFieldValue("addresses[0].addLet", "");
      formik.setFieldValue("addresses[0].addLong", "");
    }
  };

  useEffect(() => {
    // / This is funcation for get Details state and City using Pincode for Shipping Address
    if (
      formik.values.addresses[1].pincode != "" &&
      formik.values.addresses[1].pincode.length === 6
    ) {
      pincodeShippingResults(formik.values.addresses[1].pincode);
    } else {
      setstateCityFlag2(false);
      formik.setFieldValue("addresses[1].state", "");
      formik.setFieldValue("addresses[1].city", "");
      formik.setFieldValue("addresses[1].addLet", "");
      formik.setFieldValue("addresses[1].addLong", "");
    }
  }, [formik.values.addresses[1].pincode]);

  // This is funcation for get Details state and City using Pincode for Shipping Address
  const pincodeShippingResults = async (pincode) => {
    const response = await getDetailsByPincode(pincode);
    if (response.data.status == "OK") {
      const location = response.data.results[0].address_components;
      const l1 = response.data.results[0];
      setstateCityFlag2(true);
      formik.setFieldValue(
        "addresses[1].state",
        location.find((component) =>
          component.types.includes("administrative_area_level_1")
        ).long_name
      );

      formik.setFieldValue(
        "addresses[1].city",
        location.find((component) => component.types.includes("locality"))
          .long_name
      );
      formik.setFieldValue("addresses[1].addLet", l1.geometry.location.lat);
      formik.setFieldValue("addresses[1].addLong", l1.geometry.location.lng);
    } else {
      setstateCityFlag2(false);
      formik.setFieldValue("addresses[1].state", "");
      formik.setFieldValue("addresses[1].city", "");
      formik.setFieldValue("addresses[1].addLet", "");
      formik.setFieldValue("addresses[1].addLong", "");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-3/5">
        <Image
          src={"/LoginBanner.svg"}
          alt=""
          width={1000}
          height={2000}
          className="object-cover h-full w-full"
        />
      </div>
      <div className="w-2/5 overflow-auto">
        <div className="flex flex-col items-center h-auto max-w-[400px] m-auto !my-20">
          <div className="flex flex-col gap-5 w-full">
            <Link href="/">
              <Image
                src={"/logoBlack.png"}
                alt=""
                width={156}
                height={48}
                className="lg:w-[170px] md:w-[150px] sm:w-[110px] w-[100px] md:h-huto cursor-pointer"
              />
            </Link>
            <div className="mb-2">
              <div className="text-2xl font-bold mt-2 mb-1">
                Hello, My Friend!!!
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="">First Name</Label>
                <Input
                  placeholder="Enter First Name"
                  className="w-full"
                  name="firstName"
                  formik={formik}
                  max={30}
                />
              </div>
              <div>
                <Label htmlFor="">Last Name</Label>
                <Input
                  placeholder="Enter Last Name"
                  name="lastName"
                  formik={formik}
                  max={30}
                  className="w-full"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="">Email Address</Label>
                <Input
                  placeholder="Enter Email Address"
                  className="w-full"
                  name="email"
                  formik={formik}
                  max={100}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="">Mobile Number</Label>
                <Input
                  placeholder="Enter Mobile Number"
                  name="mobileNo"
                  formik={formik}
                  max={10}
                  className="w-full"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="">Pan Number</Label>
                <Input
                  placeholder="Enter Pan Number"
                  name="pancard"
                  formik={formik}
                  max={30}
                  className="w-full"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="">Gst Number</Label>
                <Input
                  placeholder="Enter Gst Number"
                  name="gstNo"
                  formik={formik}
                  max={30}
                  className="w-full"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="">Password</Label>
                <div className="relative">
                  <Input
                    placeholder="Enter a secure password (6-16 characters)"
                    name="password"
                    formik={formik}
                    max={50}
                    className="w-full"
                    type={showPassword ? "text" : "password"}
                  />
                  <div
                    className="absolute right-3 top-[10px] cursor-pointer"
                    onClick={handleShowPassword}
                  >
                    {!showPassword ? (
                      <Eye className="w-5 h-5" />
                    ) : (
                      <EyeOff className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-base font-bold col-span-2">
                Billing Address*
              </div>
              <div className="col-span-2">
                <Label htmlFor="">Line 1</Label>
                <Input
                  placeholder="Enter billing address"
                  className="w-full"
                  name="addresses[0].address1"
                  formik={formik}
                  max={100}
                />
                {formik.touched.addresses &&
                formik.errors.addresses &&
                formik.errors.addresses[0] &&
                formik.errors.addresses[0].address1 ? (
                  <span className="text-red-500 text-xs">
                    {formik.errors.addresses[0].address1}
                  </span>
                ) : null}
              </div>
              <div className="col-span-2">
                <Label htmlFor="">Line 2</Label>
                <Input
                  placeholder="Enter billing address"
                  className="w-full"
                  name="addresses[0].address2"
                  formik={formik}
                  max={100}
                />
                {formik.touched.addresses &&
                formik.errors.addresses &&
                formik.errors.addresses[0] &&
                formik.errors.addresses[0].address2 ? (
                  <span className="text-red-500 text-xs">
                    {formik.errors.addresses[0].address2}
                  </span>
                ) : null}
              </div>
              <div className="col-span-2">
                <Label htmlFor="">Landmark</Label>
                <Input
                  placeholder="Enter Landmark"
                  className="w-full"
                  name="addresses[0].landmark"
                  formik={formik}
                  max={50}
                />
                {formik.touched.addresses &&
                formik.errors.addresses &&
                formik.errors.addresses[0] &&
                formik.errors.addresses[0].landmark ? (
                  <span className="text-red-500 text-xs">
                    {formik.errors.addresses[0].landmark}
                  </span>
                ) : null}
              </div>
              <div className="col-span-2">
                <Label htmlFor="">Pincode</Label>
                <Input
                  placeholder="Enter Pincode"
                  className="w-full"
                  name="addresses[0].pincode"
                  formik={formik}
                  max={30}
                />
                {formik.touched.addresses &&
                formik.errors.addresses &&
                formik.errors.addresses[0] &&
                formik.errors.addresses[0].pincode ? (
                  <span className="text-red-500 text-xs">
                    {formik.errors.addresses[0].pincode}
                  </span>
                ) : null}
              </div>
              <div>
                <Label htmlFor="">City</Label>
                <Input
                  placeholder="Enter city name"
                  className="w-full"
                  name="addresses[0].city"
                  formik={formik}
                  disabled={stateCityFlag1}
                  max={50}
                />
                {formik.touched.addresses &&
                formik.errors.addresses &&
                formik.errors.addresses[0] &&
                formik.errors.addresses[0].city ? (
                  <span className="text-red-500 text-xs">
                    {formik.errors.addresses[0].city}
                  </span>
                ) : null}
              </div>
              <div>
                <Label htmlFor="">State</Label>
                <Input
                  placeholder="Enter state name"
                  className="w-full"
                  name="addresses[0].state"
                  formik={formik}
                  disabled={stateCityFlag1}
                  max={50}
                />
                {formik.touched.addresses &&
                formik.errors.addresses &&
                formik.errors.addresses[0] &&
                formik.errors.addresses[0].state ? (
                  <span className="text-red-500 text-xs">
                    {formik.errors.addresses[0].state}
                  </span>
                ) : null}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-base font-bold col-span-2">
                Shipping Address (Optional)*
              </div>
              <div className="col-span-2">
                <Label htmlFor="">Line 1</Label>
                <Input
                  placeholder="Enter billing address"
                  className="w-full"
                  name="addresses[1].address1"
                  formik={formik}
                  max={100}
                />
                {formik.touched.addresses &&
                formik.errors.addresses &&
                formik.errors.addresses[1] &&
                formik.errors.addresses[1].address1 ? (
                  <span className="text-red-500 text-xs">
                    {formik.errors.addresses[1].address1}
                  </span>
                ) : null}
              </div>
              <div className="col-span-2">
                <Label htmlFor="">Line 2</Label>
                <Input
                  placeholder="Enter billing address"
                  className="w-full"
                  name="addresses[1].address2"
                  formik={formik}
                  max={100}
                />
                {formik.touched.addresses &&
                formik.errors.addresses &&
                formik.errors.addresses[1] &&
                formik.errors.addresses[1].address2 ? (
                  <span className="text-red-500 text-xs">
                    {formik.errors.addresses[1].address2}
                  </span>
                ) : null}
              </div>
              <div className="col-span-2">
                <Label htmlFor="">Landmark</Label>
                <Input
                  placeholder="Enter Landmark"
                  className="w-full"
                  name="addresses[1].landmark"
                  formik={formik}
                  max={50}
                />
                {formik.touched.addresses &&
                formik.errors.addresses &&
                formik.errors.addresses[1] &&
                formik.errors.addresses[1].landmark ? (
                  <span className="text-red-500 text-xs">
                    {formik.errors.addresses[1].landmark}
                  </span>
                ) : null}
              </div>
              <div className="col-span-2">
                <Label htmlFor="">Pincode</Label>
                <Input
                  placeholder="Enter Pincode"
                  className="w-full"
                  name="addresses[1].pincode"
                  formik={formik}
                  max={30}
                />
                {formik.touched.addresses &&
                formik.errors.addresses &&
                formik.errors.addresses[1] &&
                formik.errors.addresses[1].pincode ? (
                  <span className="text-red-500 text-xs">
                    {formik.errors.addresses[1].pincode}
                  </span>
                ) : null}
              </div>
              <div>
                <Label htmlFor="">City</Label>
                <Input
                  placeholder="Enter city name"
                  className="w-full"
                  name="addresses[1].city"
                  formik={formik}
                  disabled={stateCityFlag2}
                  max={50}
                />
                {formik.touched.addresses &&
                formik.errors.addresses &&
                formik.errors.addresses[1] &&
                formik.errors.addresses[1].city ? (
                  <span className="text-red-500 text-xs">
                    {formik.errors.addresses[1].city}
                  </span>
                ) : null}
              </div>
              <div>
                <Label htmlFor="">State</Label>
                <Input
                  placeholder="Enter state name"
                  className="w-full"
                  disabled={stateCityFlag2}
                  name="addresses[1].state"
                  formik={formik}
                  max={50}
                />
                {formik.touched.addresses &&
                formik.errors.addresses &&
                formik.errors.addresses[1] &&
                formik.errors.addresses[1].state ? (
                  <span className="text-red-500 text-xs">
                    {formik.errors.addresses[1].state}
                  </span>
                ) : null}
              </div>

              <div className="flex items-start space-x-2 col-span-2 mt-2">
                <Checkbox
                  id="address"
                  onCheckedChange={(event) => termsConditionHandler(event)}
                />
                
                <label
                  htmlFor="address"
                  className="text-sm font-medium leading-none text-[#475156] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Are you agree to Ckart{" "}
                  <Link href={"/signup"}>Terms of Condition</Link> and{" "}
                  <Link href={"/signup"}>Privacy Policy.</Link>
                </label>
              </div>
              {termsConditionFlagError && (
                  <span className="text-red-500 text-xs">
                    {termsConditionFlagError}
                  </span>
                )}
            </div>
            <div className="mt-2">
              <Button
                size="lg"
                className="w-full shadow-none"
                loading={loading}
                disabled={loading}
                onClick={() =>
                  termsConditionFlag
                    ? 
                    formik.handleSubmit()
                    : 
                    setTermsConditionFlagError(
                      "You must agree to the Terms & Conditions and Privacy Policy."
                    )
                }
              >
                <div className="flex gap-2 items-center">
                  <div>Sign in</div>
                  <Image
                    alt={""}
                    width={20}
                    height={20}
                    className="w-[18px] object-contain rounded-lg"
                    src={"/ArrowRight.svg"}
                  />
                </div>
              </Button>
            </div>
            <div className="text-center">
              Already a member? <Link href="/login">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
