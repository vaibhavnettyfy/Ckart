import { get } from "../../../web.request";
export const getAllCategoryApiList = (search, name, status, page, pageSize) => {
  return get(
    `${process.env.NEXT_PUBLIC_APIURL}/api/v1/categoryList?search=${search}&name=${name}&status=${status}&page=${page}&perPageSize=${pageSize}`
  );
};
