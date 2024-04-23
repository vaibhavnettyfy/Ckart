import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { userShippingAddressIv } from "@/helper/intialValues";
import { shippingAddressValidation } from "@/helper/Validation";
import { getDetailsByPincode } from "@/helper";
import { basicDetailUpdateApiHandler, shippingAddressUpdateApiHandler } from "@/Service/UserProfile/UserProfile.service";
import { errorNotification, successNotification } from "@/helper/Notification";


function UserShippingAddress({ addressDetails }) {
  const [pincodeFlag, setPinCodeFlag] = useState(false);
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

  useEffect(() => {
    getShippingAddressHandler();
  }, []);

  const pinCodeResults = async (pincode) => {
    const response = await getDetailsByPincode(pincode);
    if (response.data.status == "OK") {
      const location = response.data.results[0].address_components;
      const l1 = response.data.results[0];
      setPinCodeFlag(true);
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
      setPinCodeFlag(true);
      formik.setFieldValue("state", "");
      formik.setFieldValue("city", "");
      formik.setFieldValue("addLet", "");
      formik.setFieldValue("addLong", "");
      // formik.errors.pincode = "pincode is not a valid";
    }
  };

  const userUpdateAddressHandler = async () => {
    const { data, message, success, count } = await shippingAddressUpdateApiHandler(id, formik.values);
    if (success) {
      successNotification(message);
    } else {
      errorNotification(message);
    }
  };



  const getShippingAddressHandler = () => {
    formik.setValues({
      userId: userId,
      fullName: fullName,
      phoneNo: phoneNo,
      address1: address1,
      address2: address2,
      landmark: landmark,
      state: state,
      city: city,
      pincode: pincode,
      isBillingAddress: isBillingAddress,
      addLet: addLet,
      addLong: addLong,
    });
  };

  const formik = useFormik({
    initialValues: userShippingAddressIv,
    validationSchema: shippingAddressValidation,
    onSubmit: userUpdateAddressHandler,
  });

  useEffect(() => {
    if (formik.values.pincode !== "" && formik.values.pincode.length == 6) {
      pinCodeResults(formik.values.pincode);
    } else {
      setPinCodeFlag(false);
      formik.setFieldValue("state", "");
      formik.setFieldValue("city", "");
      // formik.errors.pincode = "pincode is not a valid";
    }
  }, [formik.values.pincode]);

  return (
    <div className="border rounded-lg">
      <div className="font-semibold py-2 px-3 border-b">Shipping Address</div>
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
            onClick={() => formik.handleSubmit()}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UserShippingAddress
