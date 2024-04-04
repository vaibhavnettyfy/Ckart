import { getPincodeDetails } from "@/Service/CommanService/Comman.service";

export const getDetailsByPincode = async (pincode)=>{
    return await getPincodeDetails(pincode);
};


export const projectTyesData = [{
    label:"Residential",
    value:1
},{
    label:"Commercial",
    value:2
},{
    label:"Industrial",
    value:3
},{
    label:"Other",
    value:4
}];

