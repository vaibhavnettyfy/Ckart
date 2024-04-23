import {POST} from "../../../web.request";
export const contactApiHandler = (payload) =>{
    return POST(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/addContactus`,payload);
};