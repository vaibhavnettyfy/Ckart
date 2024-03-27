'use client'
import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { useRouter } from 'next/navigation'

const Selling = () => {
  const router = useRouter()

  return (
    <div className='lg:py-16 md:py-12 sm:py-8 py-5'>
      <div className='container px-3 sm:px-6'>
        <div className='flex md:flex-row flex-col xl:gap-20 lg:gap-14 md:gap-8 gap-5 items-center'>
          <div className='md:w-[50%]'>
            <Image alt={''} width={630} height={595} className='lg:w-[630px] md:w-[500px] w-[350px] object-contain rounded-lg relative md:right-0 right-8' src={'/selling/selling.svg'} />
          </div>
          <div className='xl:w-1/2 md:w-[50%]'>
            <div className='flex items-center md:justify-start justify-center sm:gap-3 gap-2 sm:mb-2 mb-1'>
              <div className="border border-primary-foreground sm:w-5 w-3"></div>
              <div className='font-semibold uppercase text-primary-foreground lg:text-base md:text-sm text-xs'>selling</div>
              <div className="border border-primary-foreground sm:w-5 w-3"></div>
            </div>
            <div className='xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-bold sm:mb-5 mb-3 md:text-start text-center'>We Sell Everything.</div>
            <div className='text-para xl:text-lg lg:text-base text-sm flex flex-col sm:gap-3 gap-2 md:text-start text-center md:max-w-[100%] max-w-[500px]'>
              <div>Explore our vast selection at ‘The Creative Store’- your one-stop destination for all construction and building needs. From the foundational bricks to the final touches of lighting, discover quality and variety like never before.</div>
              <div>Explore our vast selection at ‘The Creative Store’- your one-stop destination for all construction and building needs.</div>
              <div>From the foundational bricks to the final touches of lighting, discover quality and variety like never before.</div>
            </div>
            <div className='sm:mt-8 mt-5 sm:mb-5 mb-3'>
              <Separator />
            </div>
            <div className='md:text-start text-center'>
              <Button size={'lg'} onClick={() => router.push('/product')}>
                <div className='flex gap-2 items-center'>
                  <div>ALL PRODUCTS</div>
                  <Image alt={''} width={20} height={20} className='lg:w-6 md:w-5 w-4 object-contain rounded-lg' src={'/ArrowRight.svg'} />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Selling