"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { bulkOrderIv } from "@/helper/intialValues";
import {
  availableSlotsByDateApiHandler,
  bookAppointmentApiHandler,
} from "@/Service/BookAppointment/BookAppointment.service";
import { errorNotification, successNotification } from "@/helper/Notification";
import { getAllCategoryApiList } from "@/Service/Category/Category.service";
import { Item } from "@radix-ui/react-dropdown-menu";
import { projectTyesData } from "@/helper";
import Cookies from "universal-cookie";
import { bulkOrderValidation } from "@/helper/Validation";

const BulkOrder = () => {
  const cookies = new Cookies();
  const [loading, setLoading] = useState(false);
  const [categoryLoader, setCategoryLoader] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [availableSlotData, setAvailableSlotData] = useState([]);
  const [selectedSlotData, setSelectedSlotData] = useState("");
  const [skuValue, setSkuValues] = useState("");
  const [skuValueData, setSkuValueData] = useState([]);
  const userDetails = cookies.get("USERDETAILS");

  useEffect(() => {
    getAllCategoryList();
  }, []);

  const availableSlotHandler = (selectedSlot, selectedTime) => {
    setSelectedSlotData(selectedSlot);
    formik.setFieldValue("time", selectedTime);
  };

  const availableSlotsByDate = async (date) => {
    const payload = {
      date: date,
    };
    const { count, data, message, success } =
      await availableSlotsByDateApiHandler(payload);
    if (success) {
      setAvailableSlotData(data);
    } else {
      setAvailableSlotData([]);
    }
  };

  const getAllCategoryList = async () => {
    const { data, message, success, count } = await getAllCategoryApiList();
    setCategoryLoader(true);
    try {
      if (success) {
        setCategoryList(data);
      } else {
        setCategoryList([]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setCategoryLoader(false);
    }
  };

  const bulkOrderHandler = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("fullName", formik.values.fullName);
      formData.append("phoneNo", formik.values.phoneNo);
      formData.append("email", formik.values.email);
      formData.append("companyName", formik.values.companyName);
      formData.append("position", formik.values.position);
      formData.append("productCategory", formik.values.productCategory);
      formData.append("estimatedQuantity", formik.values.estimatedQuantity);
      formData.append("skus", formik.values.skus);
      formData.append("projectType", formik.values.projectType);
      formData.append("deliveryPinCode", formik.values.deliveryPinCode);
      formData.append("expeditedShipping", formik.values.expeditedShipping);
      formData.append("brandPreference", formik.values.brandPreference);
      formData.append("deliveryTimeline", formik.values.deliveryTimeline);
      formData.append("indicativeBudget", formik.values.indicativeBudget);
      formData.append(
        "notificationPreference",
        formik.values.notificationPreference
      );
      formData.append("date", formik.values.date);
      formData.append("type", 1);
      formData.append("time", formik.values.time);
      formData.append("userId", userDetails?.id ? userDetails?.id : null);
      formData.append("questionsComments", formik.values.questionsComments);
      const { count, data, message, success } = await bookAppointmentApiHandler(
        formData
      );
      if (success) {
        successNotification(message);
      } else {
        errorNotification(message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: bulkOrderIv,
    validationSchema: bulkOrderValidation,
    onSubmit: bulkOrderHandler,
  });

  const skuHandler = (value) => {
    setSkuValues(value);
  };

  const skuKeyHandler = (event) => {
    console.log("-----------skuValue", skuValue);
    if (event.keyCode === 13 && skuValue.trim() !== "") {
      setSkuValueData([skuValue, ...skuValueData]);
      setSkuValues("");
      formik.setFieldValue("skus", [skuValue, ...skuValueData]);
    }
  };

 
  const dateHandler = (value) => {
    const data = new Date(value);
    const formateData = data.toISOString();
    formik.setFieldValue("date", formateData);
    availableSlotsByDate(formateData);
  };

  return (
    <div className="max-h-[500px] overflow-y-auto px-2">
      <div className="grid grid-cols-3 gap-3 py-5">
        <div>
          <Label htmlFor="">Full Name</Label>
          <Input className="block" name="fullName" formik={formik} max={100} />
        </div>
        <div>
          <Label htmlFor="">Phone Number</Label>
          <Input className="block" name="phoneNo" formik={formik} max={10} />
        </div>
        <div>
          <Label htmlFor="">Email Address</Label>
          <Input
            type="email"
            className="block"
            name="email"
            formik={formik}
            max={100}
          />
        </div>
        <div>
          <Label htmlFor="">Company Name</Label>
          <Input
            className="block"
            name="companyName"
            formik={formik}
            max={100}
          />
        </div>
        <div>
          <Label htmlFor="">Position within the Company</Label>
          <Input className="block" name="position" formik={formik} max={100} />
        </div>
        <div>
          <Label htmlFor="">Product Category(s) of Interest</Label>
          <Select
            onValueChange={(event) =>
              formik.setFieldValue("productCategory", event)
            }
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Sub Categories" />
            </SelectTrigger>
            <SelectContent>
              {categoryList && categoryList.length > 0 ? (
                categoryList.map((Item, index) => {
                  return (
                    <SelectItem key={index} value={Item.id}>
                      {Item.name}
                    </SelectItem>
                  );
                })
              ) : (
                <div className="text-[#5D5F5F] text-center">
                  No Category Found
                </div>
              )}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="">Estimated Quantity of Materials</Label>
          <Input
            type="number"
            className="block"
            name="estimatedQuantity"
            formik={formik}
            max={10}
          />
        </div>

        <div className="col-span-3">
          <Label htmlFor="">Specific SKUs (if known)</Label>
          {skuValueData && skuValueData.length > 0 ? (
            skuValueData.map((item, index) => {
              return (
                <div>
                  <h5> {item}, </h5>{" "}
                </div>
              );
            })
          ) : (
            <div className="text-[#5D5F5F] text-center">No SKU Found</div>
          )}
          <Input
            className="block"
            name="skus"
            value={skuValue}
            onChange={(event) => skuHandler(event.target.value)}
            onKeyDown={(event) => skuKeyHandler(event)}
            max={250}
          />
        </div>
        <div>
          <Label htmlFor="">Project Type</Label>
          <Select
            onValueChange={(event) =>
              formik.setFieldValue("projectType", event)
            }
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Project Type" />
            </SelectTrigger>
            <SelectContent>
              {projectTyesData && projectTyesData.length > 0 ? (
                projectTyesData.map((item, index) => {
                  return (
                    <SelectItem key={index} value={item.value}>
                      {item.label}
                    </SelectItem>
                  );
                })
              ) : (
                <div className="text-[#5D5F5F] text-center">
                  No projectTyesData Found
                </div>
              )}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="">Delivery PIN Code</Label>
          <Input
            className="block"
            name="deliveryPinCode"
            formik={formik}
            max={250}
          />
        </div>
        <div>
          <Label htmlFor="">Expedited Shipping</Label>
          <RadioGroup
            defaultValue=""
            className="flex h-9 items-center"
            onValueChange={(event) =>
              formik.setFieldValue("expeditedShipping", event)
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="1" value={1} />
              <Label className="text-[#475156]" htmlFor="1">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={0} id="2" />
              <Label className="text-[#475156]" htmlFor="2">
                No
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label htmlFor="">Specific Brand Preference</Label>
          <Input
            className="block"
            name="brandPreference"
            formik={formik}
            max={100}
          />
        </div>
        <div>
          <Label htmlFor="">Delivery Timeline</Label>
          <Input
            type="date"
            className="block"
            name="deliveryTimeline"
            formik={formik}
            max={100}
          />
        </div>
        <div>
          <Label htmlFor="">Indicative Budget</Label>
          <Input
            type="number"
            className="block"
            name="indicativeBudget"
            formik={formik}
            max={250}
          />
        </div>
        <div>
          <Label htmlFor="">Notification Preferences</Label>
          <RadioGroup
            defaultValue=""
            className="flex h-9 items-center"
            onValueChange={(event) =>
              formik.setFieldValue("notificationPreference", event)
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={1} id="1" />
              <Label className="text-[#475156]" htmlFor="1">
                SMS
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={2} id="2" />
              <Label className="text-[#475156]" htmlFor="2">
                Email
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={3} id="3" />
              <Label className="text-[#475156]" htmlFor="3">
                None
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="col-span-3 grid grid-cols-3">
          <div className="col-span-1">
            <Label htmlFor="">Meeting Date</Label>
            <Input
              type="date"
              className="block"
              name="date"
              onChange={(event) => dateHandler(event.target.value)}
            />
            {formik.touched.date && formik.errors.date ? (
              <span className="text-red-500 text-xs">
                {formik.errors.date}
              </span>
            ) : null}
          </div>
        </div>
        <div className="col-span-3">
          <Label htmlFor="">Available slots</Label>
          <div className="flex gap-1 flex-wrap">
            {availableSlotData && availableSlotData.length > 0 ? (
              availableSlotData.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => availableSlotHandler(item.id, item.time)}
                    className="border rounded-md px-3 py-1 w-fit cursor-pointer"
                  >
                    <div className="text-sm font-semibold">{item.time}</div>
                    {/* <div className="text-xs text-[#5D5F5F]">{item.time}</div> */}
                  </div>
                );
              })
            ) : (
              <div className="text-[#5D5F5F] text-center">No slots Found</div>
            )}
          </div>
          {formik.touched.time && formik.errors.time ? (
              <span className="text-red-500 text-xs">
                {formik.errors.time}
              </span>
            ) : null}
        </div>
        <div className="col-span-3">
          <Label htmlFor="">Questions/Comments</Label>
          <Textarea
            placeholder="Enter your message here....."
            name="date"
            onChange={(event) =>
              formik.setFieldValue("questionsComments", event.target.value)
            }
            // formik={formik}
            max={2000}
          />
        </div>
        <div className="col-span-3">
          <div className="flex items-center space-x-2 col-span-2 mt-2">
            <Checkbox
              id="address"
              onCheckedChange={(event) =>
                formik.setFieldValue("termsConditions", event)
              }
            />
            <label
              htmlFor="address"
              className="text-sm font-medium leading-none text-[#475156] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Are you agree to Ckart <Link href={"/"}>Terms of Condition</Link>{" "}
              and <Link href={"/"}>Privacy Policy.</Link>
            </label>
          </div>
            {formik.touched.termsConditions && formik.errors.termsConditions ? (
              <span className="text-red-500 text-xs">
                {formik.errors.termsConditions}
              </span>
            ) : null}
        </div>
        <div>
          <Button
            className="w-full"
            size="lg"
            loading={loading}
            disabled={loading}
            onClick={() => formik.handleSubmit()}
          >
            Book appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkOrder;
