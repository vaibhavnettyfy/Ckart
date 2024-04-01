"use client";
import ProductCard from "../common/product/ProductCard";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import Cookies from "universal-cookie";
import { getAllCategoryApiList } from "@/Service/Category/Category.service";
import { ProductAllListApiHandler } from "@/Service/Product/Product.service";
export default function Product() {
  const cookies = new Cookies();
  const [categoryList, setCategoryList] = useState([]);
  const [categoryLoader, setCategoryLoader] = useState(false);
  const [productLoader, setProductLoader] = useState(false);
  const [produtListData, setProductListData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [sponsor, setSponsor] = useState(0);
  const [pageSize, setPageSize] = useState("10");
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const userDetails = cookies.get("USERDETAILS");
  useEffect(() => {
    getAllCategoryList();
    getAllProductListHandler(
      searchText,
      pageSize,
      category,
      sponsor,
      currentPage
    );
  }, []);

  const getAllCategoryList = async () => {
    const { data, message, success, count } = await getAllCategoryApiList();
    setCategoryLoader(true);
    try {
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

  const searchHandler = (value) => {
    getAllProductListHandler(value, pageSize, category, sponsor, currentPage);
  };

  const categoryHandler = (value) => {
    setCategory(value);
    getAllProductListHandler(searchText, pageSize, value, sponsor, currentPage);
  };

  const getAllProductListHandler = async (
    searchText,
    pageSize,
    category,
    sponsor,
    page
  ) => {
    setProductLoader(true);
    const payload = {
      userId : userDetails.id ? userDetails.id : ""
    }
    try {
      const { count, data, message, success } = await ProductAllListApiHandler(
        searchText,
        pageSize,
        category,
        sponsor,
        page,payload
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
    getAllProductListHandler(searchText, pageSize, category, sponsor, value);
  };

  const callBackHandler = () =>{
    getAllProductListHandler(
      searchText,
      pageSize,
      category,
      sponsor,
      currentPage
    );
  };

  return (
    <div className="my-20">
      <div className="container px-3 sm:px-6">
        <div className="grid grid-cols-4 gap-5">
          <div className="col-span-1">
            <div>
              <div className="text-lg font-medium uppercase text-[#191C1F] mb-3">
                Category
              </div>
              <div>
                <RadioGroup
                  defaultValue="comfortable"
                  onValueChange={(event) => categoryHandler(event)}
                >
                  {categoryList && categoryList.length > 0 ? (
                    categoryList.map((item, index) => {
                      return (
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem id={item.id} value={item.id} />
                          <Label className="text-[#475156]" htmlFor="r1">
                            {item.name}
                          </Label>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-[#5D5F5F] text-center">
                      No Category Found
                    </div>
                  )}
                </RadioGroup>
                {/* need to keep this commented as of now */}
                {/* <RadioGroup defaultValue="comfortable">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Bathroom_Fixtures" id="r2" />
                    <Label className="text-[#475156]" htmlFor="r2">
                      Bathroom Fixtures
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Electricals_Lighting" id="r3" />
                    <Label className="text-[#475156]" htmlFor="r3">
                      Electricals & Lighting
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Tiles_Floorings" id="r4" />
                    <Label className="text-[#475156]" htmlFor="r4">
                      Tiles & Floorings
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Paints_Coatings" id="r5" />
                    <Label className="text-[#475156]" htmlFor="r5">
                      Paints & Coatings
                    </Label>
                  </div>
                </RadioGroup> */}
              </div>
            </div>
            <div className="mt-5 mb-3">
              <Separator />
            </div>
            {/* need to keep this commented  */}
            {/* <div>
              <div className="text-lg font-medium uppercase text-[#191C1F] mb-3">
                Location
              </div>
              <div>
                <div className="relative mx-auto text-gray-600 border">
                  <input
                    className="bg-white w-full md:px-4 px-3 md:py-[10px] py-2 pr-10 text-[#77878F] text-sm focus:outline-none"
                    type="search"
                    name="search"
                    onChange={(event)=>locationSearchHandler(event.target.value)}
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
              </div>
            </div> */}
          </div>
          <div className="col-span-3">
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
            <div className="grid grid-cols-3 gap-3 ">
              {produtListData && produtListData.length > 0 ? (
                produtListData.map((item, index) => {
                  return (
                    <div key={index} className="col-span-1">
                      <ProductCard productDetails={item} callBackHandler={callBackHandler}/>
                    </div>
                  );
                })
              ) : (
                <div className="text-[#5D5F5F] text-center">
                  No Product Found
                </div>
              )}
            </div>
            <div>
              <Pagination>
                <PaginationContent className="md:gap-2 gap-1">
                  <PaginationItem>
                    <PaginationPrevious
                      disabled={currentPage === 1}
                      onClick={() => currentPage !==1 && handlePageChange(currentPage - 1)}
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
        </div>
      </div>
    </div>
  );
}
