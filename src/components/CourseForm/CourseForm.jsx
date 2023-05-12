import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../../UI/Modal';
import { authorsSelector } from '../../store/authors/slice';
import { addCourse, updateCourse } from '../../store/courses/thunk';

import classes from './CourseForm.module.scss';
import CourseDetails from './components/CourseDetails/CourseDetails';
import CreateAuthor from './components/CreateAuthor/CreateAuthor';
import AuthorsPanel from './components/AuthorsPanel/AuthorsPanel';
import FormActions from './components/FormActions/FormActions';

const CourseForm = ({ defaultValues }) => {
    const dispatch = useDispatch();
    const authors = useSelector(authorsSelector);
    const navigate = useNavigate();

    const [authorsList, setAuthorsList] = useState(
        defaultValues ? defaultValues.availableAuthors : authors
    );

    const [courseAuthorsList, setCourseAuthorsList] = useState(
        defaultValues ? defaultValues.courseAuthors : []
    );
    const [modal, setModal] = useState(false);

    const [title, setTitle] = useState(
        defaultValues ? defaultValues.title : ''
    );
    const [description, setDescription] = useState(
        defaultValues ? defaultValues.description : ''
    );
    const [duration, setDuration] = useState(
        defaultValues ? defaultValues.duration : 0
    );

    const changeDescriptionHandler = (e) => setDescription(e.target.value);
    const changeTitleHandler = (e) => setTitle(e.target.value);
    const changeDurationHandler = (event) => {
        if (event.target.value === '') {
            return setDuration(0);
        } else {
            setDuration(parseInt(event.target.value));
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (
            title.length < 2 ||
            description.length < 2 ||
            duration < 1 ||
            courseAuthorsList.length === 0
        ) {
            return setModal(true);
        }

        if (defaultValues !== undefined) {
            const updatedCourse = {
                title: title,
                description: description,
                duration: duration,
                authors: courseAuthorsList.map((author) => author.id),
            };
            dispatch(
                updateCourse({ course: updatedCourse, id: defaultValues.id })
            );
        } else {
            const newCourse = {
                title: title,
                description: description,
                duration: duration,
                authors: courseAuthorsList.map((author) => author.id),
            };
            dispatch(addCourse(newCourse));
        }
        navigate('/courses');
    };

    const addAuthorListHandler = (currentAuthor) => {
        setAuthorsList((prevAuthorList) =>
            prevAuthorList.filter((author) => author.id !== currentAuthor.id)
        );
        setCourseAuthorsList((prevCourseAuthorList) => [
            ...prevCourseAuthorList,
            currentAuthor,
        ]);
    };

    const deleteAuthorListHandler = (currentAuthor) => {
        setCourseAuthorsList((prevCourseAuthorList) =>
            prevCourseAuthorList.filter(
                (author) => author.id !== currentAuthor.id
            )
        );
        setAuthorsList((prevAuthorList) => [...prevAuthorList, currentAuthor]);
    };

    const modalToggleHandler = () => {
        setModal((prevModal) => !prevModal);
    };

    const cancelButtonHandler = () => {
        navigate('/courses');
    };

    return (
        <>
            {modal && (
                <Modal onClickBackground={modalToggleHandler}>
                    <h3>Please fill correctly the form!</h3>
                </Modal>
            )}

            <form
                onSubmit={submitHandler}
                className={classes['new-course']}
                name='course-form'
            >
                <FormActions
                    onCancel={cancelButtonHandler}
                    updateForm={defaultValues ? true : false}
                />

                <CourseDetails
                    title={title}
                    description={description}
                    duration={duration}
                    onTitle={changeTitleHandler}
                    onDescription={changeDescriptionHandler}
                    onDuration={changeDurationHandler}
                />

                <CreateAuthor />

                <AuthorsPanel
                    title={'Authors'}
                    buttonName={'Add'}
                    authorList={authorsList}
                    onClickAuthor={addAuthorListHandler}
                />
                <AuthorsPanel
                    title={'Course authors'}
                    buttonName={'Delete'}
                    authorList={courseAuthorsList}
                    onClickAuthor={deleteAuthorListHandler}
                />
            </form>
        </>
    );
};

export default CourseForm;
