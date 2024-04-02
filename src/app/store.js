"use client";
import {configureStore} from "@reduxjs/toolkit";
import CartReducer from "./src/Redux/CartReducer";


export default configureStore({
    reducer: {
        cart: CartReducer,
    }
})