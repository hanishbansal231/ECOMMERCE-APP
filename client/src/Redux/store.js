import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slice/authSlice';
import productReducer from './Slice/productSlice';
import searchReducer from './Slice/searchSlice';
import cartReducer from './Slice/cartSlice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        search: searchReducer,
        cart: cartReducer,
    }
});


export default store;