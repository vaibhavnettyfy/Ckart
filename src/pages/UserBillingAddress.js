"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { userBillingAddressIv } from "@/helper/intialValues";

function UserBillingAddress({ addressDetails }) {
  console.log("inside", addressDetails);
  const {
    addLet,
    addLong,
    address1,
    address2,
    city,
    fullName,
    id,
    isBillingAddress,
    landmark,
    phoneNo,
    pincode,
    state,
    userId,
  } = addressDetails || {};

  const formik = useFormik({
    initialValues: userBillingAddressIv,
    // validationSchema: userBillingAddressIv,
    // onSubmit: (values) => {
    //   console.log("values", values);
    // },
  });

  return (
    <div className="border rounded-lg">
      <div className="font-semibold py-2 px-3 border-b">Billing Address</div>
      <div className="p-5 grid grid-cols-2 gap-5">
        <div>
          <Label htmlFor="">First Name</Label>
          <Input
            placeholder=""
            className="w-full"
            name="firstName"
            formik={formik}
            max={30}
          />
        </div>
        <div>
          <Label htmlFor="">Last Name</Label>
          <Input placeholder="" className="w-full" />
        </div>
        <div className="col-span-2">
          <Label htmlFor="">Company Name (Optional)</Label>
          <Input placeholder="" className="w-full" />
        </div>
        <div className="col-span-2">
          <Label htmlFor="">Address</Label>
          <Input placeholder="" className="w-full" />
        </div>
        <div>
          <Label htmlFor="">Country</Label>
          <Input placeholder="" className="w-full" />
        </div>
        <div>
          <Label htmlFor="">State</Label>
          <Input placeholder="" className="w-full" />
        </div>
        <div>
          <Label htmlFor="">City</Label>
          <Input placeholder="" className="w-full" />
        </div>
        <div>
          <Label htmlFor="">Zip Code</Label>
          <Input placeholder="" className="w-full" />
        </div>
        <div className="col-span-2">
          <Label htmlFor="">Email</Label>
          <Input placeholder="" className="w-full" />
        </div>
        <div className="col-span-2">
          <Label htmlFor="">Phone Number</Label>
          <Input placeholder="" className="w-full" />
        </div>
        <div className="col-span-2">
          <Button size="sm" className="shadow-none">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserBillingAddress;
