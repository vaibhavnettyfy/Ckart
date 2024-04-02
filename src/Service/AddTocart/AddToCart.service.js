import { DELETE, GET, POST, REMOVE, get, post, put } from "../../../web.request"

export const addProductApiToCart = (payload) =>{
    return POST(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/addCart`,payload);
};

export const removeProductApiFromCart = (cartId,productId) =>{
    return REMOVE(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/deleteCartProduct/${cartId}/${productId}`);
};

export const  BindCartIdToUserId = (cartId,userId) =>{
    return put(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/updateCart/${cartId}/${userId}`)
};


export const productListByCart = (cartId) =>{
    return GET(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/userCartList?cartId=${cartId}`)
};

