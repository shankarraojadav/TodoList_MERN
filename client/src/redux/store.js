import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice";
import getListsReducer from "./getAllSlice";


export const store = configureStore({
    reducer: {
        
        login: AuthReducer,
        allLists: getListsReducer,
    }
})