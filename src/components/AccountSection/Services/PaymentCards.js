import styles from './PaymentCards.module.css';

import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { ToggleOnIcon, ToggleOffIcon } from '../../UI/icons';

const PaymentCards = props => {
  const [showDebitCard, setShowDebitCard] = useState(false);
  const [showCreditCard, setShowCreditCard] = useState(false);

  const debit = useSelector(state => state.bank.profile.debitCardDetails);
  const credit = useSelector(state => state.bank.profile.creditCardDetails);
  const showDebitCardNumber = showDebitCard
    ? debit.cardNumber
    : debit.cardNumber.slice(-4).padStart(16, '*');
  const showDebitCardCVV = showDebitCard ? debit.cvv : ''.padStart(3, '*');
  const showDebitCardValidity = showDebitCard ? debit.validity : '**/**';
  const showCreditCardNumber = showCreditCard
    ? credit.cardNumber
    : credit.cardNumber.slice(-4).padStart(16, '*');
  const showCreditCardCVV = showCreditCard ? credit.cvv : ''.padStart(3, '*');
  const showCreditCardValidity = showCreditCard ? credit.validity : '**/**';

  const debitCardDetailsHandler = () => {
    setShowDebitCard(prev => !prev);
  };
  const creditCardDetailsHandler = () => {
    setShowCreditCard(prev => !prev);
  };
  const debitToggle = showDebitCard ? <ToggleOnIcon /> : <ToggleOffIcon />;
  const debitToggleHint = showDebitCard ? 'Hide' : 'Show';

  const creditToggle = showCreditCard ? <ToggleOnIcon /> : <ToggleOffIcon />;
  const creditToggleHint = showCreditCard ? 'Hide' : 'Show';

  return (
    <Fragment>
      <h2 className={styles.title}>Payment Cards</h2>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.details}>
            <div className={styles.head1}>{debit.cardType}</div>
            <div className={styles.sensitive}>
              <div className={styles.head1}>{showDebitCardNumber}</div>
              <div className={styles.group}>
                <div>
                  <label className={styles.head2}>Validity</label>
                  <div className={styles.head1}>{showDebitCardValidity}</div>
                </div>
                <div>
                  <label className={styles.head2}>CVV</label>
                  <div className={styles.head1}>{showDebitCardCVV}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.button}>
            <button onClick={debitCardDetailsHandler}>
              {debitToggleHint} {debitToggle}
            </button>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.details}>
            <div className={styles.head1}>{credit.cardType}</div>
            <div className={styles.sensitive}>
              <div className={styles.head1}>{showCreditCardNumber}</div>
              <div className={styles.group}>
                <div>
                  <label className={styles.head2}>Validity</label>
                  <div className={styles.head1}>{showCreditCardValidity}</div>
                </div>
                <div>
                  <label className={styles.head2}>CVV</label>
                  <div className={styles.head1}>{showCreditCardCVV}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.button}>
            <button onClick={creditCardDetailsHandler}>
              {creditToggleHint} {creditToggle}
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default PaymentCards;
