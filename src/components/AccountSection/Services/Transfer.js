import styles from '../../Forms/UpdateForm.module.css';
import useInput from '../../../hooks/use-input';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Card from '../../UI/Card';
import { useSelector, useDispatch } from 'react-redux';
import { ModalActions } from '../../../store/modal-slice';
import { useParams } from 'react-router-dom';

import { useSend } from '../../../hooks/use-send';

const Transfer = props => {
  const { sendData } = useSend();
  const [transferFrom, setTransferFrom] = useState(0);
  const [isSelected, setIsSelected] = useState(true);
  const profile = useSelector(state => state.bank.profile);
  const dispatch = useDispatch();
  const params = useParams();

  const {
    value: sendToAccNumber,
    setIsTouched: sendToAccNumberIsTouched,
    isValid: sendToAccNumberIsValid,
    isInvalid: sendToAccNumberIsInvalid,
    changeHandler: sendToAccNumberChangeHandler,
    blurHandler: sendToAccNumberBlurHandler,
  } = useInput(value => value.trim().length !== 0);
  const {
    value: confirmSendToAccNumber,
    setIsTouched: confirmSendToAccNumberIsTouched,
    isValid: confirmSendToAccNumberIsValid,
    isInvalid: confirmSendToAccNumberIsInvalid,
    changeHandler: confirmSendToAccNumberChangeHandler,
    blurHandler: confirmSendToAccNumberBlurHandler,
  } = useInput(value => value.trim().length !== 0);
  const {
    value: ifsc,
    setIsTouched: ifscIsTouched,
    isValid: ifscIsValid,
    isInvalid: ifscIsInvalid,
    changeHandler: ifscChangeHandler,
    blurHandler: ifscBlurHandler,
  } = useInput(value => value.trim().length !== 0);
  const {
    value: amount,
    setIsTouched: amountIsTouched,
    isValid: amountIsValid,
    isInvalid: amountIsInvalid,
    changeHandler: amountChangeHandler,
    blurHandler: amountBlurHandler,
  } = useInput(value => value.trim().length !== 0 && value > 0);
  const {
    value: password,
    setIsTouched: passwordIsTouched,
    isValid: passwordIsValid,
    isInvalid: passwordIsInvalid,
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
  } = useInput(value => value.trim().length !== 0);

  const sendToAccNumberClasses = sendToAccNumberIsInvalid ? styles.invalid : '';
  const confirmSendToAccNumberClasses = confirmSendToAccNumberIsInvalid
    ? styles.invalid
    : '';
  const ifscClasses = ifscIsInvalid ? styles.invalid : '';
  const passwordClasses = passwordIsInvalid ? styles.invalid : '';
  const amountClasses = amountIsInvalid ? styles.invalid : '';

  const optionChangeHandler = e => {
    setTransferFrom(e.target.value);
    if (e.target.value === 'selected') setIsSelected(true);
    else setIsSelected(false);
  };

  const submitHandler = async e => {
    e.preventDefault();

    if (!sendToAccNumberIsValid) sendToAccNumberIsTouched(true);
    if (!confirmSendToAccNumberIsValid) confirmSendToAccNumberIsTouched(true);
    if (!ifscIsValid) ifscIsTouched(true);
    if (!amountIsValid) amountIsTouched(true);
    if (!passwordIsValid) passwordIsTouched(true);
    if (transferFrom !== 'selected') setIsSelected(false);

    if (
      !sendToAccNumberIsValid ||
      !confirmSendToAccNumberIsValid ||
      !ifscIsValid ||
      !passwordIsValid ||
      !amountIsValid ||
      transferFrom !== 'selected'
    )
      return;

    if (sendToAccNumber !== confirmSendToAccNumber) {
      dispatch(
        ModalActions.confirmModalHandler({
          isModal: true,
          message: 'Account number does not match!',
          redirect: false,
        })
      );
      return;
    }

    const newTransaction = {
      amount: amount,
      time: new Date(Date.now()).toISOString(),
      senderRemark: `${params.paymentMethod.toUpperCase()} Fund Transfer to ${sendToAccNumber}`,
      receiverRemark: `${params.paymentMethod.toUpperCase()} Fund Received from ${
        profile.accountNumber
      }`,
      sendToAccNumber,
      ifsc,
    };

    const {data, error, status} = await sendData(
      process.env.REACT_APP_BACKEND_URL + '/service/transfer',
      { newTransaction, password }
    );

    if (status === 401) {
      dispatch(
        ModalActions.confirmModalHandler({
          isModal: true,
          message: data.message,
          redirect: false,
        })
      );
      return;
    }

    if (error) return;

    dispatch(
      ModalActions.confirmModalHandler({
        isModal: true,
        message: 'Fund transfer successfully!',
        redirect: true,
      })
    );
  };
  return (
    <Card>
      <h2
        className={styles.title}
      >{`${params.paymentMethod.toUpperCase()} Fund Transfer`}</h2>

      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.wrapper}>
          <div className={styles.inputs}>
            <label>Transfer From</label>
            <select value={transferFrom} onChange={optionChangeHandler}>
              <option>--select--</option>
              <option value="selected">{profile.accountNumber}</option>
            </select>
          </div>
          {!isSelected && <p className={styles.error}>Invalid entry</p>}
        </div>

        <div className={styles.wrapper}>
          <div className={styles.inputs}>
            <label>Beneficiary Account Number</label>
            <input
              value={sendToAccNumber}
              className={sendToAccNumberClasses}
              onChange={sendToAccNumberChangeHandler}
              onBlur={sendToAccNumberBlurHandler}
              type="number"
            />
          </div>
          {sendToAccNumberIsInvalid && (
            <p className={styles.error}>Invalid entry</p>
          )}
        </div>
        <div className={styles.wrapper}>
          <div className={styles.inputs}>
            <label>Confirm Account Number</label>
            <input
              value={confirmSendToAccNumber}
              className={confirmSendToAccNumberClasses}
              onChange={confirmSendToAccNumberChangeHandler}
              onBlur={confirmSendToAccNumberBlurHandler}
              type="password"
            />
          </div>
          {confirmSendToAccNumberIsInvalid && (
            <p className={styles.error}>Invalid entry</p>
          )}
        </div>
        <div className={styles.wrapper}>
          <div className={styles.inputs}>
            <label>Beneficiary IFSC</label>
            <input
              value={ifsc}
              className={ifscClasses}
              onChange={ifscChangeHandler}
              onBlur={ifscBlurHandler}
              type="text"
            />
          </div>
          {ifscIsInvalid && <p className={styles.error}>Invalid entry</p>}
        </div>
        <div className={styles.wrapper}>
          <div className={styles.inputs}>
            <label>Amount</label>
            <input
              value={amount}
              className={amountClasses}
              onChange={amountChangeHandler}
              onBlur={amountBlurHandler}
              type="number"
            />
          </div>
          {amountIsInvalid && <p className={styles.error}>Invalid entry</p>}
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
export default Transfer;
