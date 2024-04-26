"use client";
import { orderDetailsApiByorderId } from "@/Service/Order/Order.service";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, MoveRight } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const OrderDetailsPage = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    if (orderId) {
      getOrderDetailsById(orderId);
    }
  }, []);

  const generatePdf = () =>{
    

  }

  const getOrderDetailsById = async (orderId) => {
    try {
      setLoading(true);
      const { data, message, success } = await orderDetailsApiByorderId(
        orderId
      );
      if (success) {
        setOrderDetails(data);
        setProductDetails(data.productId);
        setDeliveryAddress(data.shippingAddress);
        setOrderCount(data.orderStatus);
      } else {
        setOrderDetails({});
        setProductDetails([]);
        setDeliveryAddress({});
        setOrderCount(0);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:my-20 md:my-16 sm:my-12 my-8">
      <div className="container px-3 sm:px-6">
        <div className=" border p-5">
          <div>
            <div className="flex justify-between mb-2">
              <div className="text-[22px] font-bold">{`Order : ${orderDetails.orderNumber}`}</div>
              <div>
                <Button size="sm" className="px-2 py-1 !text-sm">
                  <div className="flex gap-1 items-center">
                    <FileText className="w-[14px] h-[14px]" />
                    <div className="leading-none">Invoice</div>
                  </div>
                </Button>
              </div>
            </div>
            <div className="font-medium flex gap-5 text-[15px]">
              <div>
                Order date:{" "}
                <span className="text-[#777]">
                  {moment(orderDetails.createdAt).format("dddd, MMMM D, YYYY")}
                </span>
              </div>
              <div className="text-primary">
                Estimated delivery:{" "}
                <span>
                  {moment(orderDetails.deliveryDate).format(
                    "dddd, MMMM D, YYYY"
                  )}
                </span>
              </div>
            </div>
          </div>
          <Separator className="my-5" />
          <div>
            <div className="flex flex-wrap justify-between items-center">
              <div
                className={`flex gap-3  border-2 border-dashed ${
                  orderCount == 0
                } border-green p-3`}
              >
                <div
                  className={`${
                    orderCount >= 0 ? "bg-green" : "bg-[#dadada]"
                  }  text-white h-5 w-5 text-sm flex justify-center items-center rounded-full`}
                >
                  1
                </div>
                <div className="font-medium ">
                  <div className="leading-none mb-2">Pending Order</div>
                </div>
              </div>
              <MoveRight className={`${orderCount == 0 && "text-green"}`} />
              <div
                className={`flex gap-3 border-2 border-dashed ${
                  orderCount >= 1 && "border-green"
                }  p-3`}
              >
                <div
                  className={`${
                    orderCount >= 1 ? "bg-green" : "bg-[#dadada]"
                  }  text-white h-5 w-5 text-sm flex justify-center items-center rounded-full`}
                >
                  2
                </div>
                <div className="font-medium">
                  <div className="leading-none mb-2">Confirmed Order</div>
                </div>
              </div>
              <MoveRight className={`${orderCount >= 1 && "text-green"}`} />
              <div
                className={`flex gap-3 border-2 border-dashed ${
                  orderCount >= 2 && "border-green"
                }  p-3`}
              >
                <div
                  className={`${
                    orderCount >= 2 ? "bg-green" : "bg-[#dadada]"
                  }  text-white h-5 w-5 text-sm flex justify-center items-center rounded-full`}
                >
                  3
                </div>
                <div className="font-medium">
                  <div className="leading-none mb-2">Packing Order</div>
                </div>
              </div>
              <MoveRight className={`${orderCount >= 2 && "text-green"}`}/>
              <div className="flex gap-3 border-2 border-dashed p-3">
                <div
                  className={`${
                    orderCount >= 3 ? "bg-green" : "bg-[#dadada]"
                  }  text-white h-5 w-5 text-sm flex justify-center items-center rounded-full`}
                >
                  4
                </div>
                <div className="font-medium">
                  <div className="leading-none mb-2">Shipping Order</div>
                </div>
              </div>
              <MoveRight className={`${orderCount >= 3 && "text-green"}`}/>
              <div
                className={`flex gap-3 border-2 border-dashed ${
                  orderCount >= 4 && "border-green"
                } p-3`}
              >
                <div
                  className={`${
                    orderCount >= 4 ? "bg-green" : "bg-[#dadada]"
                  }  text-white h-5 w-5 text-sm flex justify-center items-center rounded-full`}
                >
                  5
                </div>
                <div className="font-medium">
                  <div className="leading-none mb-2">Deliverd Order</div>
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-5" />
          <div className="flex flex-col gap-4">
            {productDetails && productDetails.length > 0 ? (
              productDetails.map((response, index) => {
                const { productId } = response;
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        alt={""}
                        width={100}
                        height={80}
                        className="w-[70px] object-contain"
                        src={
                          productId.image
                            ? productId.image
                            : "/ProductImage.svg"
                        }
                      />
                      <div>
                        <div className="font-medium text-[17px] mb-1">
                          {productId.productName}
                          {/* <span className="text-[#777]">X 100</span> */}
                        </div>
                        <div className="text-[15px] text-[#777]">
                          {`Pieces per Bundle: ${
                            productId.pieces ? productId.pieces : 0
                          }`}
                        </div>
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="text-[17px] font-semibold">
                        {" "}
                        ₹ {productId.price ? productId.price : 0}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex justify-center items-center">
                <div className="text-center">
                  <div className="text-[17px] font-semibold">
                    No Product Found
                  </div>
                </div>
              </div>
            )}
          </div>
          <Separator className="my-5" />
          <div className="flex">
            <div className="w-1/2"></div>
            <div className="w-1/2">
              <div className="font-semibold mb-2 text-lg">Delivery Address</div>
              <div>{` ${deliveryAddress.address1}, ${deliveryAddress.address2} ,${deliveryAddress.city} ${deliveryAddress.state}-${deliveryAddress.pincode} `}</div>
            </div>
          </div>
          <Separator className="my-5" />
          <div className="flex">
            <div className="w-1/2"></div>
            <div className="w-1/2">
              <div className="flex flex-col gap-[6px]">
                <div className="text-lg font-semibold mb-4">Order Summary</div>
              </div>
              <div className="flex flex-col gap-[6px] text-base">
                <div className="flex justify-between">
                  <div className="text-sm font-normal text-[#777]">
                    Subtotal
                  </div>
                  <div className="text-sm font-medium">{`₹ ${
                    orderDetails.subtotal ? orderDetails.subtotal : 0
                  }.00`}</div>
                </div>
                {/* <div className="flex justify-between">
                  <div className="text-sm font-normal text-[#777]">
                    Shipping
                  </div>
                  <div className="text-sm font-medium">Free</div>
                </div> */}
                <div className="flex justify-between">
                  <div className="text-sm font-normal text-[#777]">
                    Discount
                  </div>
                  <div className="text-sm font-medium">
                    ₹{" "}
                    {orderDetails.discountAmount
                      ? orderDetails.discountAmount
                      : 0}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm font-normal text-[#777]">Tax</div>
                  <div className="text-sm font-medium">
                    ₹{orderDetails.taxValue ? orderDetails.taxValue : 0}
                  </div>
                </div>
              </div>
              <div className="py-3">
                <Separator />
              </div>
              <div>
                <div className="flex justify-between items-center text-base">
                  <div className="text-[15px] font-normal text-[#777]">
                    Total
                  </div>
                  <div className="text-[17px] font-semibold">
                    ₹{orderDetails.totalAmount ? orderDetails.totalAmount : 0}
                    .00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
