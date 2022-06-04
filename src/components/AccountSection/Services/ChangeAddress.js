import styles from './ChangeAddress.module.css';
import Card from '../../UI/Card';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCityDetails } from '../../../store/helper-slice';

import useInput from '../../../hooks/use-input';
import { Link } from 'react-router-dom';
import { HelperActions } from '../../../store/helper-slice';
import { ModalActions } from '../../../store/modal-slice';
import { formatter } from '../../../store/helper-functions';
import { useSend } from '../../../hooks/use-send';
const ChangeAddress = props => {
  const helper = useSelector(state => state.helper);

  const dispatch = useDispatch();

  const { sendData } = useSend();

  const {
    value: addressLineOne,
    setIsTouched: addressLineOneIsTouched,
    isValid: addressLineOneIsValid,
    isInvalid: addressLineOneIsInvalid,
    changeHandler: addressLineOneChangeHandler,
    blurHandler: addressLineOneBlurHandler,
  } = useInput(addressLineOne => addressLineOne.trim().length !== 0);
  const {
    value: addressLineTwo,
    setIsTouched: addressLineTwoIsTouched,
    isValid: addressLineTwoIsValid,
    isInvalid: addressLineTwoIsInvalid,
    changeHandler: addressLineTwoChangeHandler,
    blurHandler: addressLineTwoBlurHandler,
  } = useInput(value => value.trim().length !== 0);
  const {
    value: pin,
    setIsTouched: pinIsTouched,
    isValid: pinIsValid,
    isInvalid: pinIsInvalid,
    changeHandler: pinChangeHandler,
    blurHandler: pinBlurHandler,
  } = useInput(value => value.trim().length !== 0);
  const {
    value: password,
    setIsTouched: passwordIsTouched,
    isValid: passwordIsValid,
    isInvalid: passwordIsInvalid,
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
  } = useInput(value => value.trim().length !== 0);

  const addressOneClasses = addressLineOneIsInvalid ? styles.invalid : '';
  const addressTwoClasses = addressLineTwoIsInvalid ? styles.invalid : '';
  const pinClasses = pinIsInvalid ? styles.invalid : '';
  const passwordClasses = passwordIsInvalid ? styles.invalid : '';

  useEffect(() => {
    if (!pin) return;
    dispatch(getCityDetails(pin));
  }, [pin, dispatch]);

  const { city, state } = helper;

  const submitHandler = async e => {
    e.preventDefault();
    if (!addressLineOneIsValid) addressLineOneIsTouched(true);
    if (!addressLineTwoIsValid) addressLineTwoIsTouched(true);
    if (!pinIsValid) pinIsTouched(true);
    if (!passwordIsValid) passwordIsTouched(true);

    if (
      !addressLineOneIsValid ||
      !addressLineTwoIsValid ||
      !pinIsValid ||
      !passwordIsValid
    )
      return;

    const newAddress = `${formatter(addressLineOne)} ${formatter(
      addressLineTwo
    )}, ${city}, ${state} ${pin}`;

    dispatch(HelperActions.reset());

    const { data, error, status } = await sendData(
      process.env.REACT_APP_BACKEND_URL + '/service/change-address',
      { password, newAddress }
    );

    if (status === 401) {
      return dispatch(
        ModalActions.confirmModalHandler({
          isModal: true,
          message: 'Incorrect password!',
          redirect: false,
        })
      );
    }

    if (error) return;

    dispatch(
      ModalActions.confirmModalHandler({
        isModal: true,
        message: 'Information has been updated!',
        redirect: true,
      })
    );
  };

  return (
    <Card>
      <h2 className={styles.title}>Change Address</h2>
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.wrapper}>
          <div className={styles.inputs}>
            <label>Address Line 1</label>
            <input
              value={addressLineOne}
              className={addressOneClasses}
              onChange={addressLineOneChangeHandler}
              onBlur={addressLineOneBlurHandler}
              type="text"
            />
          </div>
          {addressLineOneIsInvalid && (
            <p className={styles.error}>Invalid entry</p>
          )}
        </div>
        <div className={styles.wrapper}>
          <div className={styles.inputs}>
            <label>Address Line 2</label>
            <input
              value={addressLineTwo}
              className={addressTwoClasses}
              onChange={addressLineTwoChangeHandler}
              onBlur={addressLineTwoBlurHandler}
              type="text"
            />
          </div>
          {addressLineTwoIsInvalid && (
            <p className={styles.error}>Invalid entry</p>
          )}
        </div>
        <div className={styles.wrapper}>
          <div className={styles.inputs}>
            <label>PIN Code</label>
            <input
              value={pin}
              className={pinClasses}
              onChange={pinChangeHandler}
              onBlur={pinBlurHandler}
              type="number"
            />
          </div>
          {pinIsInvalid && <p className={styles.error}>Invalid entry</p>}
        </div>
        <div className={styles.wrapper}>
          <div className={styles.inputs}>
            <label>State</label>
            <div className={styles.filled}>{state}</div>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.inputs}>
            <label>City</label>
            <div className={styles.filled}>{city}</div>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.inputs}>
            <label>Password</label>
            <input
              value={password}
              className={passwordClasses}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              type="password"
            />
          </div>
          {passwordIsInvalid && <p className={styles.error}>Invalid entry</p>}
        </div>
        <div className={styles.buttons}>
          <Link to="/account/overview">
            <button type="button">Cancel</button>
          </Link>
          <button type="submit">Submit</button>
        </div>
      </form>
    </Card>
  );
};
export default ChangeAddress;
