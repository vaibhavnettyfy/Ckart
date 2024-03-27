"use client"
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Textarea } from "../ui/textarea";
import { Checkbox } from "@/components/ui/checkbox"

export default function CheckOut() {
  const router = useRouter()

  return (
    <div className="my-20">
      <div className="container px-3 sm:px-6">
        <div>
          <div>
            <div>
              <div className="text-2xl font-semibold mb-5">Billing Information</div>
            </div>
            <div className="grid grid-cols-6 gap-5 ">
              <div className="col-span-4 bill_info_area">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="">User name</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Input placeholder='First name' />
                      <Input placeholder='last name' />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="">Company Name <span className="text-[#929FA5]">(Optional)</span></Label>
                    <Input placeholder='' />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="">Address</Label>
                    <Input placeholder='' />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="">Country</Label>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="">Region/State</Label>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="">City</Label>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="">Zip Code</Label>
                      <Input placeholder='' />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="">Email</Label>
                    <Input placeholder='' />
                  </div>
                  <div>
                    <Label htmlFor="">Phone Number</Label>
                    <Input placeholder='' />
                  </div>

                  <div className="flex items-center space-x-2 col-span-2 mt-2">
                    <Checkbox id="address" />
                    <label
                      htmlFor="address"
                      className="text-sm font-medium leading-none text-[#475156] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Ship into different address
                    </label>
                  </div>

                  <div className="text-lg font-medium mt-3 col-span-2">Additional Information</div>
                  <div className="col-span-2">
                    <Label htmlFor="">Order Notes <span className="text-[#929FA5]">(Optional)</span></Label>
                    <Textarea placeholder='Notes about your order, e.g. special notes for delivery' />
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="border px-4 py-3">
                  <div className="flex flex-col gap-[6px]">
                    <div className="text-xl font-semibold mb-1">Order Summary</div>
                    <div className="grid gap-2 py-2 px-2">
                      <div className="flex gap-3 items-center">
                        <Image alt={''} width={80} height={80} className='w-[70px] object-contain' src={'/ProductImage.svg'} />
                        <div>
                          <div className="font-semibold mb-1">Tiscon Superlinks - 8mm</div>
                          <div className="text-sm text-[#5D5F5F]">1 x <span className="text-base text-primary-foreground font-semibold">₹750</span></div>
                        </div>
                      </div>
                      <div className="flex gap-3 items-center">
                        <Image alt={''} width={80} height={80} className='w-[70px] object-contain' src={'/ProductImage.svg'} />
                        <div>
                          <div className="font-semibold mb-1">Tiscon Superlinks - 8mm</div>
                          <div className="text-sm text-[#5D5F5F]">1 x <span className="text-base text-primary-foreground font-semibold">₹750</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-3">
                    <Separator />
                  </div>
                  <div className="flex flex-col gap-[6px] text-base">
                    <div className="flex justify-between">
                      <div className="font-normal text-[#5D5F5F]">Subtotal</div>
                      <div className="font-medium">₹1500.00</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-normal text-[#5D5F5F]">Shipping</div>
                      <div className="font-medium">Free</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-normal text-[#5D5F5F]">Discount</div>
                      <div className="font-medium">₹50</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-normal text-[#5D5F5F]">Tax</div>
                      <div className="font-medium">₹50</div>
                    </div>
                  </div>
                  <div className="py-5">
                    <Separator />
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-base">
                      <div className="font-normal text-[#5D5F5F]">Total</div>
                      <div className="font-semibold text-lg">₹1600.00</div>
                    </div>
                    <div className="mt-5">
                      <Button size='lg' onClick={() => router.push('/order-placed')} className='shadow-none w-full'>
                        <div className='flex gap-2 items-center'>
                          <div>Place Order</div>
                          <Image alt={''} width={20} height={20} className='w-[18px] object-contain rounded-lg' src={'/ArrowRight.svg'} />
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
