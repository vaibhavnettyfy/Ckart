"use client";
import { productListByCart } from "@/Service/AddTocart/AddToCart.service";
import { productDetailsByIdApiHandler } from "@/Service/Product/Product.service";
import ProductDetails from "@/components/Product/ProductDetails";
import { useAppContext } from "@/context";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export default function ProductDetailsPage({ productKey }) {
  const cookies = new Cookies();
  const cartId = cookies.get("CARTID");
  const { setCartLength } = useAppContext();
  const userDetails = cookies.get("USERDETAILS");
  const [productDetailsLoader,setProductDetailsLoader] = useState(false);
  const [productDetailsData,setProductDetailsData] = useState({});

  useEffect(() => {
    if (productKey) {
      getProductDetails(productKey);
    }
  }, []);

  const callBackHandler = () =>{
    getProductDetails(productKey);
    getProductListByCartId(cartId);
  };

  const getProductListByCartId = async (cartId) =>{
    const {data, message, success} = await productListByCart(cartId);
    if(success){
      setCartLength(data.cartData.length);
    }else{
      setCartLength(0);
    }
  };

  const getProductDetails = async (productKey) => {
    try{
      setProductDetailsLoader(true);
      const payload = {
        productKey: productKey,
        userId: userDetails?.id ? userDetails?.id : "",
      };
      const {count,data,message,success} = await productDetailsByIdApiHandler(payload);
      if(success){
        setProductDetailsData(data);
      }else{  
        setProductDetailsData({});
      } 
    }catch(error){
      console.log("error",error);
      setProductDetailsData({});
    }finally{
      setProductDetailsLoader(false);
    }
   
  };
  return <ProductDetails detailsData={productDetailsData} callBackHandler={callBackHandler}/>;
}
