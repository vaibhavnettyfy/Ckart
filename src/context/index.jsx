"use client";
import {createContext, useContext, useState} from "react"

const appContext = createContext(0);

export function AppWrapper({children}){
    let [cartLength,setCartLength] = useState(0);
    let [deliveryAddress,setDeliveryAddress] = useState({});

    return (
        <appContext.Provider value={{cartLength,setCartLength,setDeliveryAddress,deliveryAddress}}>
            {children}
        </appContext.Provider>
    )
}


export function useAppContext (){
    return useContext(appContext);
};