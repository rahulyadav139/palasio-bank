import Card from '../../UI/Card';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BankActions } from '../../../store/bank-slice';
import useInput from '../../../hooks/use-input';
import { useState } from 'react';
import { formatter } from '../../../store/helper-functions';
import { Link } from 'react-router-dom';
import styles from '../../Forms/UpdateForm.module.css';
import { ModalActions } from '../../../store/modal-slice';

const BillServiceProvidersData = {
  electricity: [
    'MP Poorvi Kshetra Vidyut Vitran',
    'MP Madhya Kshetra Vidyut Vitran',
    'MP Paschim Kshetra Vidyut Vitran',
  ],
  postpaid: ['Jio', 'Airtel', 'Vi'],
  television: ['Dish TV', 'Sun TV', 'TATA Sky'],
  'data-card': ['Airtel', 'Jio', 'Vi'],
  recharge: ['Airtel', 'Jio', 'Vi'],
};

const BillPayment = props => {
  const [accountNumber, setAccountNumber] = useState('unselected');
  const [isAccountNumberSelected, setIsAccountNumberSelected] = useState(true);
  const [serviceProvider, setServiceProvider] = useState('unselected');
  const [isServiceProviderSelected, setIsServiceProviderSelected] =
    useState(true);

  const profile = useSelector(state => state.bank.profile);
  const accNumber = profile.bankAccountDetails.accountNumber;
  const accBalance = profile.bankAccountDetails.accountBalance;
  const dispatch = useDispatch();
  const params = useParams();
  const billServiceProviders = BillServiceProvidersData[params.billType];

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

  const amountClasses = amountIsInvalid ? styles.invalid : '';
  const passwordClasses = passwordIsInvalid ? styles.invalid : '';

  const selectAccountChangeHandler = e => {
    setAccountNumber(e.target.value);
  };
  const selectProviderChangeHandler = e => {
    setServiceProvider(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();

    if (accountNumber === 'unselected') setIsAccountNumberSelected(false);
    if (serviceProvider === 'unselected') setIsServiceProviderSelected(false);
    if (!amountIsValid) amountIsTouched(true);
    if (!passwordIsValid) passwordIsTouched(true);

    if (
      accountNumber === 'unselected' ||
      serviceProvider === 'unselected' ||
      !amountIsValid ||
      !passwordIsValid
    )
      return;

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

    if (amount > accBalance) {
      dispatch(
        ModalActions.confirmModalHandler({
          isModal: true,
          message: 'Insufficient account balance!',
          redirect: true,
        })
      );
      return;
    }

    const newTransaction = {
      amount: -amount,
      time: new Date(Date.now()).toISOString(),
      remark: `${formatter(params.billType)} Payment - ${serviceProvider}`,
    };
    dispatch(BankActions.billPayment(newTransaction));
    dispatch(
      ModalActions.confirmModalHandler({
        isModal: true,
        message: 'Bill payment successfully!',
        redirect: true,
      })
    );
    dispatch(BankActions.saveToLocal());
  };

  return (
    <Card>
      <h2 className={styles.title}>{`${formatter(
        params.billType
      )} Bill Payment`}</h2>
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.wrapper}>
          <div className={styles.inputs}>
            <label>Account Number</label>
            <select value={accountNumber} onChange={selectAccountChangeHandler}>
              <option value="unselected">--select--</option>
              <option value={accNumber}>{accNumber}</option>
            </select>
          </div>
          {!isAccountNumberSelected && (
            <p className={styles.error}>Invalid entry</p>
          )}
        </div>

        <div className={styles.wrapper}>
          <div className={styles.inputs}>
            <label>Service Provider</label>
            <select
              value={serviceProvider}
              onChange={selectProviderChangeHandler}
            >
              <option value="unselected">--select--</option>
              {billServiceProviders.map(el => (
                <option key={el} value={el}>
                  {el}
                </option>
              ))}
            </select>
          </div>
          {!isServiceProviderSelected && (
            <p className={styles.error}>Invalid entry</p>
          )}
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
export default BillPayment;
