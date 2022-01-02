import styles from '../../Forms/UpdateForm.module.css';
import Card from '../../UI/Card';
import { Link } from 'react-router-dom';
import useInput from '../../../hooks/use-input';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { financialData } from '../../../store/promotional-data';
import { ModalActions } from '../../../store/modal-slice';

const EnquiryForm = props => {
  const [account, setAccount] = useState(0);
  const [isSelected, setIsSelected] = useState(true);

  const dispatch = useDispatch();
  const params = useParams();
  const productName = financialData.find(
    el => el.id === params.productId
  ).title;
  console.log(productName);

  const profile = useSelector(state => state.bank.profile);
  const {
    value: password,
    setIsTouched: passwordIsTouched,
    isValid: passwordIsValid,
    isInvalid: passwordIsInvalid,
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
  } = useInput(value => value.trim().length !== 0);

  const passwordClasses = passwordIsInvalid ? styles.invalid : '';

  const submitHandler = e => {
    e.preventDefault();

    if (!passwordIsValid) passwordIsTouched(true);
    if (account !== 'selected') setIsSelected(false);

    if (!passwordIsValid || account !== 'selected') return;

    if (password !== profile.authDetails.password) {
      dispatch(
        ModalActions.confirmModalHandler({
          isModal: true,
          message: 'Incorrect password!',
          redirect: false,
        })
      );

      return;
    }

    dispatch(
      ModalActions.confirmModalHandler({
        isModal: true,
        message: 'Enquiry has been submitted!',
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
    <Card>
      <h1 className={styles.title}>Enquiry Form</h1>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.wrapper}>
          <div className={styles.inputs}>
            <label>Product Name</label>
            <div className={styles.filled}>{productName}</div>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.inputs}>
            <label>Name</label>
            <div className={styles.filled}>{profile.personalDetails.name}</div>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.inputs}>
            <label>Account</label>
            <select value={account} onChange={optionChangeHandler}>
              <option>--select--</option>
              <option value="selected">
                {profile.bankAccountDetails.accountNumber}
              </option>
            </select>
          </div>
          {!isSelected && <p className={styles.error}>Invalid entry</p>}
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
export default EnquiryForm;
