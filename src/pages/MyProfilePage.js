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
  deleteShippingAddressApiHandler,
  userProfileApiHandler,
} from "@/Service/UserProfile/UserProfile.service";
import { useFormik } from "formik";
import { basicUserDetails } from "@/helper/intialValues";
import { errorNotification, successNotification } from "@/helper/Notification";
import { basicUserDetailsValidation } from "@/helper/Validation";
import UserBillingAddress from "./UserBillingAddress";
import UserShippingAddress from "./UserShippingAddress";

export default function AboutPage() {
  const cookies = new Cookies();
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileDetails, setProfileDetails] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");
  const [billingAddress, setBillingAddress] = useState([]);
  const [shippingAddress, setShippingAddress] = useState([]);
  const [file, setFile] = useState("");

  const userDetails = cookies.get("USERDETAILS");

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

  const deleteAdressHandler = async(id) =>{
    try{
      const {data,message,success} = await deleteShippingAddressApiHandler(id);
      if(success){
        successNotification(message);
        getProfileUpdateHandler(userDetails.id);
      }else{
        errorNotification(message);
      }
    }catch(err){
      console.error(err);
    }
  };

  const profileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        errorNotification("File size exceeds 2MB. Please select a smaller file.");
      } else {
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
        if (allowedTypes.indexOf(file.type) === -1) {
          errorNotification("Invalid file type. Please select a valid image file.");
        } else {
          setProfilePicture(file);
          setFile(URL.createObjectURL(e.target.files[0]));
        }
      }
    } else {
      errorNotification("No file selected")
    }
  };

  const getProfileUpdateHandler = async (id) => {
    try {
      setProfileLoading(true);
      const { count, data, message, success } = await userProfileApiHandler(id);
      const isBillingAddress =
        data.userAddress &&
        data.userAddress.filter((res) => res.isBillingAddress === 1);
      const isShippingAddress =
        data.userAddress &&
        data.userAddress.filter((res) => res.isBillingAddress === 0);
      if (isBillingAddress) {
        setBillingAddress(isBillingAddress);
      }
      if (isShippingAddress) {
        setShippingAddress(isShippingAddress);
      }
      setFile(data.profile);
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

  console.log("Value", formik.values);

  console.log("errr", formik.errors);

  return (
    <div className="lg:my-20 md:my-16 sm:my-10 my-6">
      <div className="container px-3 sm:px-6">
        <div className="flex flex-col gap-5 max-w-[1000px] m-auto">
          <div>
            <div className="border rounded-lg">
              <div className="font-semibold py-2 px-3 border-b">
                Account Setting
              </div>
              <div className="sm:p-5 p-3">
                <div className="flex md:flex-nowrap flex-wrap sm:gap-8 gap-4">
                  <div className="flex flex-col items-center">
                    <Image
                      alt=""
                      src={file ? file : "/Avatar.svg"}
                      width={144}
                      height={144}
                      className="rounded-full object-cover !w-36 !h-36"
                    />
                    <Input
                      type="file"
                      accept=".jpg, .jpeg, .png, .gif"
                      onChange={profileHandler}
                      className="w-full mt-2"
                      name="profile"
                    />
                    {formik.touched.profile && formik.errors.profile ? (
                      <span className="text-red-500 text-xs">
                        {formik.errors.profile}
                      </span>
                    ) : null}
                  </div>
                  <div className="grid grid-cols-2 sm:gap-5 gap-3 w-full">
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
                    <div>
                      <Button
                        size="sm"
                        className="shadow-none"
                        onClick={() => formik.handleSubmit()}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 sm:gap-5 gap-3">
            {billingAddress && billingAddress.length > 0 ? (
              billingAddress.map((response, index) => {
                return <UserBillingAddress addressDetails={response} />;
              })
            ) : (
              <h1> no address Found</h1>
            )}

            {shippingAddress && shippingAddress.length > 0 ? (
              shippingAddress.map((res, index) => {
                return <UserShippingAddress addressDetails={res} deleteAddresshandler={deleteAdressHandler}/>;
              })
            ) : (
              <h1> no address Found</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
