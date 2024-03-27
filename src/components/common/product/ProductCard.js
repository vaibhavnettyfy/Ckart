"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Info } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useRouter } from "next/navigation";
import QtyCard from "./QtyCard";

// const productSpecification = [
//   "Diameter : 8mm",
//   "Pieces per Bundle : 25",
//   "Dimension : 178 mm x 229mm",
// ];

const ProductCard = ({ productDetails }) => {
  console.log("productDetails-productDetails", productDetails);
  const {
    imageData,
    categoryname,
    description,
    price,
    productName,
    subcategoryname,
    flag,
    pieces,
    specificationData,
  } = productDetails ?? {};
  const router = useRouter();

  const [wishList, setWishList] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState();

  useEffect(() => {}, []);

  const quantityHandler = (value) => {
    console.log("quantity", value);
  };

  const setQuantityHandler = (value) => {
    console.log("setQuantity", value);
    setQuantity(value);
    setTotalAmount(price * value);
  };

  const handleWishList = () => {
    setWishList(!wishList);
  };

  return (
    <div
      className="border bg-white md:rounded-2xl sm:rounded-xl rounded-lg lg:p-4 md:p-3 p-2 overflow-hidden cursor-pointer"
      onClick={() => router.push("/product-details")}
    >
      <div>
        <div className="bg-bgsecondary w-full lg:h-[220px] md:h-48 sm:h-40 h-32 sm:rounded-xl rounded-lg flex justify-center items-center relative">
          <Image
            alt={""}
            width={170}
            height={150}
            className="lg:w-[170px] md:w-[140px] sm:w-[100px] w-24 object-contain"
            src={imageData ? imageData : "/ProductImage.svg"}
          />
          {/* need to keep this commented */}
          {/* <Image
            alt={""}
            width={60}
            height={40}
            className="lg:w-16 md:w-12 w-8 object-contain absolute top-2 right-2"
            src={"/ProductCompany.svg"}
          /> */}
          <Image
            alt={""}
            width={35}
            height={35}
            className="lg:w-9 md:w-7 w-5 object-contain absolute top-2 left-2 cursor-pointer"
            src={!flag ? "/heart.svg" : "/wishlist.svg"}
            onClick={(e) => {
              e.stopPropagation();
              handleWishList();
            }}
          />
        </div>
        <div className="xl:text-[22px] lg:text-xl md:text-lg font-semibold mt-2 mb-1">
          {productName}
        </div>
        <DropdownMenu onClick={(e) => e.stopPropagation()}>
          <DropdownMenuTrigger className="w-full select_box">
            <div className="border md:px-3 px-2 md:py-2 py-[6px] flex justify-between items-center w-full rounded-lg">
              <div className="lg:text-base md:text-sm text-xs">
                Product Details
              </div>
              <div>
                <ChevronDown className="lg:w-5 md:w-4 w-3 h-4" />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="p-1">
              <div className="flex md:gap-2 gap-1 flex-col">
                {specificationData && specificationData.length > 0 ? (
                  specificationData.map((res) => {
                    return (
                      <div className="border border-[#975BEC4D] bg-[#975BEC1A] md:py-[6px] py-1 md:px-3 px-2 md:rounded-xl rounded-md w-fit lg:text-sm md:text-sm text-[10px]">
                        <span className="font-semibold"> {res?.key} </span> : {res?.value}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-[#5D5F5F] text-center">
                    No Product Details Found
                  </div>
                )}
                {/* need to keep this comment */}
                {/* {specificationData.map((data, i) => {
                  return (
                    <div
                      key={i}
                      className="border border-[#975BEC4D] bg-[#975BEC1A] md:py-[6px] py-1 md:px-3 px-2 md:rounded-xl rounded-md w-fit lg:text-base md:text-sm text-[10px]"
                    >
                      {data}
                    </div>
                  );
                })} */}
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div
          onClick={(e) => e.stopPropagation()}
          className="text-[#42545E] lg:text-base md:text-sm text-xs py-2"
        >
          Per Bundle{" "}
          <span className="font-semibold text-black">{`₹ ${
            price ? price : 0
          }`}</span>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <QtyCard
            quantity={quantityHandler}
            setQuantity={setQuantityHandler}
          />
        </div>
        <div
          className="flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="py-2 lg:text-base md:text-sm text-xs">
            Total Amount{" "}
            <span className="font-semibold text-green lg:text-lg md:text-base text-sm">
              {`₹ ${price ? price : 0 * quantity}`}
            </span>
          </div>
          <HoverCard>
            <HoverCardTrigger>
              <Info className="w-4 cursor-pointer text-black bg-[#ffed32] h-fit rounded-full" />
            </HoverCardTrigger>
            <HoverCardContent className="p-3 w-48">
              <div className="grid gap-1">
                <div className="flex justify-between">
                  <div>Product cost :</div>
                  <div className="text-primary font-medium">₹ 90</div>
                </div>
                <div className="flex justify-between">
                  <div>GST :</div>
                  <div className="text-primary font-medium">5 %</div>
                </div>
                <div>
                  <div className="text-primary font-semibold">
                    Free Delivery
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        <div
          className="flex flex-col justify-between items-center md:gap-3 gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            size={"card"}
            variant="outline"
            className="w-full"
            onClick={() => router.push("/cart")}
          >
            buy now
          </Button>
          <Button
            size={"card"}
            variant="card"
            className="w-full z-20"
            onClick={() => router.push("/cart")}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;