import { configureStore } from "@reduxjs/toolkit";
import snackbarSlice from "./snackbar/snackbarSlice";
import loginLoadingSlice from "./user/loginLoadingSlice";
import userSlice from "./user/userSlice";
export const store = configureStore({
    reducer: {
        userState : userSlice,
        userLoginLoading : loginLoadingSlice,
        snackbarState: snackbarSlice
    },
    devTools: true
})