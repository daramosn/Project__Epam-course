import React, { useState } from 'react';
import Modal from '../UI/Modal';

import classes from './Input.module.scss';

const Input = ({ errorMessage, label, type, value, onChange, placeholder }) => {
    const [showModal, setshowModal] = useState('');

    const onBlurMessageHandler = (event) => {
        if (errorMessage) {
            setshowModal(true);
        }
    };

    const closeModalHandler = () => {
        setshowModal(false);
    };

    const style = errorMessage ? '.custom-input--error' : '';

    return (
        <div className={classes['custom-input']}>
            {label !== undefined && (
                <label
                    htmlFor={label}
                    className={classes['custom-input__label']}
                >
                    {label}
                </label>
            )}
            <input
                className={`${classes['custom-input__input']} ${classes[style]}`}
                type={type}
                value={value}
                onChange={onChange}
                id={label}
                placeholder={placeholder}
                onBlur={onBlurMessageHandler}
            />
            {showModal && (
                <Modal onClickBackground={closeModalHandler}>
                    {errorMessage}
                </Modal>
            )}
        </div>
    );
};

export default Input;
