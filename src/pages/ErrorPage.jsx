import React from 'react';
import { useRouteError } from 'react-router-dom';
import Card from '../UI/Card';

const ErrorPage = () => {
    const error = useRouteError();

    let title = 'An error occurred!';
    let message = 'Something went wrong!';

    if (error.status === 401) {
        message = '401: unauthorized';
    }

    if (error.status === 404) {
        title = 'Not found!';
        message = '404: oops! page not found :(';
    }

    return (
        <Card>
            <h1>{title}</h1>
            <p>{message}</p>
        </Card>
    );
};

export default ErrorPage;
