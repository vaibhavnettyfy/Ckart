import axios from "axios";

export const getPincodeDetails = async (pincode) => {
    return await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${pincode}&key=AIzaSyD2cfignyIQC94CJmpxD5XdLakeuyAOOnQ`);
}