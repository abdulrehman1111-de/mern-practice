import { configureStore } from "@reduxjs/toolkit";
import { myreducer } from "./reducer";
import { myApi } from "./api";

export const store = configureStore({
    reducer: {
        myApi: myApi.reducer, 
        myreducer: myreducer.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(myApi.middleware),
})