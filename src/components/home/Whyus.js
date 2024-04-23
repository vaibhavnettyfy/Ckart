import React from 'react'
import Heading from '../common/Heading'
import Image from 'next/image'

const ourProcessList = [
  {
    image: '/whyus/service.png',
    name: 'Quality Assurance',
  },
  {
    image: '/whyus/jar.png',
    name: 'Savings',
  },
  {
    image: '/whyus/credit-card.png',
    name: 'Credit Facility',
  },
  {
    image: '/whyus/delivery.png',
    name: 'Real Time Tracking',
  },
  {
    image: '/whyus/tag.png',
    name: 'Top Brands',
  },
]

const Whyus = () => {
  return (
    <div className='z-20 relative md:py-16 sm:py-12 py-8'>
      <div className='container px-3 sm:px-6'>
        <Heading head={'Why us?'} para={'Delivering Reliability. Constructing Solutions'} />
      </div>
      <div className='pt-10 container px-3 sm:px-6'>
        <div className='grid md:grid-cols-5 grid-cols-2 gap-3'>
          {ourProcessList.map((data, i) => {
            const { name, image } = data;
            return (
              <div key={i} className='col-span-1 rounded-2xl sm:p-4 p-1 overflow-hidden'>
                <div className='text-center'>
                  <Image alt={''} width={64} height={64} className='sm:w-16 sm:h-16 h-12 w-10 object-contain rounded-lg m-auto' src={image} />
                  <div className='md:text-[22px] text-base font-semibold mt-3'>{name}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Whyus