import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button';
import { getAuthorsNamesList } from '../../helpers/getAuthorNamesList';
import { coursesSelector } from '../../store/courses/slice';
import { authorsSelector } from '../../store/authors/slice';
import { userSelector } from '../../store/user/slice';
import { getAuthors } from '../../store/authors/thunk';
import { getCourses } from '../../store/courses/thunk';

import classes from './Courses.module.scss';
import Card from '../../UI/Card';

const Courses = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { role } = useSelector(userSelector);
    const authors = useSelector(authorsSelector);
    const courses = useSelector(coursesSelector);
    const [coursesList, setCoursesList] = useState(courses);

    const toCreateCourseHandler = () => {
        navigate('/courses/add');
    };

    useEffect(() => {
        const loadAsync = async () => {
            await dispatch(getAuthors());
            await dispatch(getCourses());
        };
        loadAsync();
    }, [dispatch]);

    useEffect(() => {
        setCoursesList(courses);
    }, [courses]);

    const searchHandler = (search) => {
        if (search === '') {
            setCoursesList(courses);
        } else {
            const filteredSearch = courses.filter(
                (course) =>
                    course.id.toLowerCase().includes(search) ||
                    course.title.toLowerCase().includes(search)
            );
            setCoursesList(filteredSearch);
        }
    };

    return (
        <div className={classes['courses']}>
            <section className={classes['courses__actions']}>
                <SearchBar onSearch={searchHandler} />
                {role === 'admin' && (
                    <Button onClick={toCreateCourseHandler}>
                        Add new course
                    </Button>
                )}
            </section>

            {coursesList.length === 0 && (
                <Card>
                    <p>There are currently no courses!</p>
                </Card>
            )}
            <ul className={classes['courses__list']}>
                {coursesList.map((course) => (
                    <CourseCard
                        key={course.id}
                        id={course.id}
                        title={course.title}
                        description={course.description}
                        duration={course.duration}
                        creationDate={course.creationDate}
                        authors={getAuthorsNamesList(
                            course.authors,
                            authors
                        ).join(', ')}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Courses;
