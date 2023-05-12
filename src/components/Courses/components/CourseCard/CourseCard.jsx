import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import trashIcon from '../../../../assets/trash-solid.svg';
import editIcon from '../../../../assets/pen-solid.svg';

import Button from '../../../../common/Button';
import { courseDuration } from '../../../../helpers/courseDuration';
import { userSelector } from '../../../../store/user/slice';
import { deleteCourse } from '../../../../store/courses/thunk';

import classes from './CourseCard.module.scss';

const CourseCard = ({
    id,
    title,
    description,
    duration,
    creationDate,
    authors,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { role } = useSelector(userSelector);

    const deleteCourseHandler = (id) => {
        dispatch(deleteCourse(id));
    };

    const showCourseHandler = () => navigate(`/courses/${id}`);
    const updateCourseHandler = () => navigate(`/courses/update/${id}`);

    return (
        <li className={classes['course']}>
            <div className={classes['course__description']}>
                <h2 className={classes['course__description-title']}>
                    {title}
                </h2>
                <p className={classes['course__description-content']}>
                    {description}
                </p>
            </div>

            <div className={classes['course__details']}>
                <p className={classes['course__details-authors']}>
                    <span className={classes['course--bold']}>Authors: </span>
                    {authors}
                </p>
                <p className={classes['course__details-item']}>
                    <span className={classes['course--bold']}>Duration: </span>
                    {courseDuration(duration)}
                </p>
                <p className={classes['course__details-item']}>
                    <span className={classes['course--bold']}>Created: </span>
                    {creationDate.replaceAll('/', '.')}
                </p>

                <div className={classes['course__buttons']}>
                    <Button
                        className={classes['course__button']}
                        onClick={showCourseHandler}
                    >
                        Show course
                    </Button>
                    {role === 'admin' && (
                        <>
                            <Button
                                className={classes['course__button']}
                                onClick={deleteCourseHandler.bind(null, id)}
                            >
                                <img
                                    className={classes['course__icon']}
                                    src={trashIcon}
                                    alt='trash-icon'
                                />
                            </Button>
                            <Button
                                className={classes['course__button']}
                                onClick={updateCourseHandler}
                            >
                                <img
                                    className={classes['course__icon']}
                                    src={editIcon}
                                    alt='edit-icon'
                                />
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </li>
    );
};

export default CourseCard;
