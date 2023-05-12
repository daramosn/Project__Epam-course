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

    const [title, setTitle] = useState(defaultValues?.title ?? '');
    const [description, setDescription] = useState(
        defaultValues?.description ?? ''
    );
    const [duration, setDuration] = useState(defaultValues?.duration ?? 1);
    const [authorsList, setAuthorsList] = useState(
        defaultValues ? defaultValues.availableAuthors : authors
    );
    const [courseAuthorsList, setCourseAuthorsList] = useState(
        defaultValues?.courseAuthors ?? []
    );
    const [modal, setModal] = useState(false);

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

        if (defaultValues) {
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
                name={'course-form'}
            >
                <FormActions
                    className={classes['new-course__actions']}
                    onCancel={cancelButtonHandler}
                    updateForm={defaultValues ? true : false}
                />

                <CourseDetails
                    className={classes['new-course__details']}
                    title={title}
                    description={description}
                    duration={duration}
                    onTitle={changeTitleHandler}
                    onDescription={changeDescriptionHandler}
                    onDuration={changeDurationHandler}
                />

                <CreateAuthor
                    className={classes['new-course__create-author']}
                />

                <AuthorsPanel
                    className={classes['new-course__authors-panel']}
                    title={'Authors'}
                    buttonName={'Add'}
                    authorList={authorsList}
                    onClickAuthor={addAuthorListHandler}
                />
                <AuthorsPanel
                    className={classes['new-course__authors-panel']}
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
