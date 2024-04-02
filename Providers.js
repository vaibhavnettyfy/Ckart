"use client";
import { Provider } from "react-redux";
import store from "./src/app/store";


if (!store) {
    return;
  }

  
export function Providers({children}) {
    return <Provider store={store}>{children}</Provider>
}