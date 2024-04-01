import { DELETE, get, post } from "../../../web.request"

export const addproductApiWishlist = (payload) =>{
    return post(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/addWishList`, payload);
};

export const removeproductApiWishlist = (id) =>{
    return DELETE(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/deleteWishlistProiduct/${id}`);
};

export const wishListByApiUser = (pageperSize,page) =>{
    return get(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/userWishList?perPageSize=${pageperSize}&page=${page}`);
}