"use client";
import Image from "next/image";
import Heading from "../common/Heading";
import ProductCard from "../common/product/ProductCard";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import QtyCard from "../common/product/QtyCard";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoveLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import ProductSuggestion from "../common/product/ProductSuggestion";
import { BindCartIdToUserId, productListByCart } from "@/Service/AddTocart/AddToCart.service";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import {useDispatch} from "react-redux";
import CartCard from "../common/Cart/CartCard";
import { ADDTOCART } from "@/Redux/CartReducer";

export default function Cart() {
  const router = useRouter();
  const [cartList, setCartList] = useState([]);
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const cartId = cookies.get("CARTID");
  const userId = cookies.get("token");
  const BindFlag = cookies.get("bindFlag");
  const userDetails = cookies.get("USERDETAILS");

  useEffect(() => {
    if (cartId) {
      getProductListByCartId(cartId);
    }
  }, []);

  useEffect(()=>{
    if(!BindFlag && cartId && userDetails){
      bindCartIdToUser(cartId, userDetails?.id);
    }
  },[]);


  const bindCartIdToUser = async (cartId, userId) =>{
    const {data,message,success} = await BindCartIdToUserId(cartId, userId);
    if(success){
      cookies.set("bindFlag",true);
    }else{
      cookies.set("bindFlag",false);
    }
  };

  const getProductListByCartId = async (cartId) => {
    const { data, message, success } = await productListByCart(cartId);
    if (success) {
      setCartList(data);
      dispatch(ADDTOCART(data));
    } else {
      setCartList([]);
      dispatch(ADDTOCART([]));
    }
  };

  const callBackHandler = ()=>{
    getProductListByCartId(cartId);
  };

  return (
    <div className="my-20">
      <div className="container px-3 sm:px-6">
        <div>
          <div>
            <div>
              <div className="text-2xl font-semibold mb-5">
                Shopping Cart
                <sup className="font-medium">{`(${cartList.length})`}</sup>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-5">
              <div className="col-span-4">
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
                  {
                    cartList && cartList.length > 0 ? (
                      cartList.map((item,index)=>{
                        return(
                          <CartCard cartDetails={item} index={index} cartId={cartId} callBackHandler={callBackHandler}/>
                        )
                      })
                    ) : (
                      <div className="text-[#5D5F5F] text-center">
                      No Product Found in Cart
                    </div>
                    )
                  }
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
              <div className="col-span-2">
                <div className="border px-4 py-3">
                  <div className="flex flex-col gap-[6px]">
                    <div className="text-xl font-semibold mb-1">Summary</div>
                    <div className="flex justify-between">
                      <div className="font-normal text-[#5D5F5F]">Subtotal</div>
                      <div className="font-semibold">₹1500.00</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-normal text-[#5D5F5F]">Shipping</div>
                      <div className="font-semibold">Free</div>
                    </div>
                  </div>
                  <div className="py-3">
                    <Separator />
                  </div>
                  <div>
                    <div className="font-normal text-[#5D5F5F] mb-2">
                      Discount Code
                    </div>
                    <div className="flex gap-2">
                      <Input placeholder="Enter coupon" />
                      <Button size="sm" className="px-5 py-2 !text-sm h-auto">
                        Apply
                      </Button>
                    </div>
                  </div>
                  <div className="py-5">
                    <Separator />
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <div className="font-normal text-[#5D5F5F]">Total</div>
                      <div className="font-semibold text-xl">₹1500.00</div>
                    </div>
                    <div className="mt-3">
                      <Button
                        size="sm"
                        onClick={() => router.push("/check-out")}
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
          <div className="my-10">
            <Separator />
          </div>
          <div>
            <ProductSuggestion head="Products" para="Related Products" />
          </div>
        </div>
      </div>
    </div>
  );
}
