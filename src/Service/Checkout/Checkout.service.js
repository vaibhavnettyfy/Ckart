import { DELETE, GET, POST, REMOVE, get, post, put } from "../../../web.request"


export const checkOutApiHandler = (cartId) =>{
    return GET(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/orderCheckout/${cartId}`)
};
