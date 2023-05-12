import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Courses from '../Courses';
import userEvent from '@testing-library/user-event';
import CourseForm from '../../CourseForm/CourseForm';

describe('Courses component:', () => {
    const mockedState = {
        user: {
            isAuth: true,
            name: 'Test Name',
            role: 'admin',
        },
        courses: [
            {
                id: 'idc1',
                title: 'JavaScript',
                description: `Lorem Ipsum is simply `,
                creationDate: '8/3/2021',
                duration: 160,
                authors: ['ida1', 'ida2'],
            },
            {
                id: 'idc2',
                title: 'Angular',
                description: `Lorem Ipsum is simply `,
                creationDate: '10/11/2020',
                duration: 210,
                authors: ['ida3', 'ida4'],
            },
        ],
        authors: [
            { id: 'ida1', name: 'autor1' },
            { id: 'ida2', name: 'autor2' },
            { id: 'ida3', name: 'autor3' },
            { id: 'ida4', name: 'autor4' },
        ],
    };
    const mockedStore = {
        getState: () => mockedState,
        subscribe: jest.fn(),
        dispatch: jest.fn(),
    };

    test('should display amount of CourseCard equal length of courses array', async () => {
        render(
            <Provider store={mockedStore}>
                <BrowserRouter>
                    <Courses />
                </BrowserRouter>
            </Provider>
        );

        const cardItems = await screen.findAllByRole('listitem');
        expect(cardItems).toHaveLength(mockedState.courses.length);
    });

    test('should display Empty container if courses array length is 0.', () => {
        mockedState.courses = [];
        const mockedStore = {
            getState: () => mockedState,
            subscribe: jest.fn(),
            dispatch: jest.fn(),
        };

        render(
            <Provider store={mockedStore}>
                <BrowserRouter>
                    <Courses />
                </BrowserRouter>
            </Provider>
        );

        const cardItems = screen.getByText('There are currently no courses!', {
            exact: false,
        });
        expect(cardItems).toBeInTheDocument();
    });

    test('CourseForm should be showed after a click on a button "Add new course"', () => {
        render(
            <Provider store={mockedStore}>
                <BrowserRouter>
                    <Courses />
                    <CourseForm path='/courses/add' />
                </BrowserRouter>
            </Provider>
        );

        const newCourseButton = screen.getByText('Add new course');

        userEvent.click(newCourseButton);

        const courseForm = screen.getByRole('form');
        expect(courseForm).toBeInTheDocument();
    });
});
