import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import Header from '../Header';

describe('Header component:', () => {
    const mockedState = {
        user: {
            isAuth: true,
            name: 'Test Name',
        },
        courses: [],
        authors: [],
    };

    const mockedStore = {
        getState: () => mockedState,
        subscribe: jest.fn(),
        dispatch: jest.fn(),
    };

    test('should contain a Logo component', () => {
        render(
            <Provider store={mockedStore}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </Provider>
        );

        const logoElement = screen.getByAltText('logo', { exact: false });
        expect(logoElement).toBeInTheDocument();
    });

    test("should contain a user's name", () => {
        render(
            <Provider store={mockedStore}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </Provider>
        );

        const nameElement = screen.getByText('Test Name');
        expect(nameElement).toBeInTheDocument();
    });
});
