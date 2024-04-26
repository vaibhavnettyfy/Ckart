"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { userProfileApiHandler } from "@/Service/UserProfile/UserProfile.service";
import SelectAddress from "./SelectAddress";
import ShippingAddress from "../common/modal/ShippingAddress";
import { placeOrderApiHandler } from "@/Service/PlaceOrder/PlaceOrder.service";
import { errorNotification, successNotification } from "@/helper/Notification";
import { productListByCart } from "@/Service/AddTocart/AddToCart.service";

export default function CheckOut() {
  const router = useRouter();
  const cookies = new Cookies();
  const cartId = cookies.get("CARTID");
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAdress] = useState([]);
  const [selectedBillAddress, setSelectedBillAddress] = useState();
  const userDetails = cookies.get("USERDETAILS");
  const [cartSummary, setCartSummary] = useState({});
  const [notes, setNotes] = useState("");
  const [selectedShippingAdd, setSelectedShippingAdd] = useState("");
  const [summaryLoader, setSummaryLoader] = useState(false);
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    if (cartId) {
      getProductListByCartId(cartId);
    }
  }, []);

  const getProductListByCartId = async () => {
    try {
      setSummaryLoader(true);
      const { data, message, success } = await productListByCart(cartId);
      console.log("datadatadatadata-data", data);
      if (success) {
        setCartList(data.cartData);
        setCartSummary(data.cart);
      } else {
        setCartList([]);
        setCartSummary(data);
      }
    } catch (err) {
    } finally {
      setSummaryLoader(false);
    }
  };

  const placeOrderHandler = async () => {
    const payload = {
      userId: userDetails?.id,
      shippingAddress: selectedShippingAdd,
      billingAddress: selectedBillAddress,
      notes: notes,
      cartId: cartId,
    };
    const { count, data, message, success } = await placeOrderApiHandler(
      payload
    );
    if (success) {
      router.push("/order-placed");
      successNotification(message);
    } else {
      errorNotification(message);
    }
  };

  const getshippingAddress = async (userId) => {
    try {
      setLoading(true);
      const { data, message, success } = await userProfileApiHandler(userId);
      const isBillingAddress =
        data.userAddress &&
        data.userAddress.filter((res) => res.isBillingAddress === 1);
      console.log("isBillingAddress", isBillingAddress);
      setSelectedBillAddress(isBillingAddress[0].id);
      const isShippingAddress =
        data.userAddress &&
        data.userAddress.filter((res) => res.isBillingAddress === 0);
      setShippingAdress(isShippingAddress);
      if (isShippingAddress) {
        setSelectedShippingAdd(isShippingAddress[0].id);
      }
      console.log("isShippingAddress", isShippingAddress);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getshippingAddress(userDetails?.id);
  }, []);

  const selectAddresHandler = (data) => {
    console.log(data, "selectData");
    setSelectedShippingAdd(data);
  };

  const callBackHandler = () =>{
    getshippingAddress(userDetails?.id);
  };

  return (
    <div className="lg:my-20 md:my-16 sm:my-12 my-8">
      <div className="container px-3 sm:px-6">
        <div>
          <div>
            <div></div>
            <div className="grid lg:grid-cols-6 gap-5 ">
              <div className="lg:col-span-4 bill_info_area">
                <div className="flex flex-wrap justify-between items-center gap-1 mb-3">
                  <div className="sm:text-2xl text-xl font-semibold">
                    Shipping Information
                  </div>
                  <ShippingAddress callBackHandler={callBackHandler}/>
                </div>
                {loading ? (
                  <></>
                ) : (
                  <SelectAddress
                    shippingAddress={shippingAddress}
                    selectAddressHandler={selectAddresHandler}
                    selectedShippingAdd={selectedShippingAdd}
                  />
                )}
                <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-3 gap-2">
                  <div className="sm:text-lg font-medium mt-3 sm:col-span-2">
                    Additional Information
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="">
                      Order Notes{" "}
                      <span className="text-[#929FA5]">(Optional)</span>
                    </Label>
                    <Textarea
                      placeholder="Notes about your order, e.g. special notes for delivery"
                      onChange={(event) => setNotes(event.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="border px-4 py-3">
                  <div className="flex flex-col gap-[6px]">
                    <div className="sm:text-xl text-lg font-semibold mb-1">
                      Order Summary
                    </div>
                    <div className="grid gap-2 py-2 px-2">
                      {cartList &&
                        cartList.length > 0 &&
                        cartList.map((response, index) => {
                          const {amount,price,quantity,productId} = response;
                          return (
                            <div className="flex sm:gap-3 gap-2 items-center">
                              <Image
                                alt={""}
                                width={80}
                                height={80}
                                className="sm:w-[70px] w-[50px] object-contain"
                                src={productId.image ? productId.image :"/ProductImage.svg" }
                              />
                              <div>
                                <div className="sm:text-base text-sm font-semibold mb-1">
                                  {productId.productName ? productId.productName : '-'}
                                </div>
                                <div className="sm:text-sm text-xs text-[#5D5F5F]">
                                  {quantity} x{" "}
                                  <span className="sm:text-base text-sm text-primary-foreground font-semibold">
                                    ₹ {productId?.price ? productId?.price : 0}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className="py-3">
                    <Separator />
                  </div>
                  <div className="flex flex-col gap-[6px] text-base">
                    <div className="flex justify-between">
                      <div className="sm:text-base text-sm font-normal text-[#5D5F5F]">
                        Subtotal
                      </div>
                      <div className="sm:text-base text-sm font-medium">
                        ₹{" "}
                        {cartSummary.subtotal
                          ? ` ${cartSummary.subtotal}`
                          : 0.0}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="sm:text-base text-sm font-normal text-[#5D5F5F]">
                        Shipping
                      </div>
                      <div className="sm:text-base text-sm font-medium">
                        Free
                      </div>
                    </div>
                    {cartSummary.discountAmount !== 0 && (
                      <div className="flex justify-between">
                        <div className="sm:text-base text-sm font-normal text-[#5D5F5F]">
                          Discount
                        </div>
                        <div className="sm:text-base text-sm font-medium">
                          ₹
                          {cartSummary.discountAmount
                            ? cartSummary.discountAmount
                            : 0}
                        </div>
                      </div>
                    )}
                    {cartSummary.taxValue !== 0 ||
                      (cartSummary.taxValue && (
                        <div className="flex justify-between">
                          <div className="sm:text-base text-sm font-normal text-[#5D5F5F]">
                            Tax
                          </div>
                          <div className="sm:text-base text-sm font-medium">
                            ₹{cartSummary.taxValue ? cartSummary.taxValue : 0}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="sm:py-5 py-3">
                    <Separator />
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-base">
                      <div className="sm:text-base text-sm font-normal text-[#5D5F5F]">
                        Total
                      </div>
                      <div className="sm:text-base text-sm font-semibold">
                        ₹{" "}
                        {cartSummary.payableAmount
                          ? cartSummary.payableAmount
                          : 0}
                      </div>
                    </div>
                    <div className="mt-5">
                      <Button
                        size="lg"
                        onClick={() => placeOrderHandler()}
                        className="shadow-none w-full"
                      >
                        <div className="flex gap-2 items-center">
                          <div>Place Order</div>
                          <Image
                            alt={""}
                            width={20}
                            height={20}
                            className="w-[18px] object-contain rounded-lg"
                            src={"/ArrowRight.svg"}
                          />
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
