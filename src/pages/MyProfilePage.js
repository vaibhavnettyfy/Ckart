"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Cookies from "universal-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  basicDetailUpdateApiHandler,
  userProfileApiHandler,
} from "@/Service/UserProfile/UserProfile.service";
import { useFormik } from "formik";
import { basicUserDetails } from "@/helper/intialValues";
import { errorNotification, successNotification } from "@/helper/Notification";
import { basicUserDetailsValidation } from "@/helper/Validation";
import UserBillingAddress from "./UserBillingAddress";

export default function AboutPage() {
  const cookies = new Cookies();
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileDetails, setProfileDetails] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");
  const [billingAddress,setBillingAddress] = useState([]);
  const [shippingAddress,setShippingAddress] = useState([]);

  const userDetails = cookies.get("USERDETAILS");
  console.log("userDetails", userDetails);

  useEffect(() => {
    if (userDetails) {
      getProfileUpdateHandler(userDetails.id);
    }
  }, []);

  const basicDetailsHandler = async () => {
    const formData = new FormData();
    formData.append("profile", profilePicture);
    formData.append("firstName", formik.values.firstName);
    formData.append("lastName", formik.values.lastName);
    formData.append("mobileNo", formik.values.mobileNo);
    formData.append("pancard", formik.values.pancard);
    formData.append("gstNo", formik.values.gstNo);

    const { data, message, success, count } = await basicDetailUpdateApiHandler(
      userDetails.id,
      formData
    );
    if (success) {
      successNotification(message);
      getProfileUpdateHandler(userDetails.id);
    } else {
      errorNotification(message);
    }
  };

  const formik = useFormik({
    initialValues: basicUserDetails,
    validationSchema: basicUserDetailsValidation,
    onSubmit: basicDetailsHandler,
  });

  const getProfileUpdateHandler = async (id) => {
    try {
      setProfileLoading(true);
      const { count, data, message, success } = await userProfileApiHandler(id);
      console.log("dataaaa-", data);
      const isBillingAddress = data.userAddress && data.userAddress.filter((res)=> res.isBillingAddress ===1);
      const isShippingAddress = data.userAddress && data.userAddress.filter((res)=> res.isBillingAddress ===0);
      if(isBillingAddress){
        setBillingAddress(isBillingAddress);
      }
      console.log("isBillingAddress", isBillingAddress);
      console.log("isShippingAddress", isShippingAddress);

      setProfileDetails(data);
      formik.setValues({
        ...formik.values,
        profile: data.profile,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobileNo: data.mobileNo,
        pancard: data.pancard,
        gstNo: data.gstNo,
      });
    } catch (err) {
      console.error("error", err);
    } finally {
      setProfileDetails({});
      setProfileLoading(false);
    }
  };

  const billingAddressDataHandler = (data)=>{
    console.log("billing Data",data);
    formik.setValues({
      ...formik.values,
      address1: data.address1,
      address2: data.address2,
      landmark: data.landmark,
      state: data.state,
      city: data.city,
      pincode: data.pincode,
      isBillingAddress: data.isBillingAddress,
      addLet: data.addLet,
      addLong: data.addLong,
    })
  };

  return (
    <div className="my-20">
      <div className="container px-3 sm:px-6">
        <div className="flex flex-col gap-5 max-w-[1000px] m-auto">
          <div>
            <div className="border rounded-lg">
              <div className="font-semibold py-2 px-3 border-b">
                Account Setting
              </div>
              <div className="p-5">
                <div className="flex gap-8">
                  <div className="w-1/6">
                    <Image
                      alt=""
                      src={"/Avatar.svg"}
                      width={176}
                      height={176}
                    />
                  {formik.touched.profile && formik.errors.profile ? (
                    <span className="text-red-500 text-xs">
                      {formik.errors.profile}
                    </span>
                  ) : null}
                  </div>
                  <div className="grid grid-cols-2 gap-5 w-5/6">
                    {/* need to keep this commented */}
                    {/* <div>
                      <Label htmlFor="">Display name</Label>
                      <Input placeholder="" className="w-full" />
                    </div> */}
                    <div>
                      <Label htmlFor="">FirstName</Label>
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
                      <Input
                        placeholder=""
                        className="w-full"
                        name="lastName"
                        formik={formik}
                        max={30}
                      />
                    </div>
                    <div>
                      <Label htmlFor="">Email</Label>
                      <Input
                        placeholder=""
                        disabled={true}
                        className="w-full"
                        name="email"
                        formik={formik}
                        max={100}
                      />
                    </div>
                    <div>
                      <Label htmlFor="">Mobile Number</Label>
                      <Input
                        placeholder=""
                        className="w-full"
                        name="mobileNo"
                        formik={formik}
                        max={10}
                      />
                    </div>
                    <div>
                      <Label htmlFor="">Pan Number</Label>
                      <Input
                        placeholder=""
                        className="w-full"
                        name="pancard"
                        formik={formik}
                        max={30}
                      />
                    </div>
                    <div>
                      <Label htmlFor="">Gst Number</Label>
                      <Input
                        placeholder=""
                        className="w-full"
                        name="gstNo"
                        formik={formik}
                        max={30}
                      />
                    </div>
                    {/* need to keep this commented */}
                    {/* <div>
                      <Label htmlFor="">Secondary Email</Label>
                      <Input placeholder="" className="w-full" />
                    </div> */}

                    {/* need to keep this commented */}
                    {/* <div>
                      <Label htmlFor="">Country/Region</Label>
                      <Select className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="categories1">Country</SelectItem>
                        </SelectContent>
                      </Select>
                    </div> */}
                    {/* need to keep this commented */}
                    {/* <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="">States</Label>
                        <Select className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="categories1">State</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="">Zip Code</Label>
                        <Input placeholder="" className="w-full" />
                      </div>
                    </div> */}
                    <div>
                      <Button size="sm" className="shadow-none" onClick={()=>formik.handleSubmit()}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {
              billingAddress && billingAddress.length >0 ?
              billingAddress.map((response,index) =>{
                return <UserBillingAddress addressDetails={response}/>
              })
               : <h1> no address Found</h1>
            }
            <div className="border rounded-lg">
              <div className="font-semibold py-2 px-3 border-b">
                Shipping Address
              </div>
              <div className="p-5 grid grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="">First Name</Label>
                  <Input placeholder="" className="w-full" />
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
          </div>
        </div>
      </div>
    </div>
  );
}
