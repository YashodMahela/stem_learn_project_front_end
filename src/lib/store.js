import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import { api } from "./api";  
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        [api.reducerPath]: api.reducer,   
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);
