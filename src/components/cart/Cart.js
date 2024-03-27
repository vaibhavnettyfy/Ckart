"use client"
import Image from "next/image";
import Heading from "../common/Heading";
import ProductCard from "../common/product/ProductCard";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import QtyCard from "../common/product/QtyCard";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoveLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import ProductSuggestion from "../common/product/ProductSuggestion";

export default function Cart() {
  const router = useRouter()

  return (
    <div className="my-20">
      <div className="container px-3 sm:px-6">
        <div>
          <div>
            <div>
              <div className="text-2xl font-semibold mb-5">Shopping Cart <sup className="font-medium">(2)</sup></div>
            </div>
            <div className="grid grid-cols-6 gap-5">
              <div className="col-span-4">
                <Table className='border'>
                  <TableHeader>
                    <TableRow>
                      <TableHead></TableHead>
                      <TableHead>Products</TableHead>
                      <TableHead className='text-center'>Quantity</TableHead>
                      <TableHead className="text-center">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell><X /></TableCell>
                      <TableCell>
                        <div className="flex gap-3 items-center">
                          <Image alt={''} width={100} height={80} className='w-[80px] object-contain' src={'/ProductImage.svg'} />
                          <div>
                            <div className="font-semibold">Tiscon Superlinks - 8mm</div>
                            <div className="text-[13px] text-[#5D5F5F] my-[2px]">Diameter: 8mm</div>
                            <div className="text-[13px] text-[#5D5F5F]">Pieces per Bundle: 25</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className='text-center'>
                        <div className="flex justify-center"><QtyCard className='w-[150px]' /></div>
                      </TableCell>
                      <TableCell className="font-semibold text-center">₹750.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><X /></TableCell>
                      <TableCell>
                        <div className="flex gap-3 items-center">
                          <Image alt={''} width={100} height={80} className='w-[80px] object-contain' src={'/ProductImage.svg'} />
                          <div>
                            <div className="font-semibold">Tiscon Superlinks - 8mm</div>
                            <div className="text-[13px] text-[#5D5F5F] my-[2px]">Diameter: 8mm</div>
                            <div className="text-[13px] text-[#5D5F5F]">Pieces per Bundle: 25</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className='text-center'>
                        <div className="flex justify-center"><QtyCard className='w-[150px]' /></div>
                      </TableCell>
                      <TableCell className="font-semibold text-center">₹750.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="flex gap-2 items-center mt-2 cursor-pointer" onClick={() => router.push('/product')}>
                  <MoveLeft className="w-4" />
                  <div className="text-sm">Continue Shopping</div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="border px-4 py-3">
                  <div className="flex flex-col gap-[6px]">
                    <div className="text-xl font-semibold mb-1">Summary</div>
                    <div className="flex justify-between">
                      <div className="font-normal text-[#5D5F5F]">Subtotal</div>
                      <div className="font-semibold">₹1500.00</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-normal text-[#5D5F5F]">Shipping</div>
                      <div className="font-semibold">Free</div>
                    </div>
                  </div>
                  <div className="py-3">
                    <Separator />
                  </div>
                  <div>
                    <div className="font-normal text-[#5D5F5F] mb-2">Discount Code</div>
                    <div className="flex gap-2">
                      <Input placeholder='Enter coupon' />
                      <Button size='sm' className='px-5 py-2 !text-sm h-auto'>Apply</Button>
                    </div>
                  </div>
                  <div className="py-5">
                    <Separator />
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <div className="font-normal text-[#5D5F5F]">Total</div>
                      <div className="font-semibold text-xl">₹1500.00</div>
                    </div>
                    <div className="mt-3">
                      <Button size='sm' onClick={() => router.push('/check-out')} className='px-5 py-3 !text-sm h-auto w-full bg-black hover:bg-black/85 shadow-none'>Proceed to Checkout</Button>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-center">
                    <Image src={'/CartCard.svg'} alt="" width={194} height={41} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-10">
            <Separator />
          </div>
          <div>
            <ProductSuggestion head='Products' para='Related Products' />
          </div>
        </div>
      </div>
    </div>
  );
}
