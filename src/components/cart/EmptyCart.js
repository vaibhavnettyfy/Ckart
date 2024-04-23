"use client"
import Image from "next/image";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import ProductSuggestion from "../common/product/ProductSuggestion";
import { useRouter } from "next/navigation";

const EmptyCart = () => {
  const router = useRouter();
  return (
    <div>
      <div className="container px-3 sm:px-6">
        <div>
          <div className='flex flex-col sm:gap-5 gap-3 items-center justify-center lg:pb-10 md:pb-7 pb-4'>
            <Image src={'/EmptyCart.svg'} alt='' width={160} height={160} className="sm:w-40 h-auto w-32" />
            <div className='sm:text-2xl text-xl font-semibold'>Your shopping cart is empty</div>
            <div className='flex gap-3 mt-2'>
              <Button size={'lg'} className='' onClick={() => router.push('/product')}>Continue Shopping</Button>
            </div>
          </div>
          <div className="lg:my-10 md:my-8 my-6">
            <Separator />
          </div>
          <div>
            <ProductSuggestion head='Products' para='Continue shopping for' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmptyCart