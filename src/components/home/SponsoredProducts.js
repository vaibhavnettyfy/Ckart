"use client";
import React, { useEffect, useState } from "react";
import Heading from "../common/Heading";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import ProductCard from "../common/product/ProductCard";
import { ProductAllListApiHandler } from "@/Service/Product/Product.service";

const SponsoredProducts = () => {
  const [productLoader, setProductLoader] = useState(false);
  const [produtListData, setProductListData] = useState([]);
  const [pageSize, setPageSize] = useState("5");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [sponsor, setSponsor] = useState(1);
  useEffect(() => {
    getAllSponserdProducts(
      searchText,
      pageSize,
      category,
      sponsor,
      currentPage
    );
  }, []);

  const getAllSponserdProducts = async (
    searchText,
    pageSize,
    category,
    sponsor,
    page
  ) => {
    setProductLoader(true);
    try {
      const { count, data, message, success } = await ProductAllListApiHandler(
        searchText,
        pageSize,
        category,
        sponsor,
        page
      );
      if (success) {
        setProductListData(data);
        setTotalPage(Math.ceil(count / pageSize));
      } else {
        setProductListData([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProductLoader(false);
    }
  };

  const handlePageChange = (value) =>{
    setCurrentPage(value);
    getAllSponserdProducts(
      searchText,
      pageSize,
      category,
      sponsor,
      value
    );
  }

  return (
    <div className="z-20 relative lg:py-16 md:py-12 sm:py-8 py-5 md:my-10 sm:my-8 my-5">
      <div className="container px-3 sm:px-6">
        <Heading head={"Sponsored Products"} para={"Sponsored Products"} />
      </div>
      <div className="md:py-10 sm:py-8 py-5 container px-3 sm:px-6">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 lg:gap-5 md:gap-3 gap-2">
          {produtListData && produtListData.length > 0 ? (
            produtListData.map((item, index) => {
              return (
                <div key={index} className="col-span-1">
                  <ProductCard productDetails={item} />
                </div>
              );
            })
          ) : (
            <div className="text-[#5D5F5F] text-center">No Product Found</div>
          )}
        </div>
      </div>
      <div>
        <Pagination>
                <PaginationContent className="md:gap-2 gap-1">
                  <PaginationItem>
                    <PaginationPrevious
                      disabled={currentPage === 1}
                      onClick={() => currentPage !==1 &&  handlePageChange(currentPage - 1)}
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
                      onClick={() => currentPage !== totalPage  && handlePageChange(currentPage + 1)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
      </div>
    </div>
  );
};

export default SponsoredProducts;
