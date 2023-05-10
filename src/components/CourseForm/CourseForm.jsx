import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../../UI/Modal';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { courseDuration } from '../../helpers/courseDuration';
import { authorsSelector } from '../../store/authors/slice';
import { addCourse, updateCourse } from '../../store/courses/thunk';
import { addAuthor } from '../../store/authors/thunk';

import classes from './CourseForm.module.scss';

const CourseForm = ({ defaultValues }) => {
  const dispatch = useDispatch();
  const authors = useSelector(authorsSelector);
  const navigate = useNavigate();

  const [title, setTitle] = useState(defaultValues ? defaultValues.title : '');
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
      dispatch(updateCourse({ course: updatedCourse, id: defaultValues.id }));
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
      prevCourseAuthorList.filter((author) => author.id !== currentAuthor.id)
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
        name='course-form'
      >
        <div className={classes['new-course__actions']}>
          <Input
            label={'Title'}
            value={title}
            placeholder={'Enter title...'}
            onChange={changeTitleHandler}
          />
          <Button type={'submit'}>
            {defaultValues !== undefined ? 'Update course' : 'Create course'}
          </Button>
          <textarea
            className={classes['new-course__actions-textarea']}
            name='actions-textarea'
            cols='30'
            rows='10'
            placeholder={'Enter description...'}
            value={textarea}
            onChange={changeTextareaHandler}
          ></textarea>
        </div>

        <div className={classes['new-course__details']}>
          <div className={classes['new-course__details--one-column']}>
            <h4 className={classes['new-course--title']}>Add author</h4>
            <Input
              label={'Author name'}
              placeholder={'Enter author name...'}
              value={inputAuthor}
              onChange={changeAuthorHandler}
            />
            <Button
              type={'button'}
              onClick={createAuthorHandler}
              className={classes['new-course__button']}
            >
              Create author
            </Button>
          </div>

          <div className={classes['new-course__details--one-column']}>
            <h4 className={classes['new-course--title']}>Authors</h4>
            <ul className={classes['new-course--no-padding']}>
              {authorList.map((author) => (
                <li
                  className={classes['new-course__list-item']}
                  key={author.id}
                >
                  <span>{author.name}</span>
                  <Button onClick={addAuthorListHandler.bind(null, author)}>
                    Add author
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div className={classes['new-course__details--one-column']}>
            <h4 className={classes['new-course--title']}>Duration</h4>
            <Input
              label={'Duration'}
              placeholder={'Enter duration in minutes...'}
              type={'number'}
              onChange={inputDurationHandler}
              value={durationTime}
            />
            <span>Duration: {courseDuration(durationTime)}</span>
          </div>

          <div className={classes['new-course__details--one-column']}>
            <h4 className={classes['new-course--title']}>Course authors</h4>
            <ul className={classes['new-course--no-padding']}></ul>
            {courseAuthorList?.map((author) => (
              <li className={classes['new-course__list-item']} key={author.id}>
                <span>{author.name}</span>
                <Button onClick={deleteAuthorListHandler.bind(null, author)}>
                  Delete author
                </Button>
              </li>
            ))}
          </div>
          <Button type={'button'} onClick={cancelButtonHandler}>
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default CourseForm;
