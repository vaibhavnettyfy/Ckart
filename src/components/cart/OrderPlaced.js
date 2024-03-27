"use client"
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const OrderPlaced = () => {
  const router = useRouter();
  return (
    <div className="my-20">
      <div className="container px-3 sm:px-6">
        <div className='flex flex-col gap-5 items-center justify-center'>
          <Image src={'/CheckCircle.svg'} alt='' width={100} height={100} />
          <div className='text-2xl font-semibold'>Your order is successfully place</div>
          <div className='text-[#5F6C72] max-w-[500px] text-center'>Pellentesque sed lectus nec tortor tristique accumsan quis dictum risus. Donec volutpat mollis nulla non facilisis.</div>
          <div className='flex gap-3 mt-4'>
            <Button size={'lg'} className='' variant='outline' onClick={() => router.push('/')}>
              <div className='flex gap-2 items-center'>
                <div>Go to Dashboard</div>
                {/* <Image alt={''} width={20} height={20} className='object-contain' src={'/details/ShoppingCart.svg'} /> */}
              </div>
            </Button>
            <Button size={'lg'} className='' onClick={() => router.push('/order')}>
              <div className='flex gap-2 items-center'>
                <div>View Order</div>
                <Image alt={''} width={20} height={20} className='w-[18px] object-contain rounded-lg' src={'/ArrowRight.svg'} />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderPlaced