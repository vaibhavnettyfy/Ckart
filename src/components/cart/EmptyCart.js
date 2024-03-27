"use client"
import Image from "next/image";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import ProductSuggestion from "../common/product/ProductSuggestion";
import { useRouter } from "next/navigation";

const EmptyCart = () => {
  const router = useRouter();
  return (
    <div className="my-20">
      <div className="container px-3 sm:px-6">
        <div>
          <div className='flex flex-col gap-5 items-center justify-center pb-10'>
            <Image src={'/EmptyCart.svg'} alt='' width={160} height={160} />
            <div className='text-2xl font-semibold'>Your shopping cart is empty</div>
            <div className='flex gap-3 mt-2'>
              <Button size={'lg'} className='' onClick={() => router.push('/product')}>Continue Shopping</Button>
            </div>
          </div>
          <div className="my-10">
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