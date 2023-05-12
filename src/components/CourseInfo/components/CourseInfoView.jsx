import React from 'react';
import { Link } from 'react-router-dom';

import { courseDuration } from '../../../helpers/courseDuration';
import { getAuthorsNamesList } from '../../../helpers/getAuthorNamesList';

import classes from './CourseInfoView.module.scss';

const CourseInfoView = ({
    title,
    description,
    id,
    duration,
    creationDate,
    authors,
    authorsList,
}) => {
    return (
        <article className={classes['course-info']}>
            <Link to='/courses' className={classes['course-info__back-link']}>
                {'<'} Back to courses
            </Link>
            <h1 className={classes['course-info__title']}>{title}</h1>
            <div className={classes['course-info__description']}>
                <p className={classes['course-info__content']}>{description}</p>

                <div className={classes['course-info__details']}>
                    <p>
                        <span className={classes['course-info--bold']}>
                            ID:{' '}
                        </span>
                        {id}
                    </p>
                    <p>
                        <span className={classes['course-info--bold']}>
                            Duration:{' '}
                        </span>
                        {courseDuration(duration)}
                    </p>
                    <p>
                        <span className={classes['course-info--bold']}>
                            Created:{' '}
                        </span>
                        {creationDate.replaceAll('/', '.')}
                    </p>
                    <p>
                        <span className={classes['course-info--bold']}>
                            Authors:{' '}
                        </span>
                        {getAuthorsNamesList(authors, authorsList).join(', ')}
                    </p>
                </div>
            </div>
        </article>
    );
};

export default CourseInfoView;
