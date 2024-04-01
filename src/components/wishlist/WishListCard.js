"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import QtyCard from "../common/product/QtyCard";
import { removeproductApiWishlist } from "@/Service/WishList/WishList.service";
import { errorNotification, successNotification } from "@/helper/Notification";

function WishListCard({ index, wishlistDetails, callbackHandler }) {
  const { id, productId } = wishlistDetails || {};
  const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);

  const setQuantityHandler = (value) => {
    setQuantity(value);
  };

  const removeproductWishlist = async (id) => {
    const { count, data, message, success } = await removeproductApiWishlist(
      id
    );
    try {
      if (success) {
        successNotification(message);
        callbackHandler();
      } else {
        errorNotification(message);
      }
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  useEffect(() => {
    if (productId?.price) {
      setTotalAmount(productId?.price * quantity);
    } else {
      setTotalAmount(0 * quantity);
    }
  }, [quantity, productId?.price]);

  return (
    <TableRow key={index}>
      <TableCell>
        <div className="flex gap-3 items-center">
          <Image
            alt={""}
            width={100}
            height={80}
            className="w-[80px] object-contain"
            src={productId?.image ? productId?.image : "/ProductImage.svg"}
          />
          <div>
            <div className="font-semibold">
              {productId?.productName ? productId?.productName : "-"}
            </div>
            <div className="text-[13px] text-[#5D5F5F] my-[2px]">
              Diameter: 8mm
            </div>
            <div className="text-[13px] text-[#5D5F5F]">
              {`Pieces per Bundle: ${
                productId?.pieces ? productId?.pieces : 0
              }`}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="font-semibold text-center">
        ₹{totalAmount ? totalAmount : 0}
      </TableCell>
      <TableCell className="text-center">
        {productId.quantity ? <span className="text-green">In Stock</span> : <span className="text-[#DA3E31]">Out of stock</span>}
      </TableCell>
      <TableCell className="text-center">
        <div className="flex justify-center">
          <QtyCard className="w-[170px]" setQuantity={setQuantityHandler} />
        </div>
      </TableCell>
      <TableCell className="text-end">
        <div className="flex justify-end gap-3">
          <Button
            size={"sm"}
            variant="outline"
            className="!text-sm !capitalize px-5"
          >
            View Product
          </Button>
          <Button size={"sm"} className="!text-sm !capitalize px-5">
            Add to Cart
          </Button>
          <Button
            size={"sm"}
            onClick={() => removeproductWishlist(productId?.id)}
            className="!text-sm bg-[#DA3E31] hover:bg-[#DA3E31] !capitalize px-5"
          >
            remove
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default WishListCard;
