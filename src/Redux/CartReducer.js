import {createSlice} from "@reduxjs/toolkit";


export const CartSlice = createSlice({
    name:"cart",
    initialState:{
        cart: [],
    },
    reducers:{
        ADDTOCART: (state,action) =>{
            console.log(action,"action");
            console.log(state,"state");
        }
    }
});

export const {ADDTOCART} = CartSlice.actions;

export default CartSlice.reducer;