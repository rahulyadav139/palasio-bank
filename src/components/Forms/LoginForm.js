import styles from './Form.module.css';
import useInput from '../../hooks/use-input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AuthActions } from '../../store/auth-slice';
import { ModalActions } from '../../store/modal-slice';

import { BankActions } from '../../store/bank-slice';
import { useSend } from '../../hooks/use-send';

const LoginForm = props => {
  const { sendData } = useSend();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

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

  const submitHandler = async e => {
    e.preventDefault();
    if (!usernameIsValid) userNameIsTouched(true);
    if (!passwordIsValid) passwordIsTouched(true);

    if (!usernameIsValid || !passwordIsValid) {
      return;
    }

    const { data, error, status } = await sendData(
      'https://palasio-bank.herokuapp.com/auth/login',
      {
        username,
        password,
      }
    );

    console.log(status);

    if (status === 401) {
      setError(data.message);
      return;
    }
    if (error) return;
    setError(null);

    dispatch(
      ModalActions.loginModalHandler({
        isModal: false,
        loginForm: true,
      })
    );

    dispatch(
      BankActions.initializeBanking({
        fullName: data.fullName,
        accountNumber: data.accountNumber,
      })
    );

    dispatch(AuthActions.loginHandler({ token: data.token }));
    navigate('/account');
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
