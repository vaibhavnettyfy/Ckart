import { POST, get } from "../../../web.request";

export const ProductAllListApiHandler = (
  search,
  pageSize,
  category,
  sponsor,
  page,
  payload
) => {
  return POST(
    `${process.env.NEXT_PUBLIC_APIURL}/api/userV1/userProductList?search=${search}&perPageSize=${pageSize}&category=${category}&sponsor=${sponsor}&page=${page}`,
    payload
  );
};



export const productDetailsByIdApiHandler = (payload) =>{
  return POST(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/userProductDetail`,payload);
}