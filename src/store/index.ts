import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'
import appSlice from "./AppSlice";
import stockSlice from "./StockSlice";

const store = configureStore({
    reducer: {
      app: appSlice.reducer,
      stock: stockSlice.reducer
    },
  });

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store

export default store;