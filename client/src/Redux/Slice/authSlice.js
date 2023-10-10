import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
    data: localStorage.getItem('data') ?  JSON.parse(localStorage.getItem('data')) : null,
    loading: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action?.payload;
        },
        setData: (state, action) => {
            state.data = action?.payload;
        },
        setToken: (state, action) => {
            state.token = action?.payload
        }
    }
});

export const { setData, setLoading, setToken } = authSlice.actions;
export default authSlice.reducer;