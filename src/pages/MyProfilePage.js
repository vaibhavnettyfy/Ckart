import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";


export default function AboutPage() {
  return (
    <div className="my-20">
      <div className="container px-3 sm:px-6">
        <div className="flex flex-col gap-5 max-w-[1000px] m-auto">
          <div>
            <div className="border rounded-lg">
              <div className="font-semibold py-2 px-3 border-b">Account Setting</div>
              <div className="p-5">
                <div className="flex gap-8">
                  <div className="w-1/6">
                    <Image alt="" src={'/Avatar.svg'} width={176} height={176} />
                  </div>
                  <div className="grid grid-cols-2 gap-5 w-5/6">
                    <div>
                      <Label htmlFor="">Display name</Label>
                      <Input placeholder='' className='w-full' />
                    </div>
                    <div>
                      <Label htmlFor="">Username</Label>
                      <Input placeholder='' className='w-full' />
                    </div>
                    <div>
                      <Label htmlFor="">Full Name</Label>
                      <Input placeholder='' className='w-full' />
                    </div>
                    <div>
                      <Label htmlFor="">Email</Label>
                      <Input placeholder='' className='w-full' />
                    </div>
                    <div>
                      <Label htmlFor="">Secondary Email</Label>
                      <Input placeholder='' className='w-full' />
                    </div>
                    <div>
                      <Label htmlFor="">Phone Number</Label>
                      <Input placeholder='' className='w-full' />
                    </div>
                    <div>
                      <Label htmlFor="">Country/Region</Label>
                      <Select className='w-full'>
                        <SelectTrigger >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="categories1">Country</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="">States</Label>
                        <Select className='w-full'>
                          <SelectTrigger >
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="categories1">State</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="">Zip Code</Label>
                        <Input placeholder='' className='w-full' />
                      </div>
                    </div>
                    <div>
                      <Button size='sm' className='shadow-none'>Save Changes</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="border rounded-lg">
              <div className="font-semibold py-2 px-3 border-b">Billing Address</div>
              <div className="p-5 grid grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="">First Name</Label>
                  <Input placeholder='' className='w-full' />
                </div>
                <div>
                  <Label htmlFor="">Last Name</Label>
                  <Input placeholder='' className='w-full' />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="">Company Name (Optional)</Label>
                  <Input placeholder='' className='w-full' />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="">Address</Label>
                  <Input placeholder='' className='w-full' />
                </div>
                <div>
                  <Label htmlFor="">Country</Label>
                  <Input placeholder='' className='w-full' />
                </div>
                <div>
                  <Label htmlFor="">State</Label>
                  <Input placeholder='' className='w-full' />
                </div>
                <div>
                  <Label htmlFor="">City</Label>
                  <Input placeholder='' className='w-full' />
                </div>
                <div>
                  <Label htmlFor="">Zip Code</Label>
                  <Input placeholder='' className='w-full' />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="">Email</Label>
                  <Input placeholder='' className='w-full' />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="">Phone Number</Label>
                  <Input placeholder='' className='w-full' />
                </div>
                <div className="col-span-2">
                  <Button size='sm' className='shadow-none'>Save Changes</Button>
                </div>
              </div>
            </div>
            <div className="border rounded-lg">
              <div className="font-semibold py-2 px-3 border-b">Shipping Address</div>
              <div className="p-5 grid grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="">First Name</Label>
                  <Input placeholder='' className='w-full' />
                </div>
                <div>
                  <Label htmlFor="">Last Name</Label>
                  <Input placeholder='' className='w-full' />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="">Company Name (Optional)</Label>
                  <Input placeholder='' className='w-full' />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="">Address</Label>
                  <Input placeholder='' className='w-full' />
                </div>
                <div>
                  <Label htmlFor="">Country</Label>
                  <Input placeholder='' className='w-full' />
                </div>
                <div>
                  <Label htmlFor="">State</Label>
                  <Input placeholder='' className='w-full' />
                </div>
                <div>
                  <Label htmlFor="">City</Label>
                  <Input placeholder='' className='w-full' />
                </div>
                <div>
                  <Label htmlFor="">Zip Code</Label>
                  <Input placeholder='' className='w-full' />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="">Email</Label>
                  <Input placeholder='' className='w-full' />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="">Phone Number</Label>
                  <Input placeholder='' className='w-full' />
                </div>
                <div className="col-span-2">
                  <Button size='sm' className='shadow-none'>Save Changes</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
