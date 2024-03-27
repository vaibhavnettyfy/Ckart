'use client'
import { useState } from "react";
import Image from "next/image";
import ProductSuggestion from "../common/product/ProductSuggestion";
import QtyCard from "../common/product/QtyCard";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import BookAppointment from "../common/modal/BookAppointment";
import { useRouter } from "next/navigation";
const feature = [
  { img: '/details/Medal.svg', text: 'Free 1 Year Warranty' },
  { img: '/details/Truck.svg', text: 'Free Shipping & Fasted Delivery' },
  { img: '/details/Handshake.svg', text: '100% Money-back guarantee' },
  { img: '/details/Headphones.svg', text: '24/7 Customer support' },
  { img: '/details/CreditCard.svg', text: 'Secure payment method' },
]
const shippingInformation = [
  { head: 'Courier :', para: '2-4 days, free shipping' },
  { head: 'Local Shipping :', para: 'up to one week, ₹19.00' },
  { head: 'UPS Ground Shipping :', para: '4-6 days, ₹29.00' },
  { head: 'Unishop Global Export :', para: '3-4 days, ₹39.00' },
]

const images = [
  {
    original: "/dummyimage.png",
    thumbnail: "/dummyimage.png",
  },
  {
    original: "/dummyimage.png",
    thumbnail: "/dummyimage.png",
  },
  {
    original: "/dummyimage.png",
    thumbnail: "/dummyimage.png",
  },
  {
    original: "/dummyimage.png",
    thumbnail: "/dummyimage.png",
  },
  {
    original: "/dummyimage.png",
    thumbnail: "/dummyimage.png",
  },
  {
    original: "/dummyimage.png",
    thumbnail: "/dummyimage.png",
  },
  {
    original: "/dummyimage.png",
    thumbnail: "/dummyimage.png",
  },
];

export default function ProductDetails() {
  const router = useRouter();
  const [wishList, setWishList] = useState(false);


  const handleWishList = () => {
    setWishList(!wishList)
  }

  return (
    <div className="my-20">
      <div className="container px-3 sm:px-6">
        <div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <ImageGallery items={images} autoPlay={true} />
            </div>
            <div>
              <div>
                <div className="text-[22px] font-semibold mb-2">Tiscon Superlinks - 8mm</div>
                <div className="text-[#42545E] font-normal">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. </div>
                <div className="my-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-semibold"><span className="text-[#5F6C72] font-normal">Diameter : </span> 8mm</div>
                      <div className="text-sm font-semibold"><span className="text-[#5F6C72] font-normal">Pieces per Bundle : </span> 25</div>
                      <div className="text-sm font-semibold"><span className="text-[#5F6C72] font-normal">Dimension : </span> 178 mm x 229 mm</div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-semibold"><span className="text-[#5F6C72] font-normal">Availability : </span> In Stock</div>
                      <div className="text-sm font-semibold"><span className="text-[#5F6C72] font-normal">Brand : </span> Tata</div>
                      <div className="text-sm font-semibold"><span className="text-[#5F6C72] font-normal">Category : </span> Building Material</div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 items-center">
                  <div className="font-semibold text-primary text-2xl">₹750</div>
                  <div className="text-[#77878F] text-lg font-normal line-through">₹999.00</div>
                  <div className="text-sm px-2 py-1 bg-[#EFD33D] font-semibold rounded-sm ml-2">21% OFF</div>
                </div>
              </div>
              <div className="my-5">
                <Separator />
              </div>
              <div>
                <div><QtyCard className='w-[150px]' /></div>
                <div className="flex gap-3 my-5">
                  <Button size={'lg'} className='w-full shadow-none' onClick={() => router.push('/cart')}>
                    <div className='flex gap-2 items-center'>
                      <div>Add to cart</div>
                      <Image alt={''} width={20} height={20} className='object-contain' src={'/details/ShoppingCart.svg'} />
                    </div>
                  </Button>
                  <BookAppointment button={<Button size='lg' className='w-full shadow-none' variant='outline'>Book Appointment</Button>} />
                  <Button size='lg' className='w-full shadow-none' variant='outline' onClick={() => router.push('/cart')}>Buy now</Button>
                </div>
                <div className="border rounded-lg py-2 px-3 w-fit">
                  <div className="text-lg font-normal">Delivery Pincode:- <span className="font-semibold">362011</span></div>
                </div>
                <div className="mt-5 mb-7">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      <Image alt={''} width={24} height={24} className='cursor-pointer' src={!wishList ? '/details/Heart.svg' : '/details/WishList.svg'} onClick={handleWishList} />
                      <div>Add to Wishlist</div>
                    </div>
                    <div className="flex gap-2 items-center mr-10">
                      <div>Share product:</div>
                      <div className="flex gap-2 items-center">
                        <Image alt={''} width={20} height={20} className='cursor-pointer' src={'/details/Copy.svg'} />
                        <Image alt={''} width={16} height={16} className='cursor-pointer' src={'/details/Facebook.svg'} />
                        <Image alt={''} width={16} height={16} className='cursor-pointer' src={'/details/Twitter.svg'} />
                        <Image alt={''} width={16} height={16} className='cursor-pointer' src={'/details/Pinterest.svg'} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg px-5 py-4">
                  <div className="text-sm font-normal mb-2">100% Guarantee Safe Checkout</div>
                  <Image alt={''} width={312} height={18} className='object-contain' src={'/PaymentMethod.svg'} />
                </div>
              </div>

            </div>
            <div className="col-span-2">
              <Tabs defaultValue="tab1" className="border rounded-lg">
                <TabsList className='w-full bg-transparent border-b rounded-none'>
                  <TabsTrigger value="tab1">Description</TabsTrigger>
                  <TabsTrigger value="tab2">Additional information</TabsTrigger>
                  <TabsTrigger value="tab3">Specification</TabsTrigger>
                  <TabsTrigger value="tab4">Review</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <div className="grid grid-cols-2 gap-14">
                    <div>
                      <div className="font-semibold">Description</div>
                      <div className="text-sm text-[#5F6C72] my-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</div>
                      <div className="text-sm text-[#5F6C72]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled text ever since the 1500s, when an unknown printer took a galley of type and scrambled</div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <div className="font-semibold mb-2">Feature</div>
                        <div className="flex flex-col gap-[10px]">
                          {feature.map((data, i) => {
                            const { img, text } = data;
                            return (
                              <div key={i} className="flex gap-2">
                                <Image alt={''} width={20} height={20} className='cursor-pointer' src={img} />
                                <div className="text-sm">{text}</div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold mb-2">Shipping Information</div>
                        <div className="flex flex-col gap-[10px]">
                          {shippingInformation.map((data, i) => {
                            const { head, para } = data;
                            return (
                              <div key={i} className="flex gap-1">
                                <div className="text-sm">{head}</div>
                                <div className="text-sm text-[#5F6C72]">{para}</div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="tab2">Additional information</TabsContent>
                <TabsContent value="tab3">Specification</TabsContent>
                <TabsContent value="tab4">Review</TabsContent>
              </Tabs>
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
  );
}
