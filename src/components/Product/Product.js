"use client";
import ProductCard from "../common/product/ProductCard";
import { Separator } from "../ui/separator";
import Search from "../common/Search";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Checkbox } from "../ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Cookies from "universal-cookie";
import {
  categorySubCategoryList,
} from "@/Service/Category/Category.service";
import { ProductAllListApiHandler } from "@/Service/Product/Product.service";
import { productListByCart } from "@/Service/AddTocart/AddToCart.service";
import { useAppContext } from "@/context";
export default function Product({categories,subCategories}) {
  const cookies = new Cookies();
  const [categoryList, setCategoryList] = useState([]);
  const [categoryLoader, setCategoryLoader] = useState(false);
  const [productLoader, setProductLoader] = useState(false);
  const [produtListData, setProductListData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [sponsor, setSponsor] = useState(0);
  const [pageSize, setPageSize] = useState("10");
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const userDetails = cookies.get("USERDETAILS");
  const cartId = cookies.get("CARTID");
  const [catSubId, setCatSubId] = useState("");
  const { setCartLength } = useAppContext();
  const [checkId, setCheckId] = useState("");
  const [subCheckId, setSubCheckId] = useState("");

  useEffect(() => {
    if (cartId) {
      getProductListByCartId(cartId);
    }
  }, []);

  // get all Data of categories and Sub-Categories
  const getAlllist = async () => {
    try {
      setCategoryLoader(true);
      const { data, message, success } = await categorySubCategoryList();
      if (success) {
        setCategoryList(data);
      } else {
        setCategoryList([]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setCategoryLoader(false);
    }
  };
  useEffect(() => {
    getAlllist();
    getAllProductListHandler(
      searchText,
      pageSize,
      category,
      subCategory,
      sponsor,
      currentPage
    );
  }, [category,subCategory]);

  useEffect(()=>{
    if(categories){
      setCategory(categories);
      setCheckId(categories);
    }
    if(subCategories){
      setSubCategory(subCategories);
      setSubCheckId(subCategories);
    }
  },[])

  const getProductListByCartId = async (cartId) => {
    const { data, message, success } = await productListByCart(cartId);
    if (success) {
      setCartLength(data.length);
    } else {
      setCartLength(0);
    }
  };

  const searchHandler = (value) => {
    getAllProductListHandler(value, pageSize, category, subCategory, sponsor, currentPage);
  };

  const categoryHandler = (value) => {
    setCategory(value);
    setSubCategory("");
    getAllProductListHandler(searchText, pageSize, value, subCategory, sponsor, currentPage);
  };

  const subCategoryHandler = (value) => {
    setSubCategory(value);
    setCategory("");
    getAllProductListHandler(searchText, pageSize, category, value, sponsor, currentPage);
  };

  const getAllProductListHandler = async (
    searchText,
    pageSize,
    category,
    subCategory,
    sponsor,
    page
  ) => {
    setProductLoader(true);
    const payload = {
      userId: userDetails?.id ? userDetails?.id : "",
    };
    try {
      const { count, data, message, success } = await ProductAllListApiHandler(
        searchText,
        pageSize,
        category,
        subCategory,
        sponsor,
        page,
        payload
      );
      if (success) {
        setProductListData(data);
        setTotalPage(Math.ceil(count / pageSize));
      } else {
        setTotalPage(0);
        setProductListData([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProductLoader(false);
    }
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
    getAllProductListHandler(searchText, pageSize, category, subCategory, sponsor, value);
  };

  const callBackHandler = () => {
    getAllProductListHandler(
      searchText,
      pageSize,
      category,
      subCategory,
      sponsor,
      currentPage
    );
    getProductListByCartId(cartId);
  };

  return (
    <div className="lg:my-20 md:my-16 sm:my-10 my-5">
      <div className="container px-3 sm:px-6">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-5">
          <div className="col-span-1">
            <div>
              <div className="text-lg font-medium uppercase text-[#191C1F] mb-3">
                Category
              </div>
              <div>
                <Accordion type="single" collapsible className="w-full">
                  {categoryList && categoryList.length > 0 ? (
                    categoryList.map((response, index) => {
                      return (
                        <AccordionItem value={response.id}>
                          <AccordionTrigger>
                            <div className="flex items-center space-x-2 col-span-2 mt-2">
                              <input
                                type="checkbox"
                                id={response.id}
                                value={response.id}
                                checked={response.id == checkId}
                                onChange={(event) => [
                                  categoryHandler(event.target.value),
                                  setCheckId(event.target.value),
                                  setSubCheckId("")
                                ]}
                              />
                              <label
                                htmlFor=""
                                className="text-sm font-medium leading-none text-[#475156] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {response?.name ? response.name : "-"}
                              </label>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="px-4">
                              {response?.subCategorys &&
                                response?.subCategorys.length > 0 ? (
                                response?.subCategorys.map((item, index) => {
                                  return (
                                    <div className="flex items-center space-x-2 col-span-2 mt-2">
                                      <input
                                        type="checkbox"
                                        id={item.id}
                                        value={item.id}
                                        checked={item.id == subCheckId}
                                        onChange={(event) => [
                                          subCategoryHandler(event.target.value),
                                          setSubCheckId(event.target.value),
                                          setCheckId("")
                                        ]}
                                      />
                                      <label
                                        htmlFor=""
                                        value={item.id}
                                        className="text-sm font-medium leading-none text-[#475156] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                      >
                                        {item.name ? item.name : "-"}
                                      </label>
                                    </div>
                                  );
                                })
                              ) : (
                                <div className="text-[#5D5F5F] text-center">
                                  No SubCategory Found
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })
                  ) : (
                    <div className="text-[#5D5F5F] text-center">
                      No Category Found
                    </div>
                  )}
                </Accordion>
              </div>
            </div>
            <div className="mt-5 mb-3">
              <Separator />
            </div>
          </div>
          <div className="md:col-span-3">
            <div className="relative text-gray-600 border w-[300px]">
              <input
                className="bg-white w-full md:px-4 px-3 md:py-[10px] py-2 pr-10 text-[#77878F] text-sm focus:outline-none"
                type="search"
                onChange={(event) => searchHandler(event.target.value)}
                name="search"
                placeholder="Search for anything..."
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-[10px] mr-3"
              >
                <Image
                  src={"/header/Search.svg"}
                  alt=""
                  width={20}
                  height={20}
                  className="md:w-5 w-4 md:h-5"
                />
              </button>
            </div>
            <div className="my-3">
              <div className="bg-[#F2F4F5] flex justify-between px-4 py-3 rounded-lg">
                <div></div>
                <div className="text-xs">
                  <span className="font-semibold">
                    {produtListData ? produtListData.length : 0}
                  </span>{" "}
                  Results found.
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 grid-cols-2 lg:gap-5 sm:gap-3 gap-2">
              {produtListData && produtListData.length > 0 ? (
                produtListData.map((item, index) => {
                  return (
                    <div key={index} className="col-span-1">
                      <ProductCard
                        productDetails={item}
                        callBackHandler={callBackHandler}
                      />
                    </div>
                  );
                })
              ) : (
                <div className="text-[#5D5F5F] text-center">
                  No Product Found
                </div>
              )}
            </div>
            <div className="mt-2">
              <Pagination>
                <PaginationContent className="md:gap-2 gap-1">
                  <PaginationItem>
                    <PaginationPrevious
                      disabled={currentPage === 1}
                      onClick={() =>
                        currentPage !== 1 && handlePageChange(currentPage - 1)
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
          </div>
        </div>
      </div>
    </div>
  );
}
