"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "universal-cookie";
import { useFormik } from "formik";
import { resetPasswordIv } from "@/helper/intialValues";
import { resetPasswordValidation } from "@/helper/Validation";
import { resetPasswordApiHandler } from "@/Service/Users/Forgot.service";
import { errorNotification, successNotification } from "@/helper/Notification";
export default function ResetPassPage() {
  const cookies = new Cookies();
  const router = useRouter();
  const EmailAddress = cookies.get("forgotEmail") || cookies.get("userEmail");

  useEffect(() => {
    if (EmailAddress) {
      formik.setFieldValue("email", EmailAddress);
    }
  }, []);

  const handleSubmit = async () => {
    const payload ={
      email : EmailAddress,
      password: formik.values.password
    }
    const {data,message,success} = await resetPasswordApiHandler(payload);
    if(success){
      successNotification(message);
      router.push(`/login`);
    }else{
      errorNotification(message);
    }
  };

  const formik = useFormik({
    initialValues: resetPasswordIv,
    validationSchema: resetPasswordValidation,
    onSubmit: handleSubmit,
  });

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
      <div className="w-2/5">
        <div className="flex flex-col items-center h-full max-w-[400px] m-auto justify-center">
          <div className="flex flex-col gap-5 w-full">
            <Image
              src={"/logoBlack.png"}
              alt=""
              width={156}
              height={48}
              className="lg:w-[170px] md:w-[150px] sm:w-[110px] w-[100px] md:h-huto cursor-pointer"
            />
            <div className="mb-2">
              <div className="text-2xl font-bold mt-2 mb-1">Reset Password</div>
              <div className="text-[#5F6C72]">Reset Your Password</div>
            </div>
            <div>
              <Label htmlFor="">Password</Label>
              <Input
                placeholder="Enter password"
                className="w-full"
                name="password"
                formik={formik}
                inputProps={{ maxLength: 50 }}
              />
            </div>
            <div>
              <Label htmlFor="">Confirm Password</Label>
              <Input
                placeholder="Enter confirm password"
                className="w-full"
                name="confirmPassword"
                formik={formik}
                inputProps={{ maxLength: 50 }}
              />
            </div>
            <div className="mt-2">
              <Button
                size="lg"
                className="w-full shadow-none"
                onClick={() => formik.handleSubmit()}
              >
                <div className="flex gap-2 items-center">
                  <div>Reset Password</div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
