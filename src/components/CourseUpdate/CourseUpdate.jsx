import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CourseForm from '../CourseForm/CourseForm';
import { coursesSelector } from '../../store/courses/slice';
import { authorsSelector } from '../../store/authors/slice';

const CourseUpdate = () => {
    const params = useParams();
    const courses = useSelector(coursesSelector);
    const authorsList = useSelector(authorsSelector);

    const loadedCourse = courses.find(
        (course) => course.id === params.courseId
    );

    const availableAuthors = authorsList.filter(
        (author) => !loadedCourse.authors.includes(author.id)
    );
    const courseAuthors = authorsList.filter((author) =>
        loadedCourse.authors.includes(author.id)
    );

    const loadedDataCourse = {
        title: loadedCourse.title,
        description: loadedCourse.description,
        id: loadedCourse.id,
        duration: loadedCourse.duration,
        courseAuthors: courseAuthors,
        availableAuthors: availableAuthors,
    };

    console.log(loadedDataCourse);

    return <CourseForm defaultValues={loadedDataCourse} />;
};

export default CourseUpdate;
