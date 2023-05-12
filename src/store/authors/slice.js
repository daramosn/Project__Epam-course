import { createSlice } from '@reduxjs/toolkit';
import { addAuthor, getAuthors } from './thunk';

const authorsInitialState = [];

const authorsSlice = createSlice({
    name: 'authors',
    initialState: authorsInitialState,
    extraReducers: (builder) => {
        builder.addCase(getAuthors.fulfilled, (state, action) => {
            return [...action.payload.result];
        });
        builder.addCase(addAuthor.fulfilled, (state, action) => {
            return [...state, action.payload.result];
        });
    },
});

export const authorsActions = authorsSlice.actions;

export const authorsSelector = (state) => state.authors;

export default authorsSlice;
