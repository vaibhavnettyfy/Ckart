import {
  DELETE,
  GET,
  POST,
  PUT,
  REMOVE,
  get,
  post,
  put,
} from "../../../web.request";

export const couponApplyApiHandler = (payload) => {
  return POST(
    `${process.env.NEXT_PUBLIC_APIURL}/api/userV1/checkCoupon`,
    payload
  );
};

export const removeCoupanApiApply = (id) => {
  return PUT(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/removeCoupon/${id}`);
};
