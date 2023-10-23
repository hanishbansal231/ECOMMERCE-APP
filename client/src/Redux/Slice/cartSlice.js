import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    cartData: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
    totalItem: localStorage.getItem('totalItem') ? JSON.parse(localStorage.getItem('totalItem')) : 0,
    totalAmount: localStorage.getItem('totalAmount') ? JSON.parse(localStorage.getItem('totalAmount')) : 0,
    amount: localStorage.getItem('amount') ? JSON.parse(localStorage.getItem('amount')) : 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartData: (state, action) => {
            const item = action.payload;
            const index = state.cartData.findIndex((el) => el._id === item._id);

            if (index >= 0) {
                toast.error("Course already in cart")
                return
            }

            state.cartData.push(item);
            state.totalItem++;
            state.totalAmount += item?.price;

            state.amount = state.totalAmount.toLocaleString('en-US',{
                style: "currency",
                currency: "USD",
            });

            localStorage.setItem('cart', JSON.stringify(state?.cartData));
            localStorage.setItem('totalItem', JSON.stringify(state?.totalItem));
            localStorage.setItem('totalAmount', JSON.stringify(state?.totalAmount));
            localStorage.setItem('amount', JSON.stringify(state?.amount));

            toast.success("Course added to cart")
        },
        removeCart: (state, action) => {
            const courseId = action?.payload;
            const idx = state.cartData.findIndex((item) => item._id === courseId);

            if (idx >= 0) {

                state.totalItem--;
                state.totalAmount -= state.cartData[idx].price;
                state.cartData.splice(idx, 1);

                localStorage.setItem('cart', JSON.stringify(state?.cartData));
                localStorage.setItem('totalItem', JSON.stringify(state?.totalItem));
                localStorage.setItem('totalAmount', JSON.stringify(state?.totalAmount));

                toast.success("Course removed from cart")
            }
        }
    }
});


export const { setCartData, removeCart } = cartSlice.actions;
export default cartSlice.reducer;