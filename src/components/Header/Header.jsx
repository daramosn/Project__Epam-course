import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button';
import { userSelector } from '../../store/user/slice';
import { logoutUser } from '../../store/user/thunk';

import classes from './Header.module.scss';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuth, name, role } = useSelector(userSelector);

    const logOutHandler = () => {
        dispatch(logoutUser());

        navigate('/login');
    };

    return (
        <nav className={classes['header-navbar']}>
            <ul className={classes['header-navbar__list']}>
                <li className={classes['header-navbar__list-logo']}>
                    <Logo />
                    <span>COURSES</span>
                </li>
                {isAuth && (
                    <>
                        <li className={classes['header-navbar__list-name']}>
                            {name}{' '}
                            {role === 'admin' && (
                                <span
                                    className={classes['header-navbar--pill']}
                                >
                                    admin
                                </span>
                            )}
                        </li>
                        <li>
                            <Button
                                className={classes['header-navbar__button']}
                                onClick={logOutHandler}
                            >
                                Log out
                            </Button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Header;
