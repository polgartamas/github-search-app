import { createSlice } from '@reduxjs/toolkit';
import { SearchOptions } from '../api/api';

// Collecting the previous searches.

interface HistoryState {
    searches: SearchOptions[];
    apiUrls: string[];
}

const initialState: HistoryState = {
    searches: [],
    apiUrls: [],
};

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        addApiUrl: (state, action) => {
            state.apiUrls.push(action.payload);
        },
    },
});

export default historySlice.reducer;
export const { addApiUrl } = historySlice.actions;
