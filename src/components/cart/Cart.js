"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoveLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import ProductSuggestion from "../common/product/ProductSuggestion";
import {
  BindCartIdToUserId,
  productListByCart,
} from "@/Service/AddTocart/AddToCart.service";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import CartCard from "../common/Cart/CartCard";
import { useAppContext } from "@/context";
import EmptyCart from "./EmptyCart";
import { couponApplyApiHandler } from "@/Service/Coupon/coupon.service";
import { checkOutApiHandler } from "@/Service/Checkout/Checkout.service";
import { errorNotification, successNotification } from "@/helper/Notification";

export default function Cart() {
  const router = useRouter();
  const cookies = new Cookies();
  const cartId = cookies.get("CARTID");
  const BindFlag = cookies.get("bindFlag");
  const userDetails = cookies.get("USERDETAILS");
  const [cartList, setCartList] = useState([]);
  const { setCartLength } = useAppContext();
  const [cartSummary, setCartSummary] = useState({});
  const [coupanApplyFlag, setCoupanApplyFlag] = useState(false);
  const [coupanText, setCoupanText] = useState("");
  const [checkoutFlag, setCheckoutFlag] = useState(false);

  useEffect(() => {
    if (cartId) {
      getProductListByCartId(cartId);
    }
  }, []);

  const couponApplyHandler = async () => {
    const payload = {
      couponCode: coupanText,
      amount: 1000,
      // amount:cartSummary.subtotal || 1000,
      cartId: cartId,
    };
    const { count, data, message, success } = await couponApplyApiHandler(
      payload
    );
    if (success) {
      setCoupanApplyFlag(true);
    } else {
      errorNotification(message);
      setCoupanApplyFlag(false);
    }
  };

  const checkoutHandler = async (cartId) => {
    try {
      console.log("Details-->",userDetails);
      if(userDetails){
        setCheckoutFlag(true);
        const { data, message, success } = await checkOutApiHandler(cartId);
        if (success) {
          successNotification(message);
          router.push(`/check-out`);
        } else {
          errorNotification(message);
        }
      }else{
        router.push(`/login`);
      }
    } catch (err) {
      console.log("error: " + err);
    } finally {
      setCheckoutFlag(false);
    }
  };

  useEffect(() => {
    if (!BindFlag && cartId && userDetails) {
      bindCartIdToUser(cartId, userDetails?.id);
    }
  }, []);

  const bindCartIdToUser = async (cartId, userId) => {
    const { data, message, success } = await BindCartIdToUserId(cartId, userId);
    if (success) {
      cookies.set("bindFlag", true);
    } else {
      cookies.set("bindFlag", false);
    }
  };

  const getProductListByCartId = async (cartId) => {
    const { data, message, success } = await productListByCart(cartId);
    if (success) {
      setCartList(data.cartData);
      setCartLength(data.cartData.length);
      setCartSummary(data.cart);
    } else {
      setCartList([]);
      setCartSummary({});
      setCartLength(0);
    }
  };

  const callBackHandler = () => {
    getProductListByCartId(cartId);
  };

  return (
    <div className="lg:my-20 md:my-16 sm:my-10 my-5">
      {cartList && cartList.length > 0 ? (
        <div className="container px-3 sm:px-6">
          <div>
            <div>
              <div>
                <div className="sm:text-2xl text-xl font-semibold sm:mb-5 mb-3">
                  Shopping Cart
                  <sup className="font-medium">{`(${cartList.length})`}</sup>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
                <div className="lg:col-span-4">
                  <Table className="border">
                    <TableHeader>
                      <TableRow>
                        <TableHead></TableHead>
                        <TableHead>Products</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead className="text-center">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartList.map((item, index) => {
                        return (
                          <CartCard
                            cartDetails={item}
                            quantityUpdate={true}
                            index={index}
                            cartId={cartId}
                            callBackHandler={callBackHandler}
                          />
                        );
                      })}
                    </TableBody>
                  </Table>
                  <div
                    className="flex gap-2 items-center mt-2 cursor-pointer"
                    onClick={() => router.push("/product")}
                  >
                    <MoveLeft className="w-4" />
                    <div className="text-sm">Continue Shopping</div>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="border px-4 py-3">
                    <div className="flex flex-col gap-[6px]">
                      <div className="sm:text-xl text-lg font-semibold mb-1">
                        Summary
                      </div>
                      <div className="flex justify-between">
                        <div className="sm:text-base text-sm font-normal text-[#5D5F5F]">
                          Subtotal
                        </div>
                        <div className="sm:text-base text-sm font-semibold">
                          {" "}
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
                        <div className="sm:text-base text-sm font-semibold">
                          Free
                        </div>
                      </div>
                      {cartSummary.discountAmount !== 0 && (
                        <div className="flex justify-between">
                          <div className="sm:text-base text-sm font-normal text-[#5D5F5F]">
                            Discount amount
                          </div>
                          <div className="sm:text-base text-sm font-semibold">
                            {cartSummary.discountAmount}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="py-3">
                      <Separator />
                    </div>
                    <div>
                      <div className="font-normal text-[#5D5F5F] mb-2 sm:text-base text-sm">
                        Discount Code
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter coupon"
                          onChange={(event) =>
                            setCoupanText(event.target.value)
                          }
                        />
                        <Button
                          size="sm"
                          className="px-5 py-2 !text-sm h-auto"
                          disabled={!coupanText}
                          onClick={() => couponApplyHandler()}
                        >
                          Apply
                        </Button>
                      </div>
                        {coupanApplyFlag && <h3>{`Coupan applied`}</h3>}
                    </div>
                    <div className="py-5">
                      <Separator />
                    </div>
                    <div>
                      <div className="flex justify-between items-center">
                        <div className="font-normal text-[#5D5F5F] sm:text-base text-sm">
                          Total
                        </div>
                        <div className="font-semibold sm:text-xl text-lg">
                          ₹{" "}
                          {cartSummary.payableAmount
                            ? cartSummary.payableAmount
                            : 0.0}
                        </div>
                      </div>

                      <div className="mt-3">
                        <Button
                          size="sm"
                          disabled={checkoutFlag}
                          loading={checkoutFlag}
                          onClick={() => checkoutHandler(cartId)}
                          className="px-5 py-3 !text-sm h-auto w-full bg-black hover:bg-black/85 shadow-none"
                        >
                          Proceed to Checkout
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-center">
                      <Image
                        src={"/CartCard.svg"}
                        alt=""
                        width={194}
                        height={41}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:my-10 md:my-8 my-6">
              <Separator />
            </div>
            <div>
              <ProductSuggestion head="Products" para="Related Products" />
            </div>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
