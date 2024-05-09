"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";
import { useRouter } from "next/navigation";
import LoginWithPassword from "../components/Login/LoginWithPassword";
import LoginWithOtp from "../components/Login/LoginWithOtp";
export default function LoginPage() {
  const router = useRouter();
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
            <Link href={'/'}>
              <Image
                src={"/logoBlack.png"}
                alt=""
                width={156}
                height={48}
                className="lg:w-[170px] md:w-[150px] sm:w-[110px] w-[100px] md:h-huto cursor-pointer"
              />
            </Link>
            <div className="mb-2">
              <div className="sm:text-2xl text-xl font-bold mt-2">Welcome Back</div>
            </div>
          </div>
          <Tabs defaultValue="tab1" className="w-full mt-3">
            <TabsList className="w-full bg-transparent border-b rounded-none">
              <TabsTrigger value="tab1" className="w-full normal-case">
                Log in with Password
              </TabsTrigger>
              <TabsTrigger value="tab2" className="w-full normal-case">
                Log in with OTP
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="p-0 w-full">
              <LoginWithPassword />
            </TabsContent>
            <TabsContent value="tab2" className="p-0">
              <LoginWithOtp />
            </TabsContent>
          </Tabs>
          <div className="sm:text-base text-sm">
            New member? <Link href="/signup">Register Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
