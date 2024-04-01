"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { loginWithPasswordIv } from "@/helper/intialValues";
import { LoginPasswordValidation } from "@/helper/Validation";
import { userLoginApiHandler } from "@/Service/Users/Users.Service";
import { errorNotification, successNotification } from "@/helper/Notification";
import Cookies from "universal-cookie";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function LoginWithPassword() {
  const cookies = new Cookies();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

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
          max={100}
        />
      </div>
      <div>
        <Label htmlFor="">Enter Password</Label>
        <div className="relative">
          <Input
            placeholder="Enter your password"
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
