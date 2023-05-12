import { createSlice } from '@reduxjs/toolkit';
import { addCourse, deleteCourse, getCourses, updateCourse } from './thunk';

const coursesInitialState = [];

const coursesSlice = createSlice({
    name: 'courses',
    initialState: coursesInitialState,
    extraReducers: (builder) => {
        builder.addCase(getCourses.fulfilled, (state, action) => {
            return [...action.payload.result];
        });
        builder.addCase(addCourse.fulfilled, (state, action) => {
            return [...state, action.payload.result];
        });
        builder.addCase(updateCourse.fulfilled, (state, action) => {
            console.log(action.payload.result);
        });
        builder.addCase(deleteCourse.fulfilled, (state, action) => {
            const courseId = action.payload.result.slice(17, -13);
            return state.filter((course) => course.id !== courseId);
        });
    },
});

export const coursesActions = coursesSlice.actions;

export const coursesSelector = (state) => state.courses;

export default coursesSlice;
