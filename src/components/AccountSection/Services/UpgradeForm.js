import { Fragment } from 'react';
import styles from '../../Forms/UpdateForm.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import useInput from '../../../hooks/use-input';
import { ModalActions } from '../../../store/modal-slice';
import { useLocation } from 'react-router-dom';

import { useFetch } from '../../../hooks/use-fetch';
import { useSend } from '../../../hooks/use-send';

const UpgradeForm = props => {
  const [account, setAccount] = useState(0);
  const [isSelected, setIsSelected] = useState(true);
  const basicDetails = useSelector(state => state.bank.profile);
  const dispatch = useDispatch();

  const { sendData } = useSend();

  const location = useLocation();

  const upgradeType = location.pathname.split('/')[3].split('-')[0];

  const { loading, error, profile } = useFetch(
    process.env.REACT_APP_BACKEND_URL + '/service/upgrade'
  );

  const getCurrentProduct = () => {
    let currentProduct;

    switch (upgradeType) {
      case 'debit':
        currentProduct = profile.debitCardType;
        break;
      case 'credit':
        currentProduct = profile.creditCardType;
        break;
      default:
        currentProduct = profile.accountType;
        break;
    }

    return currentProduct;
  };

  const {
    value: password,
    setIsTouched: passwordIsTouched,
    isValid: passwordIsValid,
    isInvalid: passwordIsInvalid,
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
  } = useInput(value => value.trim().length !== 0);

  const passwordClasses = passwordIsInvalid ? styles.invalid : '';

  const submitHandler = async e => {
    e.preventDefault();

    if (!passwordIsValid) passwordIsTouched(true);
    if (account !== 'selected') setIsSelected(false);

    if (!passwordIsValid || account !== 'selected') return;

    const upgrade = {
      upgradeType,
      upgradeTo: props.title,
      password,
    };

    const { error, status } = await sendData(
      process.env.REACT_APP_BACKEND_URL + '/service/upgrade',
      upgrade
    );

    if (status === 401) {
      dispatch(
        ModalActions.confirmModalHandler({
          isModal: true,
          message: 'Incorrect password!',
          redirect: false,
        })
      );
      return;
    }

    if (error) return;

    dispatch(
      ModalActions.confirmModalHandler({
        isModal: true,
        message: 'Product has been updated!',
        redirect: true,
      })
    );
  };

  const optionChangeHandler = e => {
    setAccount(e.target.value);
    if (e.target.value === 'selected') setIsSelected(true);
    else setIsSelected(false);
  };
  return (
    <Fragment>
      {!loading && (
        <Fragment>
          <h2 className={styles.title}>Upgrade Form</h2>
          <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles.wrapper}>
              <div className={styles.inputs}>
                <label>Name</label>
                <div className={styles.filled}>{basicDetails.fullName}</div>
              </div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.inputs}>
                <label>Account</label>
                <select value={account} onChange={optionChangeHandler}>
                  <option>--select--</option>
                  <option value="selected">{basicDetails.accountNumber}</option>
                </select>
              </div>
              {!isSelected && <p className={styles.error}>Invalid entry</p>}
            </div>
            <div className={styles.wrapper}>
              <div className={styles.inputs}>
                <label>Current</label>
                <div className={styles.filled}>{getCurrentProduct()}</div>
              </div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.inputs}>
                <label>Upgrade to</label>
                <div className={styles.filled}>{props.title}</div>
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
              {passwordIsInvalid && (
                <p className={styles.error}>Invalid entry</p>
              )}
            </div>
            <div className={styles.buttons}>
              <Link to="/account/overview">
                <button type="button">Cancel</button>
              </Link>

              <button type="submit">Submit</button>
            </div>
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};
export default UpgradeForm;
