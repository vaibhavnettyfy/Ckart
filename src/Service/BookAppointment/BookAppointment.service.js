import { post } from "../../../web.request";

export const bookAppointmentApiHandler = (payload) =>{
    return post(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/bookAppointment`,payload);
};

export const availableSlotsByDateApiHandler = (payload) =>{
    return post(`${process.env.NEXT_PUBLIC_APIURL}/api/userV1/addAppointment`,payload);
};