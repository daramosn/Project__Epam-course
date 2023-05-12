import React from 'react';

import classes from './FormActions.module.scss';
import Button from '../../../../common/Button';

const FormActions = ({ updateForm, onCancel, className }) => {
    const cancelButtonHandler = () => {
        onCancel();
    };

    return (
        <div className={classes['course-actions'] + ' ' + className}>
            <Button type={'submit'}>
                {updateForm ? 'Update course' : 'Create course'}
            </Button>
            <Button type={'button'} onClick={cancelButtonHandler}>
                Cancel
            </Button>
        </div>
    );
};

export default FormActions;
