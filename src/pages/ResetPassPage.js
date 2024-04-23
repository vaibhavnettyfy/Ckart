'use client'
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Cookies from "universal-cookie";
import { useFormik } from "formik";
import { resetPasswordIv } from "@/helper/intialValues";
import { resetPasswordValidation } from "@/helper/Validation";
import { resetPasswordApiHandler } from "@/Service/Users/Forgot.service";
import { errorNotification, successNotification } from "@/helper/Notification";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassPage() {
  const cookies = new Cookies();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const router = useRouter();
  const EmailAddress = cookies.get("forgotEmail") || cookies.get("userEmail");

  useEffect(() => {
    if (EmailAddress) {
      formik.setFieldValue("email", EmailAddress);
    }
  }, []);

  const handleSubmit = async () => {
    const payload = {
      email: EmailAddress,
      password: formik.values.password
    }
    const { data, message, success } = await resetPasswordApiHandler(payload);
    if (success) {
      successNotification(message);
      router.push(`/login`);
    } else {
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
      <div className="lg:w-3/5 hidden lg:block">
        <Image
          src={"/LoginBanner.svg"}
          alt=""
          width={1000}
          height={2000}
          className="object-cover h-full w-full"
        />
      </div>
      <div className="lg:w-2/5 w-full">
        <div className="flex flex-col items-center h-full max-w-[400px] m-auto justify-center p-5">
          <div className="flex flex-col sm:gap-5 gap-3 w-full">
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
              <div className="sm:text-2xl text-xl font-bold mt-2 mb-1">Reset Password</div>
              <div className="sm:text-base text-sm text-[#5F6C72]">Reset Your Password</div>
            </div>
            <div>
              <Label htmlFor="">Password</Label>
              <div className="relative">
                <Input
                  placeholder="Enter password"
                  className="w-full"
                  name="password"
                  formik={formik}
                  type={showPassword ? 'text' : 'password'}
                  max={50}
                />
                <div className="absolute right-3 top-[10px] cursor-pointer" onClick={handleShowPassword}>
                  {!showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="">Confirm Password</Label>
              <div className="relative">
                <Input
                  placeholder="Enter confirm password"
                  className="w-full"
                  name="confirmPassword"
                  formik={formik}
                  max={50}
                  type={showConfirmPassword ? 'text' : 'password'}
                />
                <div className="absolute right-3 top-[10px] cursor-pointer" onClick={handleShowConfirmPassword}>
                  {!showConfirmPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </div>
              </div>
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
                    className="sm:w-[18px] w-[14px] object-contain rounded-lg"
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