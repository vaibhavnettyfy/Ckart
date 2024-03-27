'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter()

  return (
    <div className="z-20 relative">
      <div className="bg-[#191C1F] text-white">
        <div className="container px-3 sm:px-6 md:py-5">
          <div className="flex sm:flex-row flex-col gap-3 md:gap-0 justify-between md:items-center border-b border-b-white border-opacity-45 py-5">
            <div>
              <Image onClick={() => router.push('/')} src={'/logo.png'} alt="" width={156} height={48} className="lg:w-[150px] md:w-[130px] sm:w-[110px] w-[100px] h-auto cursor-pointer" />
            </div>
            <div className="md:text-lg text-[15px] flex items-center gap-4 mg:gap-7">
              <div className="cursor-pointer" onClick={() => router.push('/')} >Book an appointment</div>
              <div className="cursor-pointer" onClick={() => router.push('/about-us')} >About us</div>
              <div className="cursor-pointer" onClick={() => router.push('/contact-us')} >Contact us</div>
            </div>
          </div>
          <div className="sm:py-8 py-5 grid sm:grid-cols-3 grid-cols-2 justify-between gap-4">
            <div className="col-span-1">
              <div className="md:text-xl text-[17px] font-extrabold uppercase md:mb-4 mb-3">Contact</div>
              <div className="flex flex-col md:text-[17px] text-sm gap-1">
                <div>info@example.com</div>
                <div>info@domain.com</div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="md:text-xl text-[17px] font-extrabold text-center uppercase md:mb-4 mb-3">Support</div>
              <div className="flex flex-col items-center text-sm md:text-[17px] gap-1">
                <div>+91 9632585741</div>
                <div>+91 9832585785</div>
              </div>
            </div>
            <div className="sm:col-span-1 col-span-2">
              <div className="md:text-xl text-[17px] font-extrabold sm:text-end uppercase md:mb-4 mb-3">Address</div>
              <div className="flex flex-col sm:items-end text-sm md:text-[17px] gap-1">
                <div className="flex items-center gap-1">
                  <div className="border w-4"></div>
                  <div>India</div>
                </div>
                <div>18 N, 122bk, Mahavir Mansion,</div>
                <div>Kika Street, Girgaon</div>
              </div>
            </div>
          </div>
          <div className="flex sm:flex-row flex-col gap-3 md:gap-0  justify-between md:items-center border-t border-t-white border-opacity-45 py-5">
            <div className="md:text-base text-sm">© 2024 All rights reserved by Website Design</div>
            <div className="flex md:gap-[10px] gap-[6px]">
              <div className="bg-primary md:p-2 p-[6px] rounded"> <Image src={'/header/Twitter.svg'} alt="" width={16} height={16} className="md:w-4 md:h-4 w-3 h-3" /></div>
              <div className="bg-primary md:p-2 p-[6px] rounded"> <Image src={'/header/Facebook.svg'} alt="" width={16} height={16} className="md:w-4 md:h-4 w-3 h-3" /></div>
              <div className="bg-primary md:p-2 p-[6px] rounded"> <Image src={'/header/Pinterest.svg'} alt="" width={16} height={16} className="md:w-4 md:h-4 w-3 h-3" /></div>
              <div className="bg-primary md:p-2 p-[6px] rounded"> <Image src={'/header/Youtube.svg'} alt="" width={16} height={16} className="md:w-4 md:h-4 w-3 h-3" /></div>
              <div className="bg-primary md:p-2 p-[6px] rounded"> <Image src={'/header/Instagram.svg'} alt="" width={16} height={16} className="md:w-4 md:h-4 w-3 h-3" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}