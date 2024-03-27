import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const timePicList = ['1:00 to 2:00', '2:00 to 3:00', '3:00 to 4:00', '4:00 to 5:00']

const BookAppointment = ({ button }) => {
  return (
    <Dialog>
      <DialogTrigger>{button}</DialogTrigger>
      <DialogContent className='max-w-[800px] p-0 !rounded-none'>
        <div className=''>
          <div className='flex items-center'>
            <div className='w-1/2'>
              <Image src={'/SideBanner.svg'} alt='' width={500} height={600} className='h-auto w-full object-cover' />
            </div>
            <div className='w-1/2 p-7'>
              <div className='flex flex-col gap-5'>
                <div className='text-2xl font-bold'>Book an Appointment</div>
                <div>
                  <Tabs defaultValue="tab1" className="">
                    <TabsList className='w-full bg-transparent border-b rounded-none'>
                      <TabsTrigger value="tab1" className='w-full'>For consultation</TabsTrigger>
                      <TabsTrigger value="tab2" className='w-full'>For customer</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1" className='p-0'>
                      <div className='flex flex-col gap-3 py-5'>
                        <div>
                          <Label htmlFor="">Meeting Date</Label>
                          <Input type='date' className='block' />
                        </div>
                        <div>
                          <Label htmlFor="">Available slots</Label>
                          <div className='flex gap-1 flex-wrap'>
                            {timePicList.map((data, i) => {
                              return (
                                <div key={i} className='border rounded-md px-3 py-1 w-fit cursor-pointer'>
                                  <div className='text-sm font-semibold'>{data}</div>
                                  <div className='text-xs text-[#5D5F5F]'>1 hours</div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="">Message</Label>
                          <Textarea placeholder='Enter your message here.....' />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="tab2" className='p-0'>
                      <div className='flex flex-col gap-3 py-5'>
                        <div>
                          <Label htmlFor="">Meeting Date</Label>
                          <Input type='date' className='block' />
                        </div>
                        <div>
                          <Label htmlFor="">Available slots</Label>
                          <div className='flex gap-1 flex-wrap'>
                            {timePicList.map((data, i) => {
                              return (
                                <div key={i} className='border rounded-md px-3 py-1 w-fit cursor-pointer'>
                                  <div className='text-sm font-semibold'>{data}</div>
                                  <div className='text-xs text-[#5D5F5F]'>1 hours</div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="">Message</Label>
                          <Textarea placeholder='Enter your message here.....' />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                <div>
                  <Button className='w-full' size='lg'>Book appointment</Button>
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