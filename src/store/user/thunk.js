import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getRole = createAsyncThunk('user/getRole', async () => {
    try {
        const token = localStorage.getItem('TOKEN');
        const response = await axios.get('http://localhost:4000/users/me', {
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        throw Error('API: Error getting role: ' + error);
    }
});

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (loginData) => {
        try {
            const response = await axios.post('http://localhost:4000/login', {
                email: loginData.email,
                password: loginData.password,
            });
            console.log('Response data (loginUser)', response.data);
            return response.data;
        } catch (error) {
            throw Error('API: Error login user: ' + error);
        }
    }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
    try {
        const token = localStorage.getItem('TOKEN');
        const response = await axios.delete('http://localhost:4000/logout', {
            headers: {
                Authorization: token,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw Error('API: Error login out: ' + error);
    }
});
