import React, { useState } from 'react';

import Input from '../../../../common/Input';
import Button from '../../../../common/Button';
import { useDispatch } from 'react-redux';
import { addAuthor } from '../../../../store/authors/thunk';

import classes from './CreateAuthor.module.scss';

const CreateAuthor = ({ className }) => {
    const [inputAuthor, setInputAuthor] = useState('');
    const dispatch = useDispatch();

    const changeAuthorHandler = (event) => {
        setInputAuthor(event.target.value);
    };

    const createAuthorHandler = () => {
        if (inputAuthor.length > 1) {
            const newAuthor = { name: inputAuthor };
            setInputAuthor('');
            dispatch(addAuthor(newAuthor));
        }
    };

    return (
        <section className={classes['new-author'] + ' ' + className}>
            <h4 className={classes['new-author--title']}>Add author</h4>
            <Input
                label={'Author name'}
                placeholder={'Enter author name...'}
                value={inputAuthor}
                onChange={changeAuthorHandler}
            />
            <Button
                type={'button'}
                onClick={createAuthorHandler}
                className={classes['new-course__button']}
            >
                Create author
            </Button>
        </section>
    );
};

export default CreateAuthor;
