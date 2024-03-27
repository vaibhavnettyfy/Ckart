"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useFormik } from "formik";
import { loginWithPasswordIv } from "@/helper/intialValues";
import { LoginPasswordValidation } from "@/helper/Validation";
import { userLoginApiHandler } from "@/Service/Users/Users.Service";
import { errorNotification, successNotification } from "@/helper/Notification";
import Cookies from "universal-cookie";
import { useState } from "react";

function LoginWithPassword() {
  const router = useRouter();
  const cookies = new Cookies();
  const [loading, setLoading] = useState(false);

  const loginWithPasswordHandler = async () => {
    try {
      setLoading(true);
      const { data, message, success } = await userLoginApiHandler(
        formik.values
      );
      if (success) {
        successNotification(message);
        router.push("/");
        cookies.set("token", data.token);
        cookies.set("userEmail", data.email);
        cookies.set("userPassword", data.password);
      } else {
        errorNotification(message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // need to keep Code This i will use in Future
  const userEmail = cookies.get("userEmail");
  const userPassword = cookies.get("userPassword");
  
  const formik = useFormik({
    initialValues: loginWithPasswordIv,
    validationSchema: LoginPasswordValidation,
    onSubmit: loginWithPasswordHandler,
  });
  
  return (
    <div className="flex flex-col gap-4 py-5">
      <div>
        <Label htmlFor="">Enter Email</Label>
        <Input
          placeholder="ex: julie@gmail.com"
          className="w-full"
          name="email"
          formik={formik}
          inputProps={{ maxLength: 100 }}
        />
      </div>
      <div>
        <Label htmlFor="">Enter Password</Label>
        <Input
          placeholder="Enter your password"
          className="w-full"
          name="password"
          formik={formik}
          inputProps={{ maxLength: 50 }}
        />
      </div>
      <div className="text-sm font-medium">
        <Link href="/forgot-password">Forgot Password</Link>
      </div>
      <div className="mt-2">
        <Button
          size="lg"
          loading={loading}
          disabled={loading}
          className="w-full shadow-none"
          onClick={() => formik.handleSubmit()}
        >
          <div className="flex gap-2 items-center">
            <div>sign in</div>
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
  );
}

export default LoginWithPassword;
