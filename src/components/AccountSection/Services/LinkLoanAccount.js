import styles from '../../Forms/UpdateForm.module.css';
import Card from '../../UI/Card';
import useInput from '../../../hooks/use-input';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ModalActions } from '../../../store/modal-slice';

import { useSend } from '../../../hooks/use-send';

const LinkLoanAccount = props => {
  const [isSelected, setIsSelected] = useState(true);
  const [loanType, setLoanType] = useState('unselected');
  const dispatch = useDispatch();

  const { sendData } = useSend();
  const {
    value: loanAccountNumber,
    setIsTouched: loanAccountNumberIsTouched,
    isValid: loanAccountNumberIsValid,
    isInvalid: loanAccountNumberIsInvalid,
    changeHandler: loanAccountNumberChangeHandler,
    blurHandler: loanAccountNumberBlurHandler,
  } = useInput(value => value.trim().length >= 8);

  const loanAccountNumberClasses = loanAccountNumberIsInvalid
    ? styles.invalid
    : '';
  const optionChangeHandler = e => {
    setLoanType(e.target.value);
    if (e.target.type !== 'unselected') setIsSelected(true);
  };

  const submitHandler = async e => {
    e.preventDefault();
    if (!loanAccountNumberIsValid) loanAccountNumberIsTouched(true);
    if (loanType === 'unselected') setIsSelected(false);

    if (!loanAccountNumberIsValid || loanType === 'unselected') return;

    const newLoanDetails = {
      loanAccountNumber,
      loanType,
      period: 5,
      sum: '5,00,000',
      emi: '12,000',
    };

    const { error, status } = await sendData(
      'https://palasio-bank.herokuapp.com/service/loan',
      newLoanDetails
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
        message: 'Information has been updated!',
        redirect: true,
      })
    );
  };

  return (
    <Card>
      <h2 className={styles.title}>Link Loan Account Number</h2>
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.wrapper}>
          <div className={styles.inputs}>
            <label>Loan Account Number</label>
            <input
              value={loanAccountNumber}
              className={loanAccountNumberClasses}
              onChange={loanAccountNumberChangeHandler}
              onBlur={loanAccountNumberBlurHandler}
              type="number"
            />
          </div>
          {loanAccountNumberIsInvalid && (
            <p className={styles.error}>
              Please enter valid 8 digit loan account number
            </p>
          )}
        </div>

        <div className={styles.wrapper}>
          <div className={styles.inputs}>
            <label>Loan Type</label>
            <select value={loanType} onChange={optionChangeHandler}>
              <option value="unselected">--choose-one--</option>
              <option value="Personal Loan">Personal Loan</option>
              <option value="Business Loan">Business Loan</option>
              <option value="Education Loan">Education Loan</option>
            </select>
          </div>
          {!isSelected && <p className={styles.error}>Select any one</p>}
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
export default LinkLoanAccount;
