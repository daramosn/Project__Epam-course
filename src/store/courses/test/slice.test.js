import '@testing-library/jest-dom/extend-expect';
import coursesSlice from '../slice';
import { addCourse, getCourses } from '../thunk';

describe('coursesSlice', () => {
    test('should return the initial state', () => {
        expect(coursesSlice.getInitialState()).toEqual([]);
    });

    test('should handle SAVE_COURSE and return new state', () => {
        const initialState = [
            {
                id: 'idc1',
                title: 'JavaScript',
                description: 'Lorem Ipsum is simply ',
                duration: 160,
                creationDate: '8/3/2021',
                authors: ['ida1', 'ida2'],
            },
        ];
        const course = {
            id: 'idc2',
            title: 'JavaScript',
            description: 'Lorem Ipsum is simply ',
            duration: 160,
            creationDate: '8/3/2021',
            authors: ['ida3', 'ida4'],
        };

        const action = addCourse.fulfilled({ result: course });
        const newState = coursesSlice.reducer(initialState, action);
        expect(newState).toEqual([...initialState, course]);
    });

    test('should handle GET_COURSES and return new state', () => {
        const courses = [
            {
                id: 'idc1',
                title: 'JavaScript',
                description: 'Lorem Ipsum is simply ',
                duration: 160,
                creationDate: '8/3/2021',
                authors: ['ida1', 'ida2'],
            },
            {
                id: 'idc2',
                title: 'JavaScript',
                description: 'Lorem Ipsum is simply ',
                duration: 160,
                creationDate: '8/3/2021',
                authors: ['ida3', 'ida4'],
            },
        ];

        const action = getCourses.fulfilled({ result: courses });
        const newState = coursesSlice.reducer([], action);

        expect(newState).toEqual(courses);
    });
});
