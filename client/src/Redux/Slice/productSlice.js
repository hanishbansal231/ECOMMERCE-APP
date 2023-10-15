import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productData: null,
    edit: false,
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setEdit: (state, action) => {
            state.edit = action?.payload
        },
        setProduct: (state, action) => {
            console.log(action);
            state.productData = action?.payload
        }
    }

});
export const { setEdit,setProduct } = productSlice.actions;
export default productSlice.reducer;