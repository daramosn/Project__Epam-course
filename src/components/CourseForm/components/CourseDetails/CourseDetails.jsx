import React from 'react';

import Input from '../../../../common/Input';
import { courseDuration } from '../../../../helpers/courseDuration';

import classes from './CourseDetails.module.scss';

const CourseDetails = ({
    title,
    description,
    duration,
    onTitle,
    onDescription,
    onDuration,
}) => {
    return (
        <div className={classes['course-details']}>
            <Input
                label={'Title'}
                value={title}
                placeholder={'Enter title...'}
                onChange={onTitle}
            />
            <textarea
                className={classes['course-details__actions-textarea']}
                name='actions-textarea'
                cols='30'
                rows='10'
                placeholder={'Enter description...'}
                value={description}
                onChange={onDescription}
            ></textarea>

            <div className={classes['course-details__details--one-column']}>
                <h4 className={classes['course-details--title']}>Duration</h4>
                <Input
                    label={'Duration'}
                    placeholder={'Enter duration in minutes...'}
                    type={'number'}
                    onChange={onDuration}
                    value={duration}
                />
                <span>Duration: {courseDuration(duration)}</span>
            </div>
        </div>
    );
};

export default CourseDetails;
