import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { userSelector } from '../../store/user/slice';

const PrivateRoute = ({ redirectPath }) => {
    const { role } = useSelector(userSelector);
    console.log('Private route ' + role);

    return role !== 'admin' ? (
        <Navigate to={redirectPath} replace />
    ) : (
        <Outlet />
    );
};

export default PrivateRoute;
