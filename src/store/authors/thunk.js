import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAuthors = createAsyncThunk('authors/getAuthors', async () => {
    try {
        const response = await axios.get('http://localhost:4000/authors/all');
        return response.data;
    } catch (error) {
        throw Error('API: Error getting authors: ' + error);
    }
});

export const addAuthor = createAsyncThunk(
    'authors/addAuthor',
    async (authorName, { getState }) => {
        try {
            const token = getState().user.token;
            const response = await axios.post(
                'http://localhost:4000/authors/add',
                authorName,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            return response.data;
        } catch (error) {
            throw Error('API: Error adding new author: ' + error);
        }
    }
);
