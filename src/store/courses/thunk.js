import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { coursesActions } from "./slice";

export const getCourses = createAsyncThunk('courses/getCourses', async () => {
    try {
        const response = await axios.get('http://localhost:4000/courses/all');
        return response.data;
    } catch (error) {
        throw Error('API: Error getting courses: ' + error);
    }
});

export const addCourse = createAsyncThunk(
    'courses/addCourse',
    async (course, { getState }) => {
        try {
            const token = getState().user.token;
            const response = await axios.post(
                'http://localhost:4000/courses/add',
                course,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw Error('API: Error adding course: ' + error);
        }
    }
);
export const updateCourse = createAsyncThunk(
    'courses/updateCourse',
    async (dataCourse, { getState }) => {
        try {
            const token = getState().user.token;
            const response = await axios.put(
                'http://localhost:4000/courses/' + dataCourse.id,
                dataCourse.course,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw Error('API: Error updating course: ' + error);
        }
    }
);

export const deleteCourse = createAsyncThunk(
    'courses/deleteCourse',
    async (courseId, { getState }) => {
        try {
            const token = getState().user.token;
            const response = await axios.delete(
                'http://localhost:4000/courses/' + courseId,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw Error('API: Error deleting course: ' + error);
        }
    }
);

// export const getCoursesThunk = () => {
//     return async (dispatch, getState) => {
//         try {
//             const response = await axios.get(
//                 "http://localhost:4000/courses/all"
//             );
//             return dispatch(coursesActions.getCoursesAll(response.data.result));
//         } catch (error) {
//             throw Error("API: Error getting courses: " + error);
//         }
//     };
// };
