import React from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { coursesSelector } from '../../store/courses/slice';
import { authorsSelector } from '../../store/authors/slice';
import CourseInfoView from './components/CourseInfoView';

const CourseInfo = () => {
    const params = useParams();
    const courses = useSelector(coursesSelector);
    const authorsList = useSelector(authorsSelector);
    const course = courses.find((course) => course.id === params.courseId);
    const { title, description, id, duration, creationDate, authors } = course;

    return (
        <CourseInfoView
            title={title}
            description={description}
            id={id}
            duration={duration}
            creationDate={creationDate}
            authors={authors}
            authorsList={authorsList}
        />
    );
};

export default CourseInfo;
