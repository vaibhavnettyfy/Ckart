"use client";
import { Banner, ProductCollection, SponsoredProducts, Appointment, Selling, OurProcess, Whyus } from '@/components/home'

const HomePage = () => {
  const scrollToSection = () => {
    // Find the target section by its id
    const section = document.getElementById('productCollection');

    // Scroll to the target section smoothly
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
      <Banner scrollToSection={scrollToSection} />
      <div id="productCollection">
        <ProductCollection />
      </div>
      <SponsoredProducts />
      <Appointment />
      <Selling />
      <OurProcess />
      <Whyus />
    </>
  )
}

export default HomePage