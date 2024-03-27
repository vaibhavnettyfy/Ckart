'use client'
import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useRouter } from 'next/navigation'

const imageList = [
  {
    img: '/home/HomeBanner.svg',
    alt: 'banner3',
  },
  {
    img: '/home/HomeBanner.svg',
    alt: 'banner3',
  },
  {
    img: '/home/HomeBanner.svg',
    alt: 'banner3',
  },
]

const Banner = () => {
  const router = useRouter();
  return (
    <>
      <div className='bg-white relative lg:mb-16 md:mb-12 sm:mb-10 mb-8 z-10'>
        {/* <div className='absolute right-0 top-[-145px] z-0'>
          <Image src={'/home/HomeRight.svg'} alt='' width={900} height={800} />
        </div> */}
        <div className='container px-0 sm:px-6 z-20 relative'>
          <Carousel opts={{ loop: true }} className='relative z-20'>
            <CarouselContent>
              {
                imageList.map((data, i) => {
                  return (
                    <CarouselItem key={i}>
                      <div key={i}>
                        <div className='flex lg:flex-row flex-col-reverse justify-between items-center lg:pt-12 lg:pb-16 md:py-12 sm:py-8 py-5 md:px-6 px-3 gap-5'>
                          <div className='lg:w-[52%]'>
                            <div className="flex items-center gap-1">
                              <div className="border border-primary-foreground sm:w-5 w-3"></div>
                              <div className='text-primary-foreground font-semibold lg:text-base md:text-sm text-xs'>Moving Service, since 1945.</div>
                            </div>
                            <div className='xl:text-[70px] lg:text-[55px] md:text-5xl sm:text-4xl text-[34px] font-extrabold !leading-tight md:mt-4 mt-2 sm:mb-5 mb-3'>
                              <div>Fast and best </div>
                              <div>Modern <span className='text-primary-foreground'>Bathroom</span> </div>
                              <div className='text-primary-foreground'>Fixtures</div>
                            </div>
                            <div className='text-para md:text-lg sm:text-base text-sm'>Transform your bathroom into a haven of elegance and functionality with our diverse range of premium bathroom fixtures, tailored to suit every style and need.</div>
                            <div className='flex gap-2 md:mt-10 sm:mt-7 mt-5'>
                              <Button onClick={() => router.push('/product')}>All Products</Button>
                              <Button variant="outline">Sub Categories</Button>
                            </div>
                          </div>
                          <Image alt={data.alt} width={550} height={630} className='lg:object-contain xl:w-[550px] lg:w-[420px]  w-full lg:h-auto h-[300px] object-cover rounded-xl' src={data.img} />
                        </div>
                      </div>
                    </CarouselItem>
                  )
                })
              }
            </CarouselContent>
            <div className='relative w-fit m-auto'>
              <div className='slide_arrow_box bg-white md:w-[84px] w-[60px] md:h-11 h-8 rounded-full'>
                <CarouselPrevious className='bottom-0 md:top-[22px] md:left-2 left-1 border-0' />
                <CarouselNext className='bottom-0 md:top-[22px] md:right-2 right-1 border-0' />
              </div>
            </div>
          </Carousel>
{/* 
          <div className='absolute lg:left-[0px] left-5 lg:bottom-[-180px] bottom-[-90px] z-0'>
            <Image src={'/home/HomeLeft.svg'} alt='' width={390} height={385} className='lg:w-[400px] w-[150px]' />
          </div> */}
        </div>
      </div>
    </>
  )
}

export default Banner