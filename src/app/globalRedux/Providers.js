"use client";
import { Provider } from "react-redux";
import store from "./store";



  

export function Providers({children}) {
    if (!store) {
        return;
      }
    return <Provider store={store}>{children}</Provider>
}