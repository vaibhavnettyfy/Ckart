import { useEffect, useRef } from "react";
import React, { useState } from "react";
import Image from "next/image";
import { getAllProdutsApiHandler } from "@/Service/Product/Product.service";
import { useRouter } from "next/navigation";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [productListData, setProductListData] = useState([]);
  const [productName, setProductName] = useState('');
  const [showProductList, setShowProductList] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowProductList(false);
    }
  };

  useEffect(() => {
    getAllProductHandler();
  }, []);

  const productHandler = (cat, subCat) => {
    router.push(`/product/${cat}/${subCat ? subCat : ""}`);
  };

  const searchHandler = async (value) => {
    getAllProductHandler(value);
    setProductName(value);
    setShowProductList(true);
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
    <div ref={searchRef} className="relative mx-auto text-gray-600 xl:w-[550px] md:w-[350px]">
      <input
        className="bg-white w-full md:px-4 px-3 md:py-[10px] py-2 pr-10 rounded-md text-[#77878F] text-sm focus:outline-none"
        type="search"
        name="search"
        placeholder="Search for anything..."
        autoComplete="off"
        value={productName}
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
      {showProductList && (
        <div className="bg-white absolute md:top-11 top-10 p-2 shadow-md max-h-[300px] overflow-auto w-full">
          {productListData && productListData.length > 0 ? (
            productListData.map((response, index) => {
              return (
                <div
                  className="px-3 py-1 text-sm hover:bg-accent cursor-pointer"
                  key={index}
                  onClick={() => {
                    productHandler(response.category, response.subcategoryid);
                    setProductName(response?.productName);
                    setShowProductList(false);
                  }}
                >
                  {response.productName}
                </div>
              );
            })
          ) : (
            <div className="px-3 py-1 text-center">No Data Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
