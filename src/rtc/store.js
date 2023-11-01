import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import favCartReducer from "./slices/FavCartSlice";

const store  = configureStore({
    reducer:{
        authReducer,favCartReducer}
})
export default store;