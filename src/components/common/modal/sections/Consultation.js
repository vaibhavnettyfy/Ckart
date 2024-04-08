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
import { consultationIv } from "@/helper/intialValues";
import { useFormik } from "formik";
import {
  availableSlotsByDateApiHandler,
  bookAppointmentApiHandler,
} from "@/Service/BookAppointment/BookAppointment.service";
import { errorNotification, successNotification } from "@/helper/Notification";
import { projectTyesData } from "@/helper";
import { subCategoryDropdown } from "@/Service/Category/Category.service";
import Cookies from "universal-cookie";
import { consultationValidation } from "@/helper/Validation";

const Consultation = () => {
  const cookies = new Cookies();
  const [loading, setLoading] = useState(false);
  const [subCateList, setSubCateList] = useState([]);
  const [availableSlotData, setAvailableSlotData] = useState([]);
  const [selectedSlotData, setSelectedSlotData] = useState("");
  const userDetails = cookies.get("USERDETAILS");

  useEffect(() => {
    subCategoreyApiDropDownHandler();
  }, []);

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

  const availableSlotHandler = (selectedSlot, selectedTime) => {
    setSelectedSlotData(selectedSlot);
    formik.setFieldValue("time", selectedTime);
  };

  const subCategoreyApiDropDownHandler = async () => {
    const { count, data, message, success } = await subCategoryDropdown();
    if (success) {
      setSubCateList(data);
    } else {
      setSubCateList([]);
    }
  };

  const dateHandler = (value) => {
    const data = new Date(value);
    const formateData = data.toISOString();
    formik.setFieldValue("date", formateData);
    availableSlotsByDate(formateData);
  };

  const userId = "";
  const consultationHandler = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("type", 2);
      formData.append("userId", userDetails?.id ? userDetails?.id : null);
      formData.append("fullName", formik.values.fullName);
      formData.append("phoneNo", formik.values.phoneNo);
      formData.append("email", formik.values.email);
      formData.append("projectType", formik.values.projectType);
      formData.append("scopeofConsultation", formik.values.scopeofConsultation);
      formData.append("previousExperience", formik.values.previousExperience);
      formData.append("materialType", formik.values.materialType);
      formData.append("sustainability", formik.values.sustainability);
      formData.append("architecturalPlans", formik.values.architecturalPlans);
      formData.append("indicativeBudget", formik.values.indicativeBudget);
      formData.append("financingNeeded", formik.values.financingNeeded);
      formData.append(
        "notificationPreference",
        formik.values.notificationPreference
      );
      formData.append("date", formik.values.date);
      formData.append("time", formik.values.time);
      formData.append("additionalnotes", formik.values.additionalnotes);

      const { count, data, message, success } =
        await bookAppointmentApiHandler(formData);
      if (success) {
        successNotification(message);
      } else {
        errorNotification(message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const planPictureHanlder = (event) => {
    console.log("evevnt", event);
    const file = event;
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        errorNotification(
          "File size exceeds 2MB. Please select a smaller file."
        );
      } else {
        const allowedTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/gif",
        ];
        if (allowedTypes.indexOf(file.type) === -1) {
          errorNotification(
            "Invalid file type. Please select a valid image file."
          );
        } else {
          formik.setFieldValue("architecturalPlans", file);
        }
      }
    } else {
      errorNotification("No file selected");
    }
  };

  const formik = useFormik({
    initialValues: consultationIv,
    validationSchema:consultationValidation,
    onSubmit: consultationHandler,
  });

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
          <Label htmlFor="">Scope of Consultation</Label>
          <Select
            onValueChange={(event) =>
              formik.setFieldValue("scopeofConsultation", event)
            }
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Scope of Consultation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Choosing the Right Construction Materials">
                Choosing the Right Construction Materials
              </SelectItem>
              <SelectItem value="Estimating Costs and Budget Management">
                Estimating Costs and Budget Management
              </SelectItem>
              <SelectItem value="Sustainable Building Material Options">
                Sustainable Building Material Options
              </SelectItem>
              <SelectItem value="Navigating Building Codes and Standards">
                Navigating Building Codes and Standards
              </SelectItem>
              <SelectItem value="Technical Aspects of Construction Materials">
                Technical Aspects of Construction Materials
              </SelectItem>
              <SelectItem value="Logistics of Material Delivery and Storage">
                Logistics of Material Delivery and Storage
              </SelectItem>
              <SelectItem value="Materials for Design and Aesthetic Goals">
                Materials for Design and Aesthetic Goals
              </SelectItem>
              <SelectItem value="Selecting and Negotiating with Suppliers">
                Selecting and Negotiating with Suppliers
              </SelectItem>
              <SelectItem value="Integrating Materials into Project Planning">
                Integrating Materials into Project Planning
              </SelectItem>
              <SelectItem value="Latest Trends in Construction Materials">
                Latest Trends in Construction Materials
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-3">
          <Label htmlFor="">
            Previous Experience with Construction Projects
          </Label>
          <RadioGroup defaultValue="" className="flex h-9 items-center" onValueChange={(event) =>
              formik.setFieldValue("previousExperience", event)
            }>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={1} id="1" />
              <Label className="text-[#475156]" htmlFor="1">
                None
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={2} id="2" />
              <Label className="text-[#475156]" htmlFor="2">
                Some
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={3} id="2" />
              <Label className="text-[#475156]" htmlFor="2">
                Extensive
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label htmlFor="">Type of Materials Interested In</Label>
          <Select
            onValueChange={(event) =>
              formik.setFieldValue("materialType", event)
            }
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Type of Materials Interested In" />
            </SelectTrigger>
            <SelectContent>
              {subCateList && subCateList.length > 0 ? (
                subCateList.map((item, index) => {
                  return (
                    <SelectItem key={index} value={item.id}>
                      {item.name}
                    </SelectItem>
                  );
                })
              ) : (
                <div className="text-[#5D5F5F] text-center">
                  No projectTyesData Found
                </div>
              )}
              <SelectItem value="1">Type 1</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="">Sustainability and Eco-friendliness </Label>
          <RadioGroup
            defaultValue=""
            className="flex h-9 items-center"
            onValueChange={(event) =>
              formik.setFieldValue("sustainability", event)
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={1} id="1" />
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
        <div className="col-span-1">
          <Label htmlFor="">Architectural Plans or Drawings</Label>
          <Input
            type="file"
            className="block"
            accept=".jpg, .jpeg, .png, .gif"
            onChange={(event) => planPictureHanlder(event.target.files[0])}
          />
        </div>
        <div className="col-span-1">
          <Label htmlFor="">Budget</Label>
          <Input
            className="block"
            name="indicativeBudget"
            formik={formik}
            max={100}
          />
        </div>
        <div>
          <Label htmlFor="">Financing Needs </Label>
          <RadioGroup
            defaultValue=""
            className="flex h-9 items-center"
            onValueChange={(event) =>
              formik.setFieldValue("financingNeeded", event)
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={1} id="1" />
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
              onChange={(event) => {
                dateHandler(event.target.value);
                // formik.setFieldValue("date", event.target.value)
              }}
            />
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
        </div>
        <div className="col-span-3">
          <Label htmlFor="">Additional Notes</Label>
          <Textarea
            placeholder="Enter your message here....."
            name="additionalnotes"
            formik={formik}
            onChange={(event) =>
              formik.setFieldValue("additionalnotes", event.target.value)
            }
            max={100}
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

export default Consultation;
