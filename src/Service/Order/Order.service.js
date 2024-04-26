import {get} from "../../../web.request";

export const getAllOrderHistoryApiHandler = (userId) =>{
    return get(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/orderList?userId=${userId}`)
};


export const orderDetailsApiByorderId = (orderId) =>{
    return get(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/orderDetail/${orderId}`)
};