import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const ProCardSke = () => {
  return (
    <div
      className="border bg-white md:rounded-2xl sm:rounded-xl rounded-lg lg:p-4 md:p-3 p-2 overflow-hidden"
    >
      <div className='animate-pulse flex flex-col sm:gap-3 gap-2'>
        <div className="bg-bgsecondary w-full lg:h-[220px] md:h-48 sm:h-40 h-32 sm:rounded-xl rounded-lg bg-gray-200"></div>
        <div className="bg-bgsecondary w-2/3 sm:h-8 h-6 sm:rounded-xl rounded-lg bg-gray-200"></div>
        <div className="bg-bgsecondary w-full sm:h-10 h-7 sm:rounded-xl rounded-lg bg-gray-200"></div>
        <div className="bg-bgsecondary w-2/3 sm:h-6 h-4 sm:rounded-xl rounded-lg bg-gray-200"></div>
        <div className="bg-bgsecondary w-full sm:h-10 h-7 sm:rounded-xl rounded-lg bg-gray-200"></div>
        <div className="bg-bgsecondary w-2/3 sm:h-6 h-4 sm:rounded-xl rounded-lg bg-gray-200"></div>
        <div className="bg-bgsecondary w-full sm:h-10 h-7 sm:rounded-xl rounded-lg bg-gray-200"></div>
        <div className="bg-bgsecondary w-full sm:h-10 h-7 sm:rounded-xl rounded-lg bg-gray-200"></div>
      </div>
    </div>
  )
}

export default ProCardSke