import React, { useEffect, useState } from "react";
import Image from "next/image";
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
import QtyCard from "../product/QtyCard";
import { removeProductApiFromCart } from "@/Service/AddTocart/AddToCart.service";
import { errorNotification, successNotification } from "@/helper/Notification";

function CartCard({ cartDetails, index, cartId, callBackHandler }) {
  const { id, productId, quantity } = cartDetails || {};
  const [quantitys, setQuantitys] = useState(1);
  const [price, setPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const setQuantityHandler = (value) => {
    setQuantitys(value);
  };

  useEffect(() => {
    setTotalAmount(price * quantitys);
  }, [quantitys, price]);

  useEffect(() => {
    if (quantity) {
      setQuantitys(quantity);
      setPrice(productId?.price ? productId?.price : 0);
    }
  }, [quantity]);

  const removeProductFromCart = async (cartId, productId) => {
    const { data, message, success } = await removeProductApiFromCart(
      cartId,
      productId
    );
    if (success) {
      callBackHandler();
      successNotification(message);
    } else {
      errorNotification(message);
    }
  };

  return (
    <TableRow>
      <TableCell>
        <X onClick={() => removeProductFromCart(cartId, productId?.id)} />
      </TableCell>
      <TableCell>
        <div className="flex gap-3 items-center w-max">
          <Image
            alt={""}
            width={100}
            height={80}
            className="w-[80px] object-contain"
            src={productId?.image ? productId?.image : "/ProductImage.svg"}
          />
          <div>
            <div className="font-semibold">
              {productId?.productName ? `${productId.productName.slice(0, 20)}...` : "-"}
            </div>
            <div className="text-[13px] text-[#5D5F5F]">
              {`Pieces per Bundle: ${productId.pieces ? productId.pieces : 0}`}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-center">
        <div className="flex justify-center">
          <QtyCard
            className="w-[150px]"
            setQuantity={setQuantityHandler}
            quantity={quantitys}
          />
        </div>
      </TableCell>
      <TableCell className="font-semibold text-center">{`₹${totalAmount}.00`}</TableCell>
    </TableRow>
  );
}

export default CartCard;
