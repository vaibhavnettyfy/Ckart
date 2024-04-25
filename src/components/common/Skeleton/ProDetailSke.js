import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import React from 'react'

const ProDetailSke = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-8 animate-pulse">
      <div className="col-span-1">
        <div className='bg-gray-200 rounded-lg lg:h-full h-[300px]'></div>
      </div>
      <div>
        <div>
          <div className="lg:text-[22px] md:text-xl text-lg font-semibold mb-2 bg-gray-200 rounded-lg h-10"> </div>
          <div className="text-[#42545E] font-normal sm:text-base text-sm bg-gray-200 rounded-lg h-10"></div>
          <div className="my-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <div className="sm:text-sm text-xs w-1/2 font-semibold bg-gray-200 rounded-lg h-4"></div>
                <div className="sm:text-sm text-xs w-1/2 font-semibold bg-gray-200 rounded-lg h-4"></div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="sm:text-sm text-xs w-1/2 font-semibold bg-gray-200 rounded-lg h-4"></div>
                <div className="sm:text-sm text-xs w-1/2 font-semibold bg-gray-200 rounded-lg h-4"></div>
              </div>
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <div className="font-semibold text-primary lg:text-2xl md:text-xl text-lg bg-gray-200 rounded-lg h-7 w-[100px]"></div>
            <div className="text-[#77878F] lg:text-lg md:text-base text-sm font-normal line-through bg-gray-200 rounded-lg h-7 w-[100px]"></div>
          </div>
        </div>
        <div className="my-5">
          <Separator />
        </div>
        <div>
          <div className='bg-gray-200 rounded-lg h-8 w-[150px]'></div>
          <div className="flex sm:gap-3 gap-2 sm:my-5 my-3">
            <div className='bg-gray-200 rounded-lg h-10 w-full max-w-full'></div>
            <div className='bg-gray-200 rounded-lg h-10 w-full max-w-full'></div>
            <div className='bg-gray-200 rounded-lg h-10 w-full max-w-full'></div>
          </div>
          <div className="border rounded-lg py-2 px-3 w-2/5 bg-gray-200 h-12 max-w-full">
          </div>
          <div className="sm:mt-5 mt-3 sm:mb-7 mb-4">
            <div className="flex gap-2 justify-between items-center sm:text-base text-sm">
              <div className="flex gap-1 items-center bg-gray-200 rounded-lg h-8 sm:w-[200px] w-[120px]"></div>
              <div className="flex gap-2 items-center bg-gray-200 rounded-lg h-8 sm:w-[200px] w-[120px] mr-5"></div>
            </div>
          </div>
          <div className="border rounded-lg px-5 py-4">
            <div className='bg-gray-200 rounded-lg h-6 w-[250px]'></div>
            <div className='bg-gray-200 rounded-lg h-8 w-full mt-2'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProDetailSke