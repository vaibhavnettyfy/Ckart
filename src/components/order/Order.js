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
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { getAllOrderHistoryApiHandler } from "@/Service/Order/Order.service";
import moment from "moment";
import EmptyCart from "../cart/EmptyCart";

export default function Order() {
  const router = useRouter();
  const cookies = new Cookies();
  const [loading, setLoading] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const userDetails = cookies.get("USERDETAILS");

  useEffect(() => {
    getOrderHistoryHandler(userDetails?.id);
  }, []);

  const renderStatus = (status) => {
    switch (status) {
      case 0:
        return <span className="text-yellow-500">Pending</span>;
      case 1:
        return <span className="text-blue-500">Confirmed</span>;
      case 2:
        return <span className="text-yellow-500">Packing</span>;
      case 3:
        return <span className="text-yellow-500">Transport</span>;
      case 4:
        return <span className="text-green-500">Delivered</span>;
      case 5:
        return <span className="text-red-500">Cancelled</span>;
      case 6:
        return <span className="text-red-500">Refunded</span>;
      default:
        return <span className="text-gray-500">Unknown</span>;
    }
  };

  const getOrderHistoryHandler = async (userId) => {
    try {
      setLoading(true);
      const { count, data, message, success } =
        await getAllOrderHistoryApiHandler(userId);
      if (success) {
        setOrderHistory(data);
      } else {
        setOrderHistory([]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const orderDetailsHandler = (id) => {
    router.push(`/order-details/${id}`);
  };

  return (
    <div className="lg:my-20 md:my-16 sm:my-10 my-5">
      <div className="container px-3 sm:px-6">
        <div>
          <div>
            <div>
              <div className="sm:text-2xl text-xl font-semibold sm:mb-5 mb-3">
                Order History
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5">
              <div className="col-span-1">
                <Table className="border">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order No</TableHead>
                      <TableHead className="text-center">Discount</TableHead>
                      <TableHead className="text-center">Total</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Date & Time</TableHead>
                      <TableHead className="text-end"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <> </>
                    ) : orderHistory && orderHistory.length > 0 ? (
                      orderHistory.map((response, index) => {
                        const {
                          billingAddress,
                          couponCode,
                          couponId,
                          createdAt,
                          deliveryDate,
                          discountAmount,
                          id,
                          notes,
                          orderNumber,
                          orderProduct,
                          orderStatus,
                          paymentMethod,
                          paymentStatus,
                          shippingAddress,
                          subtotal,
                          tcs,
                          tds,
                          totalAmount,
                          transactionId,
                          transpoterId,
                          userId,
                          vehicalNumber,
                        } = response;

                        return (
                          <TableRow
                            key={index}
                            onClick={() => orderDetailsHandler(id)}
                          >
                            <TableCell>
                              {orderNumber ? orderNumber : "-"}
                            </TableCell>
                            <TableCell className="text-center">
                              ₹ {discountAmount ? ` ${discountAmount}` : "-"}
                            </TableCell>

                            <TableCell className="font-semibold text-center">
                              ₹ {totalAmount ? ` ${totalAmount}` : 0}
                            </TableCell>
                            <TableCell className="text-center text-green font-semibold uppercase">
                              {renderStatus(orderStatus)}
                            </TableCell>
                            <TableCell className="text-center">
                              {deliveryDate
                                ? moment(deliveryDate).format(
                                    "DD-MM-YYYY & HH:mm"
                                  )
                                : "-"}
                            </TableCell>

                            <TableCell className="text-end">
                              <Button
                                size={"sm"}
                                className="!text-sm !capitalize px-5"
                              >
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <EmptyCart />
                    )}
                  </TableBody>
                </Table>
                <div
                  className="flex gap-2 items-center mt-2 cursor-pointer"
                  onClick={() => router.push("/")}
                >
                  <MoveLeft className="w-4" />
                  <div className="text-sm">Back to Home</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
