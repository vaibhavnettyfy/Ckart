"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useFormik } from "formik";
import { forgotPasswordIv, verifyForgotOtpIv } from "@/helper/intialValues";
import {
  forgotPasswordValidation,
  verfiyForgotOtpValidation,
} from "@/helper/Validation";
import { forgotPasswordApiHandler, verifyForgotOtpApiHandler } from "@/Service/Users/Forgot.service";
import { errorNotification, successNotification } from "@/helper/Notification";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Cookies from "universal-cookie";

export default function ForgotPassPage() {
  const cookies = new Cookies();
  const router = useRouter();
  const [otpFlag, setOtpFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  const forgotPasswordHandler = async () => {
    try {
      setLoading(true);
      const { data, message, success } = await forgotPasswordApiHandler(
        formik.values
      );
      if (success) {
        successNotification(message);
        setOtpFlag(true);

      } else {
        errorNotification(message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const verifyForgotOtpHandler = async () => {
    try {
      setLoading(true);
      const { data,message,success } = await verifyForgotOtpApiHandler(
        formik.values
      );
      if (success) {
        successNotification(message);
        cookies.set("forgotEmail", formik.values.email);
        router.push(`/reset-password`);
      } else {
        errorNotification(message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: otpFlag ? verifyForgotOtpIv : forgotPasswordIv,
    validationSchema: otpFlag
      ? verfiyForgotOtpValidation
      : forgotPasswordValidation,
    onSubmit: otpFlag ? verifyForgotOtpHandler : forgotPasswordHandler,
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
                Forgot Password
              </div>
              <div className="text-[#5F6C72]">
                Enter the email address associated with your Ckart account.
              </div>
            </div>
            <div>
              <Label htmlFor="">Enter Email</Label>
              <Input
                placeholder="ex: julie@gmail.com"
                className="w-full"
                name="email"
                max={100}
                formik={formik}
              />
            </div>
            {otpFlag && (
              <>
                <Label htmlFor="">Enter OTP</Label>
                <InputOTP
                  maxLength={6}
                  onChange={(event) => formik.setFieldValue("otp", event)}
                  render={({ slots }) => (
                    <InputOTPGroup className="gap-2">
                      {slots.map((slot, index) => (
                        <React.Fragment key={index}>
                          <InputOTPSlot
                            className="rounded-md border"
                            {...slot}
                          />
                          {index !== slots.length - 1 && <div> </div>}
                        </React.Fragment>
                      ))}{" "}
                    </InputOTPGroup>
                  )}
                />
                <span className="text-red-500 text-xs">
                  {otpFlag && formik.errors.otp}
                </span>
              </>
            )}
            <div className="mt-2">
              <Button
                size="lg"
                className="w-full shadow-none"
                loading={loading}
                disabled={loading}
                onClick={() => formik.handleSubmit()}
              >
                <div className="flex gap-2 items-center">
                  <div>{otpFlag ? "Rest Password" : "Send Code"}</div>
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
            <div className="flex flex-col gap-1">
              <div className="text-[#5F6C72]">
                Already have account? <Link href="/login">Sign In</Link>
              </div>
              <div className="text-[#5F6C72]">
                Don’t have account? <Link href="/signup">Sign Up</Link>
              </div>
            </div>
            <div className="pt-2 pb-1">
              <Separator />
            </div>
            <div className="text-[#5F6C72]">
              You may contact <Link href="/">Customer Service</Link> for help
              restoring access to your account.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
