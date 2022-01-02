import styles from './Movement.module.css';
import { Fragment } from 'react';
import { currencyFormatter } from '../../../store/helper-functions';

const Movement = props => {
  const { index, remark, time, amount } = props;
  const movType = amount < 0 ? 'Withdraw' : 'Deposit';
  const movTypeClasses =
    amount < 0
      ? `${styles.type} ${styles.withdraw}`
      : `${styles.type} ${styles.deposit}`;

  return (
    <Fragment>
      <div className={styles.movement}>
        <div className={styles.index}>
          <div>{index}</div>
        </div>
        <div className={styles.details}>
          <div>
            <div className={styles.remark}>{remark}</div>
            <div className={styles.time}>{time}</div>
          </div>
          <div className={styles.detail}>
            <div className={movTypeClasses}>{movType}</div>
            <div className={styles.amount}>
              {currencyFormatter(Math.abs(amount))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <hr className={styles.line} />
      </div>
    </Fragment>
  );
};
export default Movement;
