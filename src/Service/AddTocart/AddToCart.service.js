import { DELETE, GET, POST, REMOVE, get, post } from "../../../web.request"

export const addProductApiToCart = (payload) =>{
    return POST(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/addCart`,payload);
};

export const removeProductApiFromCart = () =>{
};


export const productListByCart = (cartId) =>{
    return GET(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/userCartList?cartId=${cartId}`)
};

