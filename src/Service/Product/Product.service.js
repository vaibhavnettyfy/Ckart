import { POST, get } from "../../../web.request";

export const ProductAllListApiHandler = (
  search,
  pageSize,
  category,
  subCategory,
  sponsor,
  page,
  payload
) => {
  return POST(
    `${process.env.NEXT_PUBLIC_APIURL}/api/userV1/userProductList?search=${search}&perPageSize=${pageSize}&category=${category}&subCategory=${subCategory}&sponsor=${sponsor}&page=${page}`,
    payload
  );
};

export const productDetailsByIdApiHandler = (payload) => {
  return POST(
    `${process.env.NEXT_PUBLIC_APIURL}/api/userV1/userProductDetail`,
    payload
  );
};

export const getAllProdutsApiHandler = (search) => {
  return POST(
    `${process.env.NEXT_PUBLIC_APIURL}/api/userV1/productList?search=${search}&category=&sponsor=&subCategory`
  );
};
