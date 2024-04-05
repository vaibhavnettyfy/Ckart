import React from "react";
import Image from "next/image";

function ProductDescription({description}) {
  const feature = [
    { img: "/details/Medal.svg", text: "Free 1 Year Warranty" },
    { img: "/details/Truck.svg", text: "Free Shipping & Fasted Delivery" },
    { img: "/details/Handshake.svg", text: "100% Money-back guarantee" },
    { img: "/details/Headphones.svg", text: "24/7 Customer support" },
    { img: "/details/CreditCard.svg", text: "Secure payment method" },
  ];
  const shippingInformation = [
    { head: "Courier :", para: "2-4 days, free shipping" },
    { head: "Local Shipping :", para: "up to one week, ₹19.00" },
    { head: "UPS Ground Shipping :", para: "4-6 days, ₹29.00" },
    { head: "Unishop Global Export :", para: "3-4 days, ₹39.00" },
  ];
  return (
    <div className="grid grid-cols-2 gap-14">
      <div>
        <div className="font-semibold">Description</div>
        <div className="text-sm text-[#5F6C72] my-2">
          {description}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <div className="font-semibold mb-2">Feature</div>
          <div className="flex flex-col gap-[10px]">
            {feature.map((data, i) => {
              const { img, text } = data;
              return (
                <div key={i} className="flex gap-2">
                  <Image
                    alt={""}
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    src={img}
                  />
                  <div className="text-sm">{text}</div>
                </div>
              );
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
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;
