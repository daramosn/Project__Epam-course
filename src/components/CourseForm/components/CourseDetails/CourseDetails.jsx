import React, { useState } from 'react';

import Input from '../../../../common/Input';
import Button from '../../../../common/Button';
import { courseDuration } from '../../../../helpers/courseDuration';

import classes from './CourseDetails.module.scss';

const CourseDetails = ({ defaultValues }) => {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [duration, setDuration] = useState();

    const changeDurationHandler = (e) => setDuration(e.target.value);
    const changeDescriptionHandler = (e) => setDescription(e.target.value);
    const changeTitleHandler = (e) => setTitle(e.target.value);

    const cancelButtonHandler = () => {};

    return (
        <div className={classes['course-details']}>
            <Input
                label={'Title'}
                value={title}
                placeholder={'Enter title...'}
                onChange={changeTitleHandler}
            />
            <div className={classes['course-details__actions']}>
                <Button type={'submit'}>
                    {defaultValues !== undefined
                        ? 'Update course'
                        : 'Create course'}
                </Button>
                <Button type={'button'} onClick={cancelButtonHandler}>
                    Cancel
                </Button>
            </div>
            <textarea
                className={classes['course-details__actions-textarea']}
                name="actions-textarea"
                cols="30"
                rows="10"
                placeholder={'Enter description...'}
                value={description}
                onChange={changeDescriptionHandler}
            ></textarea>

            <div className={classes['course-details__details--one-column']}>
                <h4 className={classes['course-details--title']}>Duration</h4>
                <Input
                    label={'Duration'}
                    placeholder={'Enter duration in minutes...'}
                    type={'number'}
                    onChange={changeDurationHandler}
                    value={duration}
                />
                <span>Duration: {courseDuration(duration)}</span>
            </div>
        </div>
    );
};

export default CourseDetails;
