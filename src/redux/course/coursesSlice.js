import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import courseApi from "../../api/courseAPI";

export const fetchAllCourses = createAsyncThunk(
    'user/fetchAllCourses',
    async (data, { rejectWithValue }) => {

        const rs = await courseApi.fetchAllCourses().catch(data => { return data.response })

        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(rs.data);
        }
        return rs.data
    }
)

const initialState = {
    courses: []
}


const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        addCourses: (state, action) => {
            let course = action.payload
            let courses = state.courses

            courses.push(course)

            state.courses = courses
        },

        updateCourses: (state, action) => {
            let course = action.payload
            let courses = state.courses

            let index = courses.findIndex(item => item.id === course.id)

            courses[index] = course

            state.courses = courses
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllCourses.pending, state => {

        })
        builder.addCase(fetchAllCourses.fulfilled, (state, action) => {
            state.courses = action.payload

        })
        builder.addCase(fetchAllCourses.rejected, (state, action) => {

        })
    }
})

export const {
    addCourses,
    updateCourses
} = coursesSlice.actions

export default coursesSlice.reducer