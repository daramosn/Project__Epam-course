import React from 'react';

import classes from './AuthorsPanel.module.scss';
import Button from '../../../../common/Button';

const AuthorsPanel = ({ authorList, title, buttonName, onClickAuthor }) => {
    const authorButtonHandler = (author) => {
        onClickAuthor(author);
    };

    return (
        <div className={classes['authors-list']}>
            <h4 className={classes['authors-list--title']}>{title}</h4>
            <ul className={classes['authors-list--no-padding']}>
                {authorList?.map((author) => (
                    <li
                        className={classes['authors-list__list-item']}
                        key={author.id}
                    >
                        <span>{author.name}</span>
                        <Button
                            onClick={authorButtonHandler.bind(null, author)}
                        >
                            {buttonName}
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuthorsPanel;
