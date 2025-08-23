import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import { api } from "./api";   // 👈 use lowercase here
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        [api.reducerPath]: api.reducer,   // 👈 register reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),   // 👈 add middleware
});

setupListeners(store.dispatch);
