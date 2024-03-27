import React from 'react'
import Heading from '../common/Heading'
import Image from 'next/image'

const ourProcessList = [
  {
    image: '/ourprocess/OurProcess1.svg',
    name: 'Lorem Ipsum',
    para: 'Lorem Ipsum is simply dummy text of the printing',
  },
  {
    image: '/ourprocess/OurProcess2.svg',
    name: 'Lorem Ipsum',
    para: 'Lorem Ipsum is simply dummy text of the printing',
  },
  {
    image: '/ourprocess/OurProcess3.svg',
    name: 'Lorem Ipsum',
    para: 'Lorem Ipsum is simply dummy text of the printing',
  },
  {
    image: '/ourprocess/OurProcess4.svg',
    name: 'Lorem Ipsum',
    para: 'Lorem Ipsum is simply dummy text of the printing',
  },
]

const OurProcess = () => {
  return (
    <div className='z-20 relative bg-bgsecondary md:py-16 sm:py-12 py-8 md:my-20 sm:my-14 my-8'>
      <div className='container px-3 sm:px-6'>
        <Heading head={'Our Process'} para={'Our Working Process'} />
      </div>
      <div className='pt-10 container px-3 sm:px-6'>
        <div className='grid md:grid-cols-4 grid-cols-2 gap-3'>
          {ourProcessList.map((data, i) => {
            const { name, image, para } = data;
            return (
              <div key={i} className='col-span-1 rounded-2xl sm:p-4 p-1 overflow-hidden'>
                <div className='text-center'>
                  <Image alt={''} width={64} height={64} className='sm:w-16 sm:h-16 h-12 w-10 object-contain rounded-lg m-auto' src={image} />
                  <div className='md:text-[22px] text-base font-semibold mt-2 mb-1'>{name}</div>
                  <div className='text-[#42545E] sm:text-sm text-xs max-w-[220px] m-auto'>{para}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default OurProcess