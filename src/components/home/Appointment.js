import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import BookAppointment from '../common/modal/BookAppointment'

const Appointment = () => {
  return (
    <div>
      <div className='relative sm:my-0 my-10'>
        <div>
          <Image src={'/appointmentbanner.svg'} alt='' width={1900} height={400} className='sm:h-[400px] sm:block hidden object-cover' />
          <Image src={'/appointmentbannersm.svg'} alt='' width={1900} height={400} className=' h-[250px] sm:hidden block object-cover' />
        </div>
        <div className='absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center text-white px-3 sm:px-6'>
          <div className='xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-bold text-center'>Book a online appointment </div>
          <div className='md:text-lg sm:text-base text-sm max-w-[700px] text-center mt-3 sm:mb-7 mb-4'>Explore our vast selection at ‘The Creative Store’- your one-stop destination for all construction and building needs.</div>
          <div>
            <BookAppointment button={<Button variant='secondary' size='lg'>Book a appointment</Button>} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appointment