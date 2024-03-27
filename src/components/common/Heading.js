import React from 'react'

const Heading = ({ head, para }) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex justify-center items-center sm:gap-3 gap-2 sm:mb-2 mb-1'>
        <div className="border border-primary-foreground sm:w-5 w-3"></div>
        <div className='font-semibold uppercase text-primary-foreground lg:text-base md:text-sm text-xs'>{head}</div>
        <div className="border border-primary-foreground sm:w-5 w-3"></div>
      </div>
      <div className='font-extrabold xl:text-5xl lg:text-4xl md:text-3xl text-2xl'>{para}</div>
    </div>
  )
}

export default Heading