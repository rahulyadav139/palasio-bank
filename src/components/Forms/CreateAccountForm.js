import styles from './Form.module.css';
import useInput from '../../hooks/use-input';
import { useDispatch } from 'react-redux';
import { formatter } from '../../store/helper-functions';
import { BankActions } from '../../store/bank-slice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalActions } from '../../store/modal-slice';
import { AuthActions } from '../../store/auth-slice';
import { useSelector } from 'react-redux';
import bankData from '../../store/bank-data';

const CreateAccountForm = props => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useSelector(state => state.auth.login);

  const {
    value: firstName,
    setIsTouched: firstNameIsTouched,
    isValid: firstNameIsValid,
    isInvalid: firstNameIsInValid,
    changeHandler: firstNameChangeHandler,
    blurHandler: firstNameBlurHandler,
  } = useInput(value => value.trim().length !== 0);

  const {
    value: lastName,
    setIsTouched: lastNameIsTouched,
    isValid: lastNameIsValid,
    isInvalid: lastNameIsInValid,
    changeHandler: lastNameChangeHandler,
    blurHandler: lastNameBlurHandler,
  } = useInput(value => value.trim().length !== 0);

  const {
    value: email,
    setIsTouched: emailIsTouched,
    isValid: emailIsValid,
    isInvalid: emailIsInValid,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
  } = useInput(
    emailValue => emailValue.includes('@') && emailValue.includes('.')
  );
  const {
    value: createUserName,
    setIsTouched: createUserNameIsTouched,
    isValid: createUserNameIsValid,
    isInvalid: createUserNameIsInValid,
    changeHandler: createUserNameChangeHandler,
    blurHandler: createUserNameBlurHandler,
  } = useInput(value => value.trim().length >= 6);

  const {
    value: createPassword,
    setIsTouched: createPasswordIsTouched,
    isValid: createPasswordIsValid,
    isInvalid: createPasswordIsInValid,
    changeHandler: createPasswordChangeHandler,
    blurHandler: createPasswordBlurHandler,
  } = useInput(value => value.trim().length >= 6);

  const {
    value: confirmPassword,
    setIsTouched: confirmPasswordIsTouched,
    isValid: confirmPasswordIsValid,
    isInvalid: confirmPasswordIsInValid,
    changeHandler: confirmPasswordChangeHandler,
    blurHandler: confirmPasswordBlurHandler,
  } = useInput(value => value.trim().length !== 0);

  const firstNameClasses = firstNameIsInValid ? styles.invalid : '';
  const lastNameClasses = lastNameIsInValid ? styles.invalid : '';
  const emailClasses = emailIsInValid ? styles.invalid : '';
  const createUserNameClasses = createUserNameIsInValid ? styles.invalid : '';
  const createPasswordClasses = createPasswordIsInValid ? styles.invalid : '';
  const confirmPasswordClasses = confirmPasswordIsInValid ? styles.invalid : '';

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

  const createAccountSubmitHandler = e => {
    e.preventDefault();

    if (!firstNameIsValid) firstNameIsTouched(true);
    if (!lastNameIsValid) lastNameIsTouched(true);
    if (!emailIsValid) emailIsTouched(true);
    if (!createUserNameIsValid) createUserNameIsTouched(true);
    if (!createPasswordIsValid) createPasswordIsTouched(true);
    if (!confirmPasswordIsValid) confirmPasswordIsTouched(true);

    if (
      !firstNameIsValid ||
      !lastNameIsValid ||
      !emailIsValid ||
      !createUserNameIsValid ||
      !createPasswordIsValid ||
      !confirmPasswordIsValid
    ) {
      return;
    }
    const profile = bankData.find(
      el => el.authDetails.username === createUserName
    );
    if (profile) {
      setError('Username already exists!');
      return;
    }
    const profileEmail = bankData.find(
      el => el.personalDetails.email === email
    );

    if (profileEmail) {
      setError('Another user exists with same email!');
      return;
    }
    if (createPassword !== confirmPassword) {
      setError('Password does not match!');
      return;
    }
    const newUserDetails = {
      name: `${formatter(firstName.trim())} ${formatter(lastName.trim())}`,
      email,
      username: createUserName,
      password: createPassword,
    };
    setError(null);
    dispatch(BankActions.crateNewAccount(newUserDetails));

    dispatch(BankActions.initializeBanking(createUserName));
    dispatch(AuthActions.authHandler(true));
  };
  return (
    <form onSubmit={createAccountSubmitHandler} className={styles.form}>
      {error && <p className={styles['login-fail']}>{error}</p>}
      <div>
        <div className={styles.inputs}>
          <label>First Name</label>
          <input
            className={firstNameClasses}
            value={firstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            type="text"
          />
        </div>
        {firstNameIsInValid && (
          <div className={styles.error}>
            <p>Invalid entry</p>
          </div>
        )}
      </div>
      <div>
        <div className={styles.inputs}>
          <label>Last Name</label>
          <input
            className={lastNameClasses}
            value={lastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            type="text"
          />
        </div>
        {lastNameIsInValid && (
          <div className={styles.error}>
            <p>Invalid entry</p>
          </div>
        )}
      </div>
      <div>
        <div className={styles.inputs}>
          <label>Email</label>
          <input
            className={emailClasses}
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            type="text"
          />
        </div>
        {emailIsInValid && (
          <div className={styles.error}>
            <p>Invalid entry</p>
          </div>
        )}
      </div>
      <div>
        <div className={styles.inputs}>
          <label>Create Username</label>
          <input
            className={createUserNameClasses}
            value={createUserName}
            onChange={createUserNameChangeHandler}
            onBlur={createUserNameBlurHandler}
            type="text"
          />
        </div>
        {createUserNameIsInValid && (
          <div className={styles.error}>
            <p>Username must have at least 6 characters</p>
          </div>
        )}
      </div>
      <div>
        <div className={styles.inputs}>
          <label>Create Password</label>
          <input
            className={createPasswordClasses}
            value={createPassword}
            onChange={createPasswordChangeHandler}
            onBlur={createPasswordBlurHandler}
            type="text"
          />
        </div>
        {createPasswordIsInValid && (
          <div className={styles.error}>
            <p>Password must have at least 6 characters</p>
          </div>
        )}
      </div>
      <div>
        <div className={styles.inputs}>
          <label>Confirm Password</label>
          <input
            className={confirmPasswordClasses}
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
            type="password"
          />
        </div>
        {confirmPasswordIsInValid && (
          <div className={styles.error}>
            <p>Password does not match</p>
          </div>
        )}
      </div>
      <div className={styles.buttons}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default CreateAccountForm;
