import { createSlice } from '@reduxjs/toolkit';

// Collecting the actual search's datas, the loading state, and the error.

const initialState = {
    searchTerm: '',
    searchResults: [],
    isLoading: false,
    error: null,
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
        },
        setLoadingStatus: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export default searchSlice.reducer;
export const { setSearchResults, setLoadingStatus, setError } =
    searchSlice.actions;
