import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userApi from "../../api/userAPI";

const initialState = {
    users: []
}
export const fetchAllUsers = createAsyncThunk(
    'user/fetchAllUsers',
    async (data, { rejectWithValue }) => {

        const rs = await userApi.fetchAllUsers().catch(data => { return data.response })

        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(rs.data);
        }
        return rs.data
    }
)


const allUsersSlice = createSlice({
    name: 'allusers',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload
        },
        deleteUsers: (state, action) => {
            let id = action.payload
            let users = state.users

            let index = users.findIndex(item => item.id === id)

            users.splice(index, 1)

            state.users = users
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.pending, state => {

        })
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {

            state.users = action.payload

        })
        builder.addCase(fetchAllUsers.rejected, (state, action) => {

        })

    }
})

export const {
    setUsers,
    deleteUsers
} = allUsersSlice.actions

export default allUsersSlice.reducer