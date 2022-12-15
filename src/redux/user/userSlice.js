import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import userApi from "../../api/userAPI";

const user = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null


export const login = createAsyncThunk(
    'user/login',
    async (data, { rejectWithValue }) => {

        const rs = await userApi.login(data).catch(data => { return data.response })

        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(rs.data);
        }
        return rs.data
    }
)
export const register = createAsyncThunk(
    'user/register',
    async (data, { rejectWithValue }) => {

        const rs = await userApi.register(data)
        const res_data = await rs.data

        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(res_data);
        }
        return res_data
    }
)
export const updateUser = createAsyncThunk(
    'user/updateuser',
    async (data, { rejectWithValue }) => {

        const rs = await userApi.updateUser(data.id, data.body)
        const res_data = await rs.data

        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(res_data);
        }
        return res_data
    }
)
export const fetchUser = createAsyncThunk(
    'user/fetchuser',
    async (data, { rejectWithValue }) => {

        const rs = await userApi.fetchUser().catch(data => { return data.response })

        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(rs.data);
        }
        return rs.data
    }
)
const initialState = {
    loading: false,
    user: user,
    value: {},
    err: null,
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
            localStorage.removeItem('user')
        },
        updateUserValue: (state,action) =>{
            state.value = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, state => {
            state.loading = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.err = null
            localStorage.setItem('user', JSON.stringify(action.payload))
           

        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.err = action.payload.status === 401 ? "Username or Password incorrect!" : action.payload.status === 500 ? "Fail to connect to Server!" : "Error!"
        })
        builder.addCase(register.pending, state => {
            state.loading = true;
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false
        })
        builder.addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.err = action.payload.title
        })
        builder.addCase(fetchUser.pending, state => {
            state.loading = true;
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false
            state.value = action.payload

        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.err = action.payload.title
        })

    }
})

export const {
    setUser,
    logout,
    updateUserValue
} = userSlice.actions

export default userSlice.reducer