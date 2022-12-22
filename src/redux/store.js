import { configureStore } from "@reduxjs/toolkit";
import blocksSlice from "./block/blocksSlice";
import coursesSlice from "./course/coursesSlice";
import snackbarSlice from "./snackbar/snackbarSlice";
import allUsersSlice from "./user/allUsersSlice";
import loginLoadingSlice from "./user/loginLoadingSlice";
import userSlice from "./user/userSlice";
export const store = configureStore({
    reducer: {
        userState: userSlice,
        userLoginLoading: loginLoadingSlice,
        snackbarState: snackbarSlice,
        allUsersState: allUsersSlice,
        coursesState: coursesSlice,
        blocksState: blocksSlice
    },
    devTools: true
})