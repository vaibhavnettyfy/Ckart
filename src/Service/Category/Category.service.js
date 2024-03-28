import { GET, get } from "../../../web.request";
export const getAllCategoryApiList = () => {
  return GET(
    `${process.env.NEXT_PUBLIC_APIURL}/api/userV1/categoryDropdown`
  );
};