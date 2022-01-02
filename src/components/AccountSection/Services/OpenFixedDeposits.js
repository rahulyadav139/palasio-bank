import styles from './OpenFixedDeposits.module.css';
import Card from '../../UI/Card';
import { useState, useEffect } from 'react';
import { currencyFormatter } from '../../../store/helper-functions';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BankActions } from '../../../store/bank-slice';
import { ModalActions } from '../../../store/modal-slice';

const OpenFixedDeposits = props => {
  const dispatch = useDispatch();
  const [sum, setSum] = useState(10000);
  const [year, setYear] = useState(1);
  const [sumIsTouched, setSumIsTouched] = useState(false);
  const [yearIsTouched, setYearIsTouched] = useState(false);
  const [interest, setInterest] = useState(3.7);

  const accountBalance = useSelector(
    state => state.bank.profile.bankAccountDetails.accountBalance
  );

  const [maturityValue, setMaturityValue] = useState('');

  const sumIsValid = sum > 0;
  const sumIsInvalid = !sumIsValid && sumIsTouched;

  const yearIsValid = year > 0;
  const yearIsInvalid = !yearIsValid && yearIsTouched;

  const avoidKeys = e => {
    if (e.key === '.' || e.key === 'e' || e.key === '-') e.preventDefault();
  };

  useEffect(() => {
    setMaturityValue(+sum + (sum * interest * year) / 100);
  }, [sum, interest, year]);

  const getMaturityDate = yearValue => {
    const dateNow = new Date(Date.now());
    const day = dateNow.getDate();
    const month = dateNow.getMonth();
    const yearNow = dateNow.getFullYear();

    const maturityDate = new Date(yearNow + +yearValue, month, day);

    const formattedDate = maturityDate.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    return formattedDate;
  };
  const getInterestValue = (sumValue, yearValue) => {
    let interestValue;
    if (yearValue <= 5) {
      if (sumValue <= 100000) interestValue = 3.7;

      if (sumValue > 100000 && sumValue <= 500000) interestValue = 4.9;
      if (sumValue > 500000) interestValue = 5.5;
    } else {
      if (sumValue <= 100000) return (interestValue = 4.2);

      if (sumValue > 100000 && sumValue <= 500000) return (interestValue = 5.2);
      if (sumValue > 500000) interestValue = 5.9;
    }
    return interestValue;
  };

  const sumChangeHandler = e => {
    if (!e.target.checkValidity()) {
      e.preventDefault();
      setSum(1000000);
      return;
    }

    const currValue = e.target.value;
    setSum(currValue);

    const interestValue = getInterestValue(currValue, year);
    setInterest(interestValue);
  };

  const yearChangeHandler = e => {
    if (!e.target.checkValidity()) {
      e.preventDefault();
      setSum(10);
      return;
    }

    const currValue = e.target.value;
    setYear(currValue);

    const interestValue = getInterestValue(sum, currValue);
    setInterest(interestValue);
  };

  const sumBlurHandler = () => {
    setSumIsTouched(true);
  };
  const yearBlurHandler = () => {
    setYearIsTouched(true);
  };

  const submitHandler = e => {
    e.preventDefault();

    if (!sumIsValid) sumIsTouched(true);
    if (!yearIsValid) setYearIsTouched(true);

    if (!sumIsValid || !yearIsValid) return;

    if (sum > accountBalance) {
      dispatch(
        ModalActions.confirmModalHandler({
          isModal: true,
          message: 'Insufficient balance!',
          redirect: false,
        })
      );
      return;
    }

    const newFD = {
      sum,
      rate: `${interest}%`,
      maturityDate: getMaturityDate(year),
      maturityValue: currencyFormatter(maturityValue),
      interest: currencyFormatter(maturityValue - sum),
    };

    dispatch(BankActions.openFixedDeposit(newFD));
    dispatch(
      ModalActions.confirmModalHandler({
        isModal: true,
        message: 'Fixed deposit has been opened successfully!',
        redirect: true,
      })
    );

    const newTransaction = {
      amount: -sum,
      time: new Date(Date.now()).toISOString(),
      remark: 'fixed deposit',
    };
    dispatch(BankActions.billPayment(newTransaction));
    dispatch(BankActions.saveToLocal());
  };

  const sumClasses = sumIsInvalid
    ? `${styles.input} ${styles.invalid}`
    : styles.input;
  const yearClasses = yearIsInvalid
    ? `${styles.input} ${styles.invalid}`
    : styles.input;

  return (
    <Card>
      <h2 className={styles.title}>Open Fixed Deposit</h2>
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.row}>
          <label className={styles.label}>Total Investment</label>
          <div className={sumClasses}>
            <span>₹</span>
            <input
              placeholder="0"
              value={sum}
              onChange={sumChangeHandler}
              onKeyDown={avoidKeys}
              onBlur={sumBlurHandler}
              step="1"
              min="0"
              max="1000000"
              type="number"
            />
          </div>
        </div>
        <div className={styles.slider}>
          <input
            value={sum}
            onChange={sumChangeHandler}
            step="1"
            min="10000"
            max="1000000"
            type="range"
          />
        </div>

        <div className={styles.interest}>
          <label>Rate of Interest (p.a.)</label>
          <div>{`${interest}%`}</div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Time Period (Years)</label>
          <div className={yearClasses}>
            <input
              onChange={yearChangeHandler}
              onKeyDown={avoidKeys}
              onBlur={yearBlurHandler}
              value={year}
              step="1"
              min="0"
              max="10"
              type="number"
            />
          </div>
        </div>
        <div className={styles.slider}>
          <input
            onChange={yearChangeHandler}
            value={year}
            step="1"
            min="1"
            max="10"
            type="range"
          />
        </div>
        <div className={styles.details}>
          <div className={styles.row}>
            <label>Maturity Date</label>
            <div>{getMaturityDate(year)}</div>
          </div>
          <div className={styles.row}>
            <label>Maturity Value</label>
            <div>{currencyFormatter(maturityValue)}</div>
          </div>
          <div className={styles.row}>
            <label>Aggregate Interest Amount</label>
            <div>{currencyFormatter(maturityValue - sum)}</div>
          </div>
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
export default OpenFixedDeposits;
