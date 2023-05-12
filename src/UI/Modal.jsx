import React from 'react';
import ReactDOM from 'react-dom';

import Card from './Card';

import classes from './Modal.module.scss';

const ModalOverlay = (props) => {
    return (
        <>
            <div
                onClick={props.onClickBackground}
                className={classes['backdrop']}
            />
            <Card className={classes['modal']}>{props.children}</Card>
        </>
    );
};

const Modal = ({ onClickBackground, children }) => {
    return (
        <>
            {ReactDOM.createPortal(
                <ModalOverlay onClickBackground={onClickBackground}>
                    {children}
                </ModalOverlay>,
                document.getElementById('modal-root')
            )}
        </>
    );
};

export default Modal;
