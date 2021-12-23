import styles from './Operations.module.css';
import { SendIcon } from '../components/icons';
import { CloseIcon } from '../components/icons';
import { LoanIcon } from '../components/icons';
import { useState } from 'react';

const Operations = props => {
  const [showCard, setShowCard] = useState({
    send: true,
    loan: false,
    close: false,
  });

  const instantTransferHandler = () => {
    setShowCard({
      send: true,
      loan: false,
      close: false,
    });
  };
  const instantLoanHandler = () => {
    setShowCard({
      send: false,
      loan: true,
      close: false,
    });
  };
  const instantClosingHandler = () => {
    setShowCard({
      send: false,
      load: false,
      close: true,
    });
  };
  const activeSendCardClass = showCard.send
    ? `${styles.item} ${styles.send} ${styles.active}`
    : `${styles.item} ${styles.send}`;
  const activeLoanCardClass = showCard.loan
    ? `${styles.item} ${styles.loan} ${styles.active}`
    : `${styles.item} ${styles.loan}`;
  const activeCloseCardClass = showCard.close
    ? `${styles.item} ${styles.close} ${styles.active}`
    : `${styles.item} ${styles.close}`;
  return (
    <div>
      <div className={styles.operations}>
        <div className={styles.heading}>
          <h3 className={styles.title}>OPERATIONS</h3>
          <h1 className={styles.introtext}>
            Everything as simple as possible, but no simpler.
          </h1>
        </div>
        <div>
          <ul className={styles.items}>
            <li
              onClick={instantTransferHandler}
              className={activeSendCardClass}
            >
              01 Instant Transfer
            </li>
            <li onClick={instantLoanHandler} className={activeLoanCardClass}>
              02 Instant Loan
            </li>
            <li
              onClick={instantClosingHandler}
              className={activeCloseCardClass}
            >
              03 Instant Closing
            </li>
          </ul>
        </div>
        {showCard.send && (
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.send}`}>
              <SendIcon />
            </div>
            <div className={styles.optext}>
              <h3>Tranfser money to anyone, instantly! No fees, no BS.</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        )}
        {showCard.loan && (
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.loan}`}>
              <LoanIcon />
            </div>
            <div className={styles.optext}>
              <h3>
                Buy a home or make your dreams come true, with instant loans.
              </h3>
              <p>
                {' '}
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
            </div>
          </div>
        )}
        {showCard.close && (
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.close}`}>
              <CloseIcon />
            </div>
            <div className={styles.optext}>
              <h3>
                No longer need your account? No problem! Close it instantly.
              </h3>
              <p>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
};
export default Operations;
