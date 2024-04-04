"use client";
import {createContext, useContext, useState} from "react"

const appContext = createContext(0);

export function AppWrapper({children}){
    let [cartLength,setCartLength] = useState(0);

    return (
        <appContext.Provider value={{cartLength,setCartLength}}>
            {children}
        </appContext.Provider>
    )
}


export function useAppContext (){
    return useContext(appContext);
};