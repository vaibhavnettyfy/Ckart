"use client";
import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    ADDTOCART: (state, action) => {
      state.cart = action.payload;
    },
    REMOVECART: (state, action) =>{
        const removeItem = state.cart.filter(
            (item) => item.id !== action.payload.id
          );
          state.cart = removeItem;
    }
  },
});

export const { ADDTOCART } = CartSlice.actions;

export default CartSlice.reducer;
