import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import CourseCard from '../CourseCard';

describe('CourseCard component:', () => {
    const mockedState = {
        user: {
            isAuth: true,
            name: 'Test Name',
            role: 'admin',
        },
        courses: [],
        authors: [],
    };

    const mockedStore = {
        getState: () => mockedState,
        subscribe: jest.fn(),
        dispatch: jest.fn(),
    };

    const mockedCourse = {
        id: '1',
        title: 'React Fundamentals',
        description: 'Learn the basics of React',
        duration: 65,
        creationDate: '10/11/2020',
        authors: 'John Doe, Pepito Pérez',
    };

    test('should display a title', () => {
        render(
            <Provider store={mockedStore}>
                <BrowserRouter>
                    <CourseCard {...mockedCourse} />
                </BrowserRouter>
            </Provider>
        );

        const titleElement = screen.getByText('React Fundamentals');
        expect(titleElement).toBeInTheDocument();
    });

    test('should display description', () => {
        render(
            <Provider store={mockedStore}>
                <BrowserRouter>
                    <CourseCard {...mockedCourse} />
                </BrowserRouter>
            </Provider>
        );

        const descriptionElement = screen.getByText(
            'Learn the basics of React'
        );
        expect(descriptionElement).toBeInTheDocument();
    });

    test('should display duration in the correct format. 65 --> 01:05 hours', () => {
        render(
            <Provider store={mockedStore}>
                <BrowserRouter>
                    <CourseCard {...mockedCourse} />
                </BrowserRouter>
            </Provider>
        );

        const durationElement = screen.getByText('01:05 hours');
        expect(durationElement).toBeInTheDocument();
    });

    test('should display authors list', () => {
        render(
            <Provider store={mockedStore}>
                <BrowserRouter>
                    <CourseCard {...mockedCourse} />
                </BrowserRouter>
            </Provider>
        );

        const authorsElement = screen.getByText('John Doe, Pepito Pérez');
        expect(authorsElement).toBeInTheDocument();
    });

    test('should display created date in the correct format. 10/11/2020 --> 10.11.2020', () => {
        render(
            <Provider store={mockedStore}>
                <BrowserRouter>
                    <CourseCard {...mockedCourse} />
                </BrowserRouter>
            </Provider>
        );

        const dateElement = screen.getByText('10.11.2020');
        expect(dateElement).toBeInTheDocument();
    });
});
