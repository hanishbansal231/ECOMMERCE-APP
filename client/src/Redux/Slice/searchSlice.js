import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    data: localStorage.getItem('searchData') ? JSON.parse(localStorage.getItem('searchData')) : [],
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setData: (state, action) => {
            console.log(action);
            state.data = action?.payload;
        },
        setSearchLoading: (state, action) => {
            state.loading = action?.payload;
        }
    }
});

export const { setData, setSearchLoading } = searchSlice.actions;
export default searchSlice.reducer