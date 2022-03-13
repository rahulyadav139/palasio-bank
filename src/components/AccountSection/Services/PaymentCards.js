import styles from './PaymentCards.module.css';

import { Fragment } from 'react';

import { useState } from 'react';
import { ToggleOnIcon, ToggleOffIcon } from '../../UI/icons';
import { useFetch } from '../../../hooks/use-fetch';

const PaymentCards = props => {
  const [showDebitCard, setShowDebitCard] = useState(false);
  const [showCreditCard, setShowCreditCard] = useState(false);

  const { loading, error, profile } = useFetch(
    'https://palasio-bank.herokuapp.com/admin/cards'
  );

  const getDetails = () => {
    const debit = profile.debitCardDetails;
    const credit = profile.creditCardDetails;
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

    return [
      debit,
      credit,
      showDebitCardNumber,
      showDebitCardCVV,
      showDebitCardValidity,
      showCreditCardNumber,
      showCreditCardCVV,
      showCreditCardValidity,
    ];
  };
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
      {!loading && (
        <Fragment>
          <h2 className={styles.title}>Payment Cards</h2>
          <div className={styles.wrapper}>
            <div className={styles.card}>
              <div className={styles.details}>
                <div className={styles.head1}>{getDetails()[0].cardType}</div>
                <div className={styles.sensitive}>
                  <div className={styles.head1}>{getDetails()[2]}</div>
                  <div className={styles.group}>
                    <div>
                      <label className={styles.head2}>Validity</label>
                      <div className={styles.head1}>{getDetails()[4]}</div>
                    </div>
                    <div>
                      <label className={styles.head2}>CVV</label>
                      <div className={styles.head1}>{getDetails()[3]}</div>
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
                <div className={styles.head1}>{getDetails()[1].cardType}</div>
                <div className={styles.sensitive}>
                  <div className={styles.head1}>{getDetails()[5]}</div>
                  <div className={styles.group}>
                    <div>
                      <label className={styles.head2}>Validity</label>
                      <div className={styles.head1}>{getDetails()[7]}</div>
                    </div>
                    <div>
                      <label className={styles.head2}>CVV</label>
                      <div className={styles.head1}>{getDetails()[6]}</div>
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
      )}
      {loading && <p>Loading...</p>}
    </Fragment>
  );
};
export default PaymentCards;
