"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Searchbar from "./Search";
import Cookies from "universal-cookie";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import BookAppointment from "./modal/BookAppointment";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { MapPin, Search } from "lucide-react";
import { productListByCart } from "@/Service/AddTocart/AddToCart.service";
import { useAppContext } from "@/context";

export const categoryOption = [
  { value: "Category 1" },
  { value: "Category 2" },
  { value: "Category 3" },
  { value: "Category 4" },
];
const category = [
  "Building Materials",
  "Bathroom Fixtures",
  "Electricals & Lighting",
  "Tiles & Floorings",
  "Paints & Coatings",
];

export default function Header() {
  const router = useRouter();
  const [userLogin, setUserLogin] = useState(false);
  const cookies = new Cookies();
  const userLoginFlag = cookies.get("token");
  const cartId = cookies.get("CARTID");
  const [cartList, setCartList] = useState([]);

  const { cartLength, setCartLength } = useAppContext();

  useEffect(() => {
    if (cartId) {
      getProductListByCartId(cartId);
    }
  }, [cartId]);

  const getProductListByCartId = async (cartId) => {
    const { data, message, success } = await productListByCart(cartId);
    if (success) {
      setCartList(data);
      setCartLength(data.length);
    } else {
      setCartLength(0);
      setCartList([]);
    }
  };

  useEffect(() => {
    if (userLoginFlag) {
      setUserLogin(true);
    }
  }, []);

  const logout = () => {
    router.push(`/`);
    setUserLogin(false);
    cookies.remove("token");
    cookies.remove("userEmail");
    cookies.remove("userPassword");
  };

  const profileDropDown = [
    {
      name: "MY Profile",
      image: "/header/Profile.svg",
      onClick: () => router.push("/profile"),
    },
    {
      name: "Order History",
      image: "/header/Storefront.svg",
      onClick: () => router.push("/order"),
    },
    {
      name: "Track Order",
      image: "/header/MapPinLine.svg",
      onClick: () => router.push("/order"),
    },
    {
      name: "Setting",
      image: "/header/Gear.svg",
      onClick: () => router.push("/profile"),
    },
  ];

  const filteredDropDown = userLogin ? profileDropDown :[];
  
  return (
    <>
      <div className="z-20 relative">
        <div
          className="bg-primary text-white sm:py-[10px] py-[5px] md:block hidden"
          style={{ boxShadow: "0px -1px 0px 0px #FFFFFF29 inset" }}
        >
          <div className="container px-3 sm:px-6 flex justify-between items-center">
            <div className="flex sm:gap-5 gap-3">
              <div className="flex items-center gap-1">
                <Image
                  src={"/header/call.svg"}
                  alt=""
                  width={20}
                  height={20}
                  className="sm:w-5 sm:h-5 w-4 h-4"
                />
                <div className="sm:text-lg text-sm">+91 9632585236</div>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src={"/header/sms.svg"}
                  alt=""
                  width={20}
                  height={20}
                  className="sm:w-5 sm:h-5 w-4 h-4"
                />
                <div className="sm:text-lg text-sm">info@ckart.com</div>
              </div>
            </div>
            <div className=" gap-[10px] items-center flex">
              <div className="text-sm ">Follow us :</div>
              <div className="flex gap-[10px] items-center">
                <Image
                  src={"/header/Twitter.svg"}
                  alt=""
                  width={16}
                  height={16}
                />
                <Image
                  src={"/header/Facebook.svg"}
                  alt=""
                  width={16}
                  height={16}
                />
                <Image
                  src={"/header/Pinterest.svg"}
                  alt=""
                  width={16}
                  height={16}
                />
                <Image
                  src={"/header/Reddit.svg"}
                  alt=""
                  width={16}
                  height={16}
                />
                <Image
                  src={"/header/Youtube.svg"}
                  alt=""
                  width={16}
                  height={16}
                />
                <Image
                  src={"/header/Instagram.svg"}
                  alt=""
                  width={16}
                  height={16}
                />
              </div>
              <BookAppointment />
            </div>
          </div>
        </div>
        <div className="bg-primary text-white md:py-3 py-2 z-[99999]">
          <div className="container px-3 sm:px-6 flex justify-between items-center">
            <div className="flex gap-1">
              <Sheet>
                <SheetTrigger asChild>
                  <Image
                    src={"/header/Menu.svg"}
                    alt=""
                    width={32}
                    height={32}
                    className="md:hidden sm:w-9 w-8 cursor-pointer"
                  />
                </SheetTrigger>
                <SheetContent className="w-full">
                  <div className="mt-10 flex flex-col gap-4">
                    <div>
                      <MultiSelectDropdown
                        formFieldName={"Category"}
                        options={category}
                        onChange={(selected) => {
                          console.debug("selected", selected);
                        }}
                        prompt="All Category"
                      />
                    </div>

                    <div className="lg:text-lg text-base text-[#6B6B6B] flex flex-col items-center gap-4">
                      <BookAppointment
                        button={<div>Book an appointment</div>}
                      />
                      <div
                        className="hover:text-primary cursor-pointer"
                        onClick={() => router.push("/about-us")}
                      >
                        About us
                      </div>
                      <div
                        className="hover:text-primary cursor-pointer"
                        onClick={() => router.push("/contact-us")}
                      >
                        Contact us
                      </div>
                      {/* <div>About us</div>
                      <div>Contact us</div> */}
                    </div>

                    <Separator />

                    <div className="text-center">
                      <Dialog>
                        <DialogTrigger>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                Delivery Pincode :- 362011
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Click to change Pincode</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Choose your location</DialogTitle>
                            <div className="flex flex-col gap-7 !mt-5">
                              <div>
                                <Label htmlFor="" className="h-4 inline">
                                  Enter an Indian pincode
                                </Label>
                                <div className="relative">
                                  <Input placeholder="" className="w-full" />
                                  <Search className="absolute top-[10px] right-3 w-5 h-5" />
                                </div>
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button size="sm">Update</Button>
                                <Button size="sm" variant="outline">
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <Separator />
                    <div className="flex flex-col justify-between items-center gap-4">
                      <div className="flex sm:gap-5 gap-5">
                        <div className="flex items-center gap-1">
                          <Image
                            src={"/sidebar/call.svg"}
                            alt=""
                            width={20}
                            height={20}
                            className="sm:w-5 sm:h-5 w-[18px] h-[18px]"
                          />
                          <div className="md:text-lg sm:text-base text-[15px]">
                            +91 9632585236
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Image
                            src={"/sidebar/sms.svg"}
                            alt=""
                            width={20}
                            height={20}
                            className="sm:w-5 sm:h-5 w-[18px] h-[18px] "
                          />
                          <div className="md:text-lg sm:text-base text-[15px]">
                            info@ckart.com
                          </div>
                        </div>
                      </div>
                      <div className=" gap-3 items-center flex">
                        <div className="sm:text-lg text-base">Follow us :</div>
                        <div className="flex gap-[10px] items-center">
                          <Image
                            src={"/sidebar/Twitter.svg"}
                            alt=""
                            width={18}
                            height={18}
                            className="w-4 h-4"
                          />
                          <Image
                            src={"/sidebar/Facebook.svg"}
                            alt=""
                            width={18}
                            height={18}
                            className="w-4 h-4"
                          />
                          <Image
                            src={"/sidebar/Pinterest.svg"}
                            alt=""
                            width={18}
                            height={18}
                            className="w-4 h-4"
                          />
                          <Image
                            src={"/sidebar/Reddit.svg"}
                            alt=""
                            width={18}
                            height={18}
                            className="w-4 h-4"
                          />
                          <Image
                            src={"/sidebar/Youtube.svg"}
                            alt=""
                            width={18}
                            height={18}
                            className="w-4 h-4"
                          />
                          <Image
                            src={"/sidebar/Instagram.svg"}
                            alt=""
                            width={18}
                            height={18}
                            className="w-4 h-4"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <Image
                onClick={() => router.push("/")}
                src={"/logo.png"}
                alt=""
                width={156}
                height={48}
                className="lg:w-[150px] md:w-[130px] sm:w-[110px] w-[100px] h-auto cursor-pointer"
              />
            </div>
            <div className="md:block hidden">
              <Searchbar />
            </div>
            <div className="flex items-center gap-10">
              <div className="lg:flex hidden items-center">
                <Dialog>
                  <DialogTrigger>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="text-black bg-[#ffed32] px-[6px] py-[2px] rounded flex items-center gap-[6px] border-2 border-[#ffed32] hover:border-black">
                            <div>
                              <MapPin />
                            </div>
                            <div className="text-[13px] text-start">
                              <div>Delivering to Ahmedabad 380001</div>
                              <div className="font-semibold">
                                Update location
                              </div>
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Click to change Pincode</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Choose your location</DialogTitle>
                      <div className="flex flex-col gap-7 !mt-5">
                        <div>
                          <Label htmlFor="" className="h-4 inline">
                            Enter an Indian pincode
                          </Label>
                          <div className="relative">
                            <Input placeholder="" className="w-full" />
                            <Search className="absolute top-[10px] right-3 w-5 h-5" />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button size="sm">Update</Button>
                          <Button size="sm" variant="outline">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex md:gap-3 gap-[6px] items-center">
                <div className="relative">
                  <div className="absolute -top-1 border border-[#ffed32] -right-1 bg-primary rounded-full h-5 w-5 flex items-center justify-center ">
                    <div className="text-xs font-medium leading-none text-[#ffed32]">
                      {cartLength}
                    </div>
                  </div>
                  <Image
                    onClick={() => router.push("/cart")}
                    src={"/header/cart.svg"}
                    alt=""
                    width={32}
                    height={32}
                    className="md:w-8 w-6 md:h-8 cursor-pointer"
                  />
                </div>
                {userLogin && (
                  <Image
                    onClick={() => router.push("/wishlist")}
                    src={"/header/heart.svg"}
                    alt=""
                    width={32}
                    height={32}
                    className="md:w-8 w-6 md:h-8 cursor-pointer"
                  />
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Image
                      src={"/header/profile.svg"}
                      alt=""
                      width={32}
                      height={32}
                      className="md:w-8 w-6 md:h-8 cursor-pointer"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="p-2">
                    {filteredDropDown.map((data, i) => {
                      const { name, image, onClick } = data;
                      return (
                        <DropdownMenuItem
                          key={i}
                          className="p-2"
                          onClick={onClick}
                        >
                          <div className="flex gap-2">
                            <Image
                              src={image}
                              alt=""
                              width={20}
                              height={20}
                              className="w-5 h-auto cursor-pointer"
                            />
                            <div className="text-[#5F6C72]">{name}</div>
                          </div>
                        </DropdownMenuItem>
                      );
                    })}
                    {userLogin ? (
                      <DropdownMenuItem
                        className="p-2"
                        onClick={() => logout()}
                      >
                        <div className="flex gap-2">
                          <Image
                            src={"/header/SignOut.svg"}
                            alt=""
                            width={20}
                            height={20}
                            className="w-5 h-auto cursor-pointer"
                          />
                          <div className="text-[#5F6C72]">Log-out</div>
                        </div>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        className="p-2"
                        onClick={() => router.push(`/login`)}
                      >
                        <div className="flex gap-2">
                          <Image
                            src={"/login.svg"}
                            alt=""
                            width={20}
                            height={20}
                            className="w-5 h-auto cursor-pointer"
                          />
                          <div className="text-[#5F6C72]">Log-in</div>
                        </div>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-primary md:py-3 py-2 container px-3 sm:px-6 md:hidden block">
          <Searchbar />
        </div>
        <div
          style={{ boxShadow: "0px -1px 0px 0px #E4E7E9 inset" }}
          className="py-3 bg-white md:block hidden"
        >
          <div className="container px-3 sm:px-6 flex justify-start gap-6 items-center">
            <div>
              <MultiSelectDropdown
                formFieldName={"category"}
                options={category}
                onChange={(selected) => {
                  console.debug("selected", selected);
                }}
                prompt="All Category"
              />
            </div>
            <div className="lg:text-lg text-base text-[#6B6B6B]  flex items-center gap-6">
              <BookAppointment
                button={
                  <div className="hover:text-primary cursor-pointer">
                    Book an appointment
                  </div>
                }
              />
              <div
                className="hover:text-primary cursor-pointer"
                onClick={() => router.push("/about-us")}
              >
                About us
              </div>
              <div
                className="hover:text-primary cursor-pointer"
                onClick={() => router.push("/contact-us")}
              >
                Contact us
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
