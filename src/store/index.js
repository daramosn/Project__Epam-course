import { configureStore } from '@reduxjs/toolkit';

import userSlice from './user/slice';
import coursesSlice from './courses/slice';
import authorsSlice from './authors/slice';

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        courses: coursesSlice.reducer,
        authors: authorsSlice.reducer,
    },
});

export default store;
