import styles from './Form.module.css';
import useInput from '../../hooks/use-input';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AuthActions } from '../../store/auth-slice';
import { ModalActions } from '../../store/modal-slice';
import bankData from '../../store/bank-data.js';
import { BankActions } from '../../store/bank-slice';

const LoginForm = props => {
  const login = useSelector(state => state.auth.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (login) {
      dispatch(
        ModalActions.loginModalHandler({
          isModal: false,
          LoginForm: true,
        })
      );
    }

    return () => {
      if (login) {
        return navigate('/account');
      }
    };
  }, [login, navigate, dispatch]);

  const {
    value: username,
    setIsTouched: userNameIsTouched,
    isValid: usernameIsValid,
    isInvalid: usernameIsInvalid,
    changeHandler: usernameChangeHandler,
    blurHandler: usernameBlurHandler,
  } = useInput(value => value.trim().length !== 0);

  const {
    value: password,
    setIsTouched: passwordIsTouched,
    isValid: passwordIsValid,
    isInvalid: passwordIsInvalid,
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
  } = useInput(value => value.trim().length >= 6);

  const submitHandler = e => {
    e.preventDefault();
    if (!usernameIsValid) userNameIsTouched(true);
    if (!passwordIsValid) passwordIsTouched(true);

    if (!usernameIsValid || !passwordIsValid) {
      return;
    }

    const profile = bankData.find(el => el.authDetails.username === username);

    if (!profile) {
      setError('User Not Found!');
      return;
    }

    if (profile.authDetails.password !== password) {
      setError('Incorrect password!');
      return;
    }
    setError(null);

    dispatch(BankActions.initializeBanking(username));

    dispatch(AuthActions.authHandler(true));
  };

  const usernameClasses = usernameIsInvalid ? styles.invalid : '';
  const passwordClasses = passwordIsInvalid ? styles.invalid : '';

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      {error && <p className={styles['login-fail']}>{error}</p>}
      <div>
        <div className={styles.inputs}>
          <label>Username</label>
          <input
            className={usernameClasses}
            value={username}
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
            type="text"
          />
        </div>
        {usernameIsInvalid && (
          <div className={styles.error}>
            <p>Login can not be empty</p>
          </div>
        )}
      </div>
      <div>
        <div className={styles.inputs}>
          <label>Password</label>
          <input
            className={passwordClasses}
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            type="password"
          />
        </div>
        {passwordIsInvalid && (
          <div className={styles.error}>
            <p>Password must be at least 6 characters</p>
          </div>
        )}
      </div>
      <div className={styles.buttons}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit">Login</button>
      </div>
      <p className={styles['create-account']} onClick={props.onSwitch}>
        New to Palasio! Create an account now.
      </p>
    </form>
  );
};
export default LoginForm;
