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


const BookAppointment = ({ button }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{button}</DialogTrigger>
      <DialogContent className='md:!max-w-[800px] w-full max-w-xs'>
        <div >
          <div className='flex items-center h-full'>
            <div className='w-full'>
              <div className='flex flex-col gap-5'>
                <div className='text-2xl font-bold'>Book an Appointment</div>
                <div className=''>
                  <Tabs defaultValue="tab1" className="">
                    <TabsList className='w-full bg-transparent border-b rounded-none'>
                      <TabsTrigger value="tab1" className='w-full sm:text-sm text-xs'>Bulk Ordering</TabsTrigger>
                      <TabsTrigger value="tab2" className='w-full sm:text-sm text-xs'>Expert Consultation</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1" className='p-0'>
                      <BulkOrder setOpen={setOpen} />
                    </TabsContent>
                    <TabsContent value="tab2" className='p-0'>
                      <Consultation setOpen={setOpen} />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BookAppointment

