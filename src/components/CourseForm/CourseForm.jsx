import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../../UI/Modal';
import Button from '../../common/Button';
import { authorsSelector } from '../../store/authors/slice';
import { addCourse, updateCourse } from '../../store/courses/thunk';
import { addAuthor } from '../../store/authors/thunk';

import classes from './CourseForm.module.scss';
import CourseDetails from './components/CourseDetails/CourseDetails';
import CreateAuthor from './components/CreateAuthor/CreateAuthor';
import AuthorsPanel from './components/AuthorsPanel/AuthorsPanel';

const CourseForm = ({ defaultValues }) => {
    const dispatch = useDispatch();
    const authors = useSelector(authorsSelector);
    const navigate = useNavigate();

    const [title, setTitle] = useState(
        defaultValues ? defaultValues.title : ''
    );
    const [textarea, setTextarea] = useState(
        defaultValues ? defaultValues.description : ''
    );
    const [authorList, setAuthorList] = useState(
        defaultValues ? defaultValues.otherAuthors : authors
    );
    const [durationTime, setDurationTime] = useState(
        defaultValues ? defaultValues.duration : 0
    );
    const [courseAuthorList, setCourseAuthorList] = useState(
        defaultValues ? defaultValues.courseAuthors : []
    );
    const [inputAuthor, setInputAuthor] = useState('');
    const [modal, setModal] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();

        if (
            title.length < 2 ||
            textarea.length < 2 ||
            durationTime < 1 ||
            courseAuthorList.length === 0
        ) {
            return setModal(true);
        }

        if (defaultValues !== undefined) {
            const updatedCourse = {
                title: title,
                description: textarea,
                duration: durationTime,
                authors: courseAuthorList.map((author) => author.id),
            };
            dispatch(
                updateCourse({ course: updatedCourse, id: defaultValues.id })
            );
        } else {
            const newCourse = {
                title: title,
                description: textarea,
                duration: durationTime,
                authors: courseAuthorList.map((author) => author.id),
            };
            dispatch(addCourse(newCourse));
        }
        navigate('/courses');
    };

    const changeTitleHandler = (event) => setTitle(event.target.value);
    const changeTextareaHandler = (event) => setTextarea(event.target.value);
    const changeAuthorHandler = (event) => setInputAuthor(event.target.value);

    const createAuthorHandler = () => {
        if (inputAuthor.length > 1) {
            const newAuthor = { name: inputAuthor };
            setInputAuthor('');
            setAuthorList((prevAuthorList) => [...prevAuthorList, newAuthor]);
            dispatch(addAuthor(newAuthor));
        }
    };

    const addAuthorListHandler = (currentAuthor) => {
        setAuthorList((prevAuthorList) =>
            prevAuthorList.filter((author) => author.id !== currentAuthor.id)
        );
        setCourseAuthorList((prevCourseAuthorList) => [
            ...prevCourseAuthorList,
            currentAuthor,
        ]);
    };

    const deleteAuthorListHandler = (currentAuthor) => {
        setCourseAuthorList((prevCourseAuthorList) =>
            prevCourseAuthorList.filter(
                (author) => author.id !== currentAuthor.id
            )
        );
        setAuthorList((prevAuthorList) => [...prevAuthorList, currentAuthor]);
    };

    const inputDurationHandler = (event) => {
        if (event.target.value === '') {
            return setDurationTime(0);
        } else {
            setDurationTime(parseInt(event.target.value));
        }
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
                name="course-form"
            >
                <CourseDetails />

                <div className={classes['new-course__details']}>
                    <CreateAuthor />

                    <AuthorsPanel title={'Authors'} buttonName={'Add'} />
                    <AuthorsPanel
                        title={'Course authors'}
                        buttonName={'Delete'}
                    />
                </div>
            </form>
        </>
    );
};

export default CourseForm;
