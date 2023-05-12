import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Header from '../components/Header/Header';
import { getRole } from '../store/user/thunk';
import Card from '../UI/Card';

const RootLayout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('TOKEN')) {
            dispatch(getRole());
        }
    }, [dispatch]);

    return (
        <Card>
            <Header />
            <Outlet />
        </Card>
    );
};

export default RootLayout;
