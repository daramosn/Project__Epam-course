import React from 'react';

import classes from './AuthorsPanel.module.scss';
import Button from '../../../../common/Button';

const AuthorsPanel = ({
    authorList,
    title,
    buttonName,
    onClickAuthor,
    className,
}) => {
    const authorButtonHandler = (author) => {
        onClickAuthor(author);
    };

    return (
        <div className={classes['authors-panel'] + ' ' + className}>
            <h4 className={classes['authors-panel--title']}>{title}</h4>
            <ul className={classes['authors-panel--no-padding']}>
                {authorList?.map((author) => (
                    <li
                        className={classes['authors-panel__list-item']}
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
