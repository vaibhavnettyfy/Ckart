import { DELETE, PUT, get, post } from "../../../web.request";

// All Profile get 
export const userProfileApiHandler = (userId) =>{
    return get(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/userProfile/${userId}`)
};

export const basicDetailUpdateApiHandler = (userId,payload) =>{
    return PUT(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/profileUpdate/${userId}`,payload);
};

export const billingAddressUpdateApiHandler = (userId,payload) =>{
    return PUT(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/updateAddress/${userId}`,payload);
};

export const shippingAddressUpdateApiHandler = (userId,payload) =>{
    return PUT(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/updateAddress/${userId}`,payload);
};

export const addShippingAddressApiHandler = (payload) =>{
    return post(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/addShippingAddress`,payload);
};

export const deleteShippingAddressApiHandler = (id) =>{
    return DELETE(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/deleteUserAddress/${id}`);
};