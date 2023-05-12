import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../common/Input';
import Button from '../../common/Button';
import { registerUser } from '../../services';

import classes from './Registration.module.scss';

const Registration = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const nameHandler = (event) => setName(event.target.value);
    const emailHandler = (event) => setEmail(event.target.value);
    const passwordHandler = (event) => setPassword(event.target.value);

    const registerSubmitHandler = async (event) => {
        event.preventDefault();
        const response = await registerUser(name, email, password);
        if (response.successful) {
            navigate('/login');
        }
    };

    return (
        <form
            onSubmit={registerSubmitHandler}
            className={classes['registration-form']}
        >
            <h1 className={classes['registration-form__title']}>
                Registration
            </h1>
            <Input
                label={'Name'}
                placeholder={'Enter name'}
                value={name}
                onChange={nameHandler}
            />
            <Input
                type={'email'}
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
            <Button>Registration</Button>
            <p>
                If you have an account you can <Link to='/login'>Login</Link>
            </p>
        </form>
    );
};

export default Registration;
