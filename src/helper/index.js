import { getPincodeDetails } from "@/Service/CommanService/Comman.service";

export const getDetailsByPincode = async (pincode)=>{
    return await getPincodeDetails(pincode);
};


export const projectTyesData = [{
    label:"Residential",
    value:"Residential"
},{
    label:"Commercial",
    value:"Commercial"
},{
    label:"Industrial",
    value:"Industrial"
},{
    label:"Other",
    value:"Other"
}];

