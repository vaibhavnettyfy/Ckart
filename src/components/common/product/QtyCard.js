'use client'
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React, { useState } from 'react'

const QtyCard = ({ className }) => {
  const [counter, setCounter] = useState(1);

  const incrementCounter = () => setCounter(counter + 1);
  const decrementCounter = () => setCounter(counter > 1 ? counter - 1 : 1);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(newValue)) {
      setCounter(newValue === '' ? '' : Number(newValue));
    }
  };

  return (
    <div className={`${className && className} flex justify-between items-center border rounded-lg md:p-2 p-[6px]`}>
      <div onClick={decrementCounter}>
        <Image alt={''} width={25} height={25} className='lg:w-6 md:w-5 w-4 object-contain cursor-pointer' src={'/minus.svg'} />
      </div>
      <Input value={counter} onChange={handleInputChange} className='w-[100px] border-none text-center p-0 h-auto bg-transparent' />
      <div onClick={incrementCounter}>
        <Image alt={''} width={25} height={25} className='lg:w-6 md:w-5 w-4 object-contain cursor-pointer' src={'/add.svg'} />
      </div>
    </div>
  )
}

export default QtyCard