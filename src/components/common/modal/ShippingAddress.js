'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import Consultation from './sections/Consultation'
import Customer from './sections/Consultation'
import BulkOrder from './sections/BulkOrder'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useFormik } from 'formik'


const ShippingAddress = ({ button }) => {
  const [open, setOpen] = useState(false);

  const formik = useFormik({
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Add Shipping Address</DialogTrigger>
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
                      max={30}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="">Line 1</Label>
                    <Input
                      placeholder=""
                      className="w-full"
                      name="address2"
                      max={100}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="">Line 2 </Label>
                    <Input
                      placeholder=""
                      className="w-full"
                      name="address2"
                      max={100}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="">Phone No </Label>
                    <Input
                      placeholder=""
                      className="w-full"
                      name="phoneNo"
                      max={10}
                    />
                  </div>
                  <div>
                    <Label htmlFor="">landmark</Label>
                    <Input
                      placeholder=""
                      className="w-full"
                      name="landmark"
                      max={50}
                    />
                  </div>
                  <div>
                    <Label htmlFor="">Pin Code</Label>
                    <Input
                      placeholder=""
                      className="w-full"
                      name="pincode"
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
                      max={50}
                    />
                  </div>

                  <div className="col-span-2">
                    <Button
                      size="sm"
                      className="shadow-none"
                      onClick={() => setOpen(false)}
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

