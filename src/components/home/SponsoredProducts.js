'use client'
import React, { useState } from 'react'
import Heading from '../common/Heading'
import Image from 'next/image'
import { Button } from '../ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination"
import ProductCard from '../common/product/ProductCard'


const SponsoredProducts = () => {


  return (
    <div className='z-20 relative lg:py-16 md:py-12 sm:py-8 py-5 md:my-10 sm:my-8 my-5'>
      <div className='container px-3 sm:px-6'>
        <Heading head={'Sponsored Products'} para={'Sponsored Products'} />
      </div>
      <div className='md:py-10 sm:py-8 py-5 container px-3 sm:px-6'>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 lg:gap-5 md:gap-3 gap-2'>
          {[1, 1, 1, 1, 1, 1, 1, 1].map((data, i) => {
            return (
              <div key={i} className='col-span-1'>
                <ProductCard />
              </div>
            )
          })}
        </div>
      </div>
      <div>
        <Pagination>
          <PaginationContent className='md:gap-2 gap-1'>
            <PaginationItem className='border-primary md:mr-2 mr-1'>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">5</PaginationLink>
            </PaginationItem>
            <PaginationItem className='border-primary md:mr-2 mr-1'>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default SponsoredProducts