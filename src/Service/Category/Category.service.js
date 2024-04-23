import { GET, get } from "../../../web.request";
export const getAllCategoryApiList = () => {
  return GET(
    `${process.env.NEXT_PUBLIC_APIURL}/api/userV1/categoryDropdown`
  );
};


export const subCategoryDropdown = () =>{
  return get(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/allsubcategoryDropdown`)
};

export const categorySubCategoryList = () =>{
  return GET(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/categoryList`)
};

