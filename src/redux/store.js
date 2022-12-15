import { configureStore } from "@reduxjs/toolkit";
import loginLoadingSlice from "./user/loginLoadingSlice";
import userSlice from "./user/userSlice";
export const store = configureStore({
    reducer: {
        userState : userSlice,
        userLoginLoading : loginLoadingSlice
    },
    devTools: true
})