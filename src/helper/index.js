import { getPincodeDetails } from "@/Service/CommanService/Comman.service";

export const getDetailsByPincode = async (pincode)=>{
    return await getPincodeDetails(pincode);
};