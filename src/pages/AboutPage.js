import Image from "next/image";

const aboutusList = [
  { img: '/aboutus/icon1.svg', head: 'Free World Delivery', para: 'Orders over $200' },
  { img: '/aboutus/icon2.svg', head: 'Money Back Guarantee', para: 'Within 30 days' },
  { img: '/aboutus/icon3.svg', head: 'Online Support', para: 'Free support system 24/7' },
  { img: '/aboutus/icon4.svg', head: 'Member Gift', para: 'Coupon at weekend' },
]

export default function AboutPage() {
  return (
    <div className="lg:my-20 md:my-16 sm:my-12 my-8">
      <div className="container px-3 sm:px-6">
        <div className="pb-5 flex lg:flex-nowrap flex-wrap items-center justify-around gap-5">
          <div className="xl:w-3/5 lg:w-1/2 w-full">
            <Image alt="" src={'/aboutus/aboutus.svg'} width={700} height={545} className="w-full max-w-[700px] object-cover" />
          </div>
          <div className="xl:w-2/5 lg:w-1/2 w-full">
            <div className="sm:mb-5 mb-3">
              <div className="text-primary-foreground md:text-base text-sm">ABOUT US</div>
              <div className="lg:text-3xl md:text-2xl text-xl text-[#1D1F1F] font-bold">Just Stay Home & Enjoy Your Shopping Time</div>
            </div>
            <div className="text-sm text-[#5D5F5F] flex flex-col sm:gap-3 gap-2">
              <div>orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</div>
              <div>orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</div>
            </div>
            <div className="grid sm:grid-cols-2 md:gap-6 sm:gap-4 gap-2 md:my-7 sm:my-5 my-3">
              {aboutusList.map((data, i) => {
                const { img, head, para } = data
                return (
                  <div key={i} className="flex gap-2 items-center">
                    <div>
                      <Image alt="" src={img} width={45} height={45} className="xl:w-11 md:w-10 w-9" />
                    </div>
                    <div>
                      <div className="font-semibold">{head}</div>
                      <div className="text-sm text-[#5D5F5F]">{para}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="lg:my-10 sm:my-7 my-4 text-sm text-[#5D5F5F]">
          <div>
            <div className="lg:text-3xl md:text-2xl text-xl font-bold max-w-[550px] m-auto text-center text-[#1D1F1F] mb-2">Lorem Ipsum is simply dummy text of the printing industry. </div>
            <div className="max-w-[700px] m-auto text-center">orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer.</div>
          </div>
          <div className="flex lg:flex-nowrap flex-wrap justify-evenly gap-5 lg:my-14 sm:my-10 my-5">
            <Image alt="" src={'/aboutus/img1.svg'} width={570} height={700} className="w-full object-contain max-w-[570px]" />
            <Image alt="" src={'/aboutus/img2.svg'} width={450} height={584} className="w-full object-contain max-w-[450px]" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="max-w-[930px] m-auto text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys</div>
            <div className="max-w-[930px] m-auto text-center">Lorem ipsum dolor sit amet isse potenti. Vesquam ante aliquet lacusemper elit. Cras neque nulla, convallis non commodo et, euismod nonsese. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.</div>
            <div className="max-w-[930px] m-auto text-center">Sed vulputate elit vitae magna lacinia, vel bibendum neque faucibus. Aliquam sed volutpat turpis. Phasellus nisl arcu, pretium eu faucibus sed, aliquet in lacus. Pellentesque sed lacus et ipsum rutrum dignissim. Praesent ultrices posuere eros ac tristique.</div>
          </div>
        </div>
        <Image alt="" src={'/aboutus/brand.svg'} width={1400} height={150} className="w-full" />
      </div>
    </div>
  );
}
