import React from 'react'
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

  return (
    <Dialog>
      <DialogTrigger>{button}</DialogTrigger>
      <DialogContent className='max-w-[800px] p-0 !rounded-none'>
        <div >
          <div className='flex items-center h-full'>
            {/* <div className='w-1/2 h-full'>
              <Image src={'/SideBanner.svg'} alt='' width={500} height={600} className='h-full w-full object-cover' />
            </div> */}
            <div className='w-full p-7'>
              <div className='flex flex-col gap-5'>
                <div className='text-2xl font-bold'>Book an Appointment</div>
                <div className=''>
                  <Tabs defaultValue="tab1" className="">
                    <TabsList className='w-full bg-transparent border-b rounded-none'>
                      <TabsTrigger value="tab1" className='w-full'>Bulk Ordering</TabsTrigger>
                      <TabsTrigger value="tab2" className='w-full'>Expert Consultation</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1" className='p-0'>
                      <BulkOrder />
                    </TabsContent>
                    <TabsContent value="tab2" className='p-0'>
                      <Consultation />
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

