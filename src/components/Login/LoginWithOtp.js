"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useState } from "react";
import { useFormik } from "formik";
import { errorNotification, successNotification } from "@/helper/Notification";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { LoginWithOtpIv, SendOtpIv } from "@/helper/intialValues";
import { LoginOtpValidation, SendOtpValidation } from "@/helper/Validation";
import {
  loginWithOtpApiHandler,
  sendOtpApiHandler,
} from "@/Service/Users/Users.Service";

function LoginWithOtp() {
  const router = useRouter();
  const [otpFlag, setOtpFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginWithOtpHandler = async () => {
    try {
      setLoading(true);
      const payload = {
        email: formik.values.email,
        otp: formik.values.otp
      }
      const { data, message, success } = await loginWithOtpApiHandler(
        payload
      );
      if (success) {
        successNotification(message);
        router.push("/");
        cookies.set("token", data.token);
        cookies.set("userEmail", data.email);
        cookies.set("userPassword", data.password);
        cookies.set("USERDETAILS", data);
      } else {
        errorNotification(message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const sendOtpHandler = async () => {
    try {
      setLoading(true);
      const payload = {
        email: formik.values.email
      }
      const { data, message, success } = await sendOtpApiHandler(payload);
      if (success) {
        successNotification(message);
        setOtpFlag(true);
      } else {
        errorNotification(message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: otpFlag ? LoginWithOtpIv : SendOtpIv,
    validationSchema: otpFlag ? LoginOtpValidation : SendOtpValidation,
    onSubmit: otpFlag ? loginWithOtpHandler : sendOtpHandler,
  });

  return (
    <div className="flex flex-col gap-4 py-5">
      <div>
        <Label htmlFor="">Enter Email</Label>
        <Input
          placeholder="ex: juqwlie@gmail.com"
          className="w-full"
          name="email"
          disabled={otpFlag}
          formik={formik}
          max={100}
        />
      </div>
      {otpFlag && (
        <div>
          <Label htmlFor="">Enter OTP</Label>
          <InputOTP
            maxLength={6}
            onChange={(event) => formik.setFieldValue("otp", event)}
            render={({ slots }) => (
              <InputOTPGroup className="gap-2">
                {slots.map((slot, index) => (
                  <React.Fragment key={index}>
                    <InputOTPSlot className="rounded-md border" {...slot} />
                    {index !== slots.length - 1 && <div> </div>}
                  </React.Fragment>
                ))}{" "}
              </InputOTPGroup>
            )}
          />
          <h4>{otpFlag && formik.errors.otp}</h4>
        </div>

      )}
      {otpFlag && (
        <div
          className="text-sm font-medium text-primary"
          onClick={() => sendOtpHandler()}
        >
          Resend OTP
        </div>
      )}
      <div className="mt-2">
        <Button
          size="lg"
          loading={loading}
          disabled={loading}
          className="w-full shadow-none"
          onClick={() => formik.handleSubmit()}
        >
          <div className="flex gap-2 items-center">
            <div> {otpFlag ? "sign in" : "Send Otp"}</div>
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
  );
}

export default LoginWithOtp;
