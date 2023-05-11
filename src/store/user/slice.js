import { createSlice } from '@reduxjs/toolkit';
import { getRole, loginUser, logoutUser } from './thunk';

const userInitialState = {
    isAuth: false,
    name: '',
    email: '',
    token: '',
    role: 'admin',
};

const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    extraReducers: (builder) => {
        builder.addCase(getRole.fulfilled, (state, action) => {
            state.isAuth = action.payload.successful;
            state.name = action.payload.result.name;
            state.email = action.payload.result.email;
            state.role = action.payload.result.role;
            state.token = localStorage.getItem('TOKEN');
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            localStorage.setItem('TOKEN', action.payload.result);
            state.isAuth = action.payload.successful;
            state.name = action.payload.user.name;
            state.email = action.payload.user.email;
            state.token = action.payload.result;
        });
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.isAuth = false;
            state.name = '';
            state.email = '';
            state.token = '';
            state.role = '';
        });
    },
});

export const userActions = userSlice.actions;

export const userSelector = (state) => state.user;

export default userSlice;
