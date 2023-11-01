import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import historyReducer from "./historySlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;