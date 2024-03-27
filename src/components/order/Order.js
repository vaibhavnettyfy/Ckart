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

export default function Order() {
  const router = useRouter()

  return (
    <div className="my-20">
      <div className="container px-3 sm:px-6">
        <div>
          <div>
            <div>
              <div className="text-2xl font-semibold mb-5">Order History</div>
            </div>
            <div className="grid grid-cols-1 gap-5">
              <div className="col-span-1">
                <Table className='border'>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Products</TableHead>
                      <TableHead className='text-center'>Total</TableHead>
                      <TableHead className='text-center'>Status</TableHead>
                      <TableHead className='text-center'>Date & Time</TableHead>
                      <TableHead className='text-center'>Quantity</TableHead>
                      <TableHead className="text-end"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[1, 1].map((data, i) => {
                      return (
                        <TableRow key={i}>
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
                          <TableCell className="font-semibold text-center">₹750.00</TableCell>
                          <TableCell className='text-center text-green font-semibold uppercase'>COMPLETED</TableCell>
                          <TableCell className='text-center'>Dec 30, 2019 07:52</TableCell>
                          <TableCell className='text-center'>₹1080 (5 Products)</TableCell>
                          <TableCell className='text-end'>
                            <Button size={'sm'} className='!text-sm !capitalize px-5'>View Details</Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
                <div className="flex gap-2 items-center mt-2 cursor-pointer" onClick={() => router.push('/')}>
                  <MoveLeft className="w-4" />
                  <div className="text-sm">Back to Home</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
