"use client";
import Image from "next/image";
import Heading from "../common/Heading";
import ProductCard from "../common/product/ProductCard";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import QtyCard from "../common/product/QtyCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Flag, MoveLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import ProductSuggestion from "../common/product/ProductSuggestion";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { wishListByApiUser } from "@/Service/WishList/WishList.service";
import WishListCard from "./WishListCard";
import { productListByCart } from "@/Service/AddTocart/AddToCart.service";
import { useAppContext } from "@/context";

export default function Wishlist() {
  const router = useRouter();
  const cookies = new Cookies();
  const userId = cookies.get("token");
  const cartId = cookies.get("CARTID");
  const [wishListData, setWishListData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [pageSize, setPageSize] = useState("5");
  const [currentPage, setCurrentPage] = useState(1);
  const { setCartLength } = useAppContext();
  const [wishListLoaderFlag, setWishListLoaderFlag] = useState(false);

  useEffect(() => {
    wishListByApiUserHandler(pageSize, currentPage);
  }, []);

  const handlePageChange = (value) => {
    setCurrentPage(value);
    wishListByApiUserHandler(pageSize, value);
  };

  const wishListByApiUserHandler = async (pageSize, currentPage) => {
    try {
      setWishListLoaderFlag(true);
      const { count, data, message, success } = await wishListByApiUser(
        pageSize,
        currentPage
      );
      if (success) {
        setTotalPage(Math.ceil(count / pageSize));
        setWishListData(data);
      } else {
        setTotalPage(0);
        setWishListData([]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setWishListLoaderFlag(false);
    }
  };

  const getProductListByCartId = async (cartId) => {
    const { data, message, success } = await productListByCart(cartId);
    if (success) {
      setCartLength(data.length);
    } else {
      setCartLength(0);
    }
  };

  const callbackHandler = () => {
    wishListByApiUserHandler(pageSize, currentPage);
    getProductListByCartId(cartId);
  };

  return (
    <div className="lg:my-20 md:my-16 sm:my-10 my-5">
      <div className="container px-3 sm:px-6">
        <div>
          <div>
            <div>
              <div className="sm:text-2xl text-xl font-semibold sm:mb-5 mb-3">My Wishlist</div>
            </div>
            <div className="grid grid-cols-1 gap-5">
              <div className="col-span-1">
                <Table className="border">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Products</TableHead>
                      <TableHead className="text-center">Total</TableHead>
                      <TableHead className="text-center">Availabel</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-end"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {wishListData && wishListData.length > 0 ? (
                      wishListData.map((item, index) => {
                        return (
                          <WishListCard wishlistDetails={item} index={index} callbackHandler={() => callbackHandler()} />
                        );
                      })
                    ) : (
                      <div className="text-[#5D5F5F] text-center">
                        No Product Found
                      </div>
                    )}
                  </TableBody>
                </Table>
                <div className="mt-2">
                  <Pagination>
                    <PaginationContent className="md:gap-2 gap-1">
                      <PaginationItem>
                        <PaginationPrevious
                          disabled={currentPage === 1}
                          onClick={() =>
                            currentPage !== 1 &&
                            handlePageChange(currentPage - 1)
                          }
                        />
                      </PaginationItem>
                      {[...Array(totalPage).keys()].map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            isActive={currentPage == page + 1}
                            onClick={() => handlePageChange(page + 1)}
                          >
                            {page + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          disabled={currentPage === totalPage}
                          onClick={() =>
                            currentPage !== totalPage &&
                            handlePageChange(currentPage + 1)
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
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
          <div className="lg:my-10 md:my-8 my-6">
            <Separator />
          </div>
          <div>
            <ProductSuggestion head="Products" para="Continue shopping for" />
          </div>
        </div>
      </div>
    </div>
  );
}
