import { getPincodeDetails } from "@/Service/CommanService/Comman.service";
import { useAppContext } from "@/context";
import Cookies from "universal-cookie";

export const getDetailsByPincode = async (pincode) => {
  return await getPincodeDetails(pincode);
};

export const projectTyesData = [
  {
    label: "Residential",
    value: "Residential",
  },
  {
    label: "Commercial",
    value: "Commercial",
  },
  {
    label: "Industrial",
    value: "Industrial",
  },
  {
    label: "Other",
    value: "Other",
  },
];

export const logoutHandler = () => {
  const cookies = new Cookies();
  cookies.remove("token");
  cookies.remove("userEmail");
  cookies.remove("userPassword");
  cookies.remove("USERDETAILS");
};
