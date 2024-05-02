"use client";
import { useEffect } from "react";
import React, { useState } from "react";
import Image from "next/image";
import { getAllProdutsApiHandler } from "@/Service/Product/Product.service";
import { useRouter } from "next/navigation";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [productListData, setProductListData] = useState([]);

  useEffect(() => {
    getAllProductHandler();
  }, []);

  const productHandler = (cat, subCat) => {
    router.push(`/product/${cat}/${subCat ? subCat : ""}`);
  };

  const searchHandler = async (value) => {
    getAllProductHandler(value);
  };
  const getAllProductHandler = async (value) => {
    try {
      setLoading(true);
      const { count, data, message, success } = await getAllProdutsApiHandler(
        value
      );
      if (success) {
        setProductListData(data);
      } else {
        setProductListData([]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative mx-auto text-gray-600 xl:w-[550px] md:w-[350px]">
      <input
        className="bg-white w-full md:px-4 px-3 md:py-[10px] py-2 pr-10 rounded-md text-[#77878F] text-sm focus:outline-none"
        type="search"
        name="search"
        placeholder="Search for anything..."
        onChange={(event) => searchHandler(event.target.value)}
      />

      <button type="submit" className="absolute right-0 top-0 mt-[10px] mr-3">
        <Image
          src={"/header/Search.svg"}
          alt=""
          width={20}
          height={20}
          className="md:w-5 w-4 md:h-5"
        />
      </button>
      {productListData &&
        productListData.length > 0 &&
        productListData.map((response, index) => {
          return (
            <h3
              key={index}
              onClick={() =>
                productHandler(response.category, response.subcategoryid)
              }
            >
              {" "}
              {response.productName}
            </h3>
          );
        })}
      <h>Testing</h>
    </div>
  );
};

export default Search;
