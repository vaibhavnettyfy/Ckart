import { DELETE, GET, POST, REMOVE, get, post, put } from "../../../web.request"

export const couponApplyApiHandler = (payload) =>{
    return POST(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/checkCoupon`,payload);
};