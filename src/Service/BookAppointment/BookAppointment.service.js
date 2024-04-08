import { POST, post } from "../../../web.request";

export const bookAppointmentApiHandler = (payload) =>{
    return POST(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/bookAppointment`,payload);
};

export const availableSlotsByDateApiHandler = (payload) =>{
    return POST(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/addAppointment`,payload);
};