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
    className,
}) => {
    return (
        <div className={classes['course-details'] + ' ' + className}>
            <div className={classes['course-details__title']}>
                <h4 className={classes['course-details--title']}>Title</h4>
                <Input
                    label={'Title'}
                    value={title}
                    placeholder={'Enter title...'}
                    onChange={onTitle}
                />
            </div>

            <div className={classes['course-details__duration']}>
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

            <textarea
                className={classes['course-details__description']}
                name={'actions-textarea'}
                cols={'30'}
                rows={'10'}
                placeholder={'Enter description...'}
                value={description}
                onChange={onDescription}
            ></textarea>
        </div>
    );
};

export default CourseDetails;
