import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Input from '../../common/Input';
import Button from '../../common/Button';
import { getRole, loginUser } from '../../store/user/thunk';

import classes from './Login.module.scss';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailHandler = (event) => setEmail(event.target.value);
    const passwordHandler = (event) => setPassword(event.target.value);

    const loginSubmitHandler = (event) => {
        event.preventDefault();

        dispatch(loginUser({ email: email, password: password }))
            .then(() => {
                dispatch(getRole());
            })
            .then(() => {
                navigate('/courses');
            });
    };

    return (
        <form onSubmit={loginSubmitHandler} className={classes['login-form']}>
            <h1 className={classes['login-form__title']}>Login</h1>
            <Input
                label={'Email'}
                placeholder={'Enter email'}
                value={email}
                onChange={emailHandler}
            />
            <Input
                type={'password'}
                label={'Password'}
                placeholder={'Enter password'}
                value={password}
                onChange={passwordHandler}
            />
            <Button>Login</Button>
            <p>
                If you don't have an account you can{' '}
                <Link to='/registration'>Registration</Link>
            </p>
        </form>
    );
};

export default Login;
