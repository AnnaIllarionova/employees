import { configureStore } from "@reduxjs/toolkit";
import { employeesApi } from "./api";
import employeesSlice from "./slices";

export const store = configureStore({
    reducer: {
        employees: employeesSlice,
        [employeesApi.reducerPath]: employeesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(employeesApi.middleware)
})