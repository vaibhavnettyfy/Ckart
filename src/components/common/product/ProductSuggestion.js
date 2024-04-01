import { SponsoredProducts } from "@/components/home";
import Heading from "../Heading";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { ProductAllListApiHandler } from "@/Service/Product/Product.service";
import Cookies from "universal-cookie";

export default function ProductSuggestion({ head, para }) {
  const [searchText, setSearchText] = useState("");
  const cookies = new Cookies();
  const [category, setCategory] = useState("");
  const [sponsor, setSponsor] = useState(1);
  const [pageSize, setPageSize] = useState("5");
  const userDetails = cookies.get("USERDETAILS");
  const [currentPage, setCurrentPage] = useState(1);

  const [ProductSuggestionData,setProductSuggestionData] = useState([]);

  useEffect(() => {
    getProductSuggestion(searchText, pageSize, category, sponsor, currentPage);
  }, []);

  const getProductSuggestion = async (
    searchText,
    pageSize,
    category,
    sponsor,
    currentPage
  ) => {
    try{
      const payload = {
        userId: userDetails.id ? userDetails.id : "",
      };
      const {count,data,message,success} = await ProductAllListApiHandler(searchText,
        pageSize,
        category,
        sponsor,
        currentPage,
        payload
        );
        if(success) {
          setProductSuggestionData(data);
        }else{
          setProductSuggestionData([]);
        }
    }catch(err){
      console.error(err);
    }finally{

    }
  };

  const callBackHandler = () =>{
    getProductSuggestion(searchText, pageSize, category, sponsor, currentPage);
  };

  return (
    <>
      <div>
        <Heading head={head} para={para} />
      </div>
      <div className="md:py-10 sm:py-8 py-5 container px-3 sm:px-6">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 lg:gap-5 md:gap-3 gap-2">
          {
            ProductSuggestionData && ProductSuggestionData.length > 0 ?(
              ProductSuggestionData.map((item,index)=>{
                return(
                  <div key={index} className="col-span-1">
                    <ProductCard productDetails={item} callBackHandler={callBackHandler} />
                  </div>
                )
              })
            ):(
              <div className="text-[#5D5F5F] text-center">No Product Found</div>
            )
          }
        </div>
      </div>
    </>
  );
}
