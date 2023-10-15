import {configureStore} from '@reduxjs/toolkit';
import authReducer from './Slice/authSlice';
import productReducer from './Slice/productSlice';
const store = configureStore({
    reducer:{
        auth:authReducer,
        product:productReducer,
    }
});


export default store;