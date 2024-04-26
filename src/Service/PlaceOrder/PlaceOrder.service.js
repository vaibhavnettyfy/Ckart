const { post } = require("../../../web.request");

export const placeOrderApiHandler = (payload) =>{
    return post(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/addOrder`,payload);
};