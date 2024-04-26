'use client'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger, } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useFormik } from 'formik'
import Cookies from "universal-cookie";
import { userShippingAddressIv } from '@/helper/intialValues'
import { shippingAddressValidation } from '@/helper/Validation'
import { addShippingAddressApiHandler } from '@/Service/UserProfile/UserProfile.service'
import { errorNotification, successNotification } from '@/helper/Notification'
import { getDetailsByPincode } from '@/helper'


const ShippingAddress = ({ callBackHandler }) => {
  const [open, setOpen] = useState(false);
  const cookies = new Cookies();
  const [loading, setLoading] = useState(false);
  const userDetails = cookies.get("USERDETAILS");
  
  const shippingAddressHandler = async() =>{
    try{
      setLoading(true);
      const payload ={
        ...formik.values,
        userId:userDetails?.id
      }
      const {data,count,message,success} = await addShippingAddressApiHandler(payload);
      if(success){
        successNotification(message);
        setOpen(false)
        callBackHandler();
      }else{
        errorNotification(message);
      }
    }catch(err){  
      console.error(err);
    }finally{
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: userShippingAddressIv,
    validationSchema: shippingAddressValidation,
    onSubmit: shippingAddressHandler,
  });

  useEffect(()=>{
    if (formik.values.pincode !== "" && formik.values.pincode.length == 6) {
      pinCodeResults(formik.values.pincode);
    } else {
      formik.setFieldValue("state", "");
      formik.setFieldValue("city", "");
    }
  },[formik.values.pincode]);

  const pinCodeResults = async (pincode) => {
    const response = await getDetailsByPincode(pincode);
    if (response.data.status == "OK") {
      const location = response.data.results[0].address_components;
      const l1 = response.data.results[0];
      formik.setFieldValue(
        "state",
        location.find((component) =>
          component.types.includes("administrative_area_level_1")
        ).long_name
      );
      formik.setFieldValue(
        "city",
        location.find((component) => component.types.includes("locality"))
          .long_name
      );
      formik.setFieldValue("addLet", l1.geometry.location.lat);
      formik.setFieldValue("addLong", l1.geometry.location.lng);
    } else {
      formik.setFieldValue("state", "");
      formik.setFieldValue("city", "");
      formik.setFieldValue("addLet", "");
      formik.setFieldValue("addLong", "");
      // formik.errors.pincode = "pincode is not a valid";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size='sm' className='sm:px-3 sm:py-2 px-2 py-[6px]'>Add Shipping Address</Button>
      </DialogTrigger>
      <DialogContent className='md:!max-w-[500px] w-full max-w-xs'>
        <div>
          <div className='flex items-center h-full'>
            <div className='w-full'>
              <div className='flex flex-col gap-5'>
                <div className='text-2xl font-bold'>Shipping Address</div>
                <div className="sm:p-5 p-3 grid grid-cols-2 sm:gap-5 gap-3">
                  <div className="col-span-2">
                    <Label htmlFor="">Full Name</Label>
                    <Input
                      placeholder=""
                      className="w-full"
                      name="fullName"
                      formik={formik}
                      max={30}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="">Line 1</Label>
                    <Input
                       placeholder=""
                       className="w-full"
                       name="address1"
                       max={100}
                       formik={formik}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="">Line 2 </Label>
                    <Input
                      placeholder=""
                      className="w-full"
                      name="address2"
                      formik={formik}
                      max={100}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="">Phone No </Label>
                    <Input
                      placeholder=""
                      className="w-full"
                      name="phoneNo"
                      formik={formik}
                      max={10}
                    />
                  </div>
                  <div>
                    <Label htmlFor="">landmark</Label>
                    <Input
                       placeholder=""
                       className="w-full"
                       name="landmark"
                       formik={formik}
                       max={50}
                    />
                  </div>
                  <div>
                    <Label htmlFor="">Pin Code</Label>
                    <Input
                      placeholder=""
                      className="w-full"
                      name="pincode"
                      formik={formik}
                      max={30}
                    />
                  </div>
                  <div>
                    <Label htmlFor="">State</Label>
                    <Input
                      placeholder=""
                      className="w-full"
                      name="state"
                      disabled={true}
                      formik={formik}
                      max={50}
                    />
                  </div>
                  <div>
                    <Label htmlFor="">City</Label>
                    <Input
                      placeholder=""
                      className="w-full"
                      name="city"
                      disabled={true}
                      formik={formik}
                      max={50}
                    />
                  </div>

                  <div className="col-span-2">
                    <Button
                      size="sm"
                      className="shadow-none"
                      loading={loading}
                      disabled={loading}
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
      </DialogContent>
    </Dialog>
  )
}

export default ShippingAddress

