"use client";
import { Banner, ProductCollection, SponsoredProducts, Appointment, Selling, OurProcess, Whyus } from '@/components/home'

const HomePage = () => {
  return (
    <>
      <Banner />
      <ProductCollection />
      <SponsoredProducts />
      <Appointment />
      <Selling />
      <OurProcess />
      <Whyus />
    </>
  )
}

export default HomePage