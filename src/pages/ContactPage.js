"use client"
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ContactPage() {
  const router = useRouter()

  return (
    <div className="my-20">
      <div className="container px-3 sm:px-6">
        <div>
          <div>
            <div>
              <div className="text-2xl font-semibold mb-5">Contact Us</div>
            </div>
            <div className="grid grid-cols-5 gap-28">
              <div className="col-span-3">
                <div>
                  <div className="text-[#5D5F5F] max-w-[600px] mb-5">We love to hear from you, so if there’s anything you’d like to ask us, we’re right here and ready to help in every way we can.</div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="">Your name</Label>
                      <Input placeholder='ex: Julie Sample' className='w-full' />
                    </div>
                    <div>
                      <Label htmlFor="">Your email</Label>
                      <Input placeholder='ex: julie@gmail.com' className='w-full' />
                    </div>
                    <div>
                      <Label htmlFor="">Your phone</Label>
                      <Input placeholder='ex: +1 234 455 5564' className='w-full' />
                    </div>
                    <div>
                      <Label htmlFor="">Subject</Label>
                      <Input placeholder='ex: return' className='w-full' />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="">Message</Label>
                      <Textarea placeholder='Write your message here.' className='w-full' />
                    </div>
                    <div className="col-span-2 flex justify-end">
                      <Button size='lg'>submit</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="text-[#5D5F5F]">
                  <div>
                    <div className="font-bold text-[#1D1F1F] mb-1">WORKING HOURS</div>
                    <div className="text-sm font-normal">Monday – Friday, 9:00am – 5:00pm PST.</div>
                  </div>
                  <div className="py-5">
                    <Separator />
                  </div>
                  <div className="text-sm flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <Image src={'/contactus/home.svg'} alt="" width={20} height={20} />
                      <div>18 N, 122bk, Mahavir Mansion, Kika Street, Girgaon</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src={'/contactus/phone.svg'} alt="" width={20} height={20} />
                      <div>+91 9632585741, +91 9832585785</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src={'/contactus/email.svg'} alt="" width={20} height={20} />
                      <div>info@example.com, info@domain.com</div>
                    </div>
                  </div>
                  <div className="py-5">
                    <Separator />
                  </div>
                  <div>
                    <div className="font-bold text-[#1D1F1F] mb-1">JOIN US</div>
                    <div className="text-base font-normal">We are happily open new colloboration. You can ask any questions and offer problems by phone, email, Instagram or Facebook.</div>
                    <div className="flex gap-2 items-center mt-3">
                      <Image src={'/contactus/facebook.svg'} alt="" width={32} height={32} />
                      <Image src={'/contactus/google.svg'} alt="" width={32} height={32} />
                      <Image src={'/contactus/insta.svg'} alt="" width={32} height={32} />
                      <Image src={'/contactus/twitter.svg'} alt="" width={32} height={32} />
                      <Image src={'/contactus/youtube.svg'} alt="" width={32} height={32} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112173.09834999095!2d77.05309590262772!3d28.52741405609772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1710827627209!5m2!1sen!2sin" width="500" className="w-full rounded-xl" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
