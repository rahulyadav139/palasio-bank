import Card from '../../UI/Card';
import styles from './FixedDepositCard.module.css';
import { currencyFormatter } from '../../../store/helper-functions';

const FixedDepositCard = props => {
  const { sum, rate, maturityDate, maturityValue } = props.fixedDeposit;
  return (
    <Card>
      <div className={styles.card}>
        <div className={styles.head1}>Deposit Amount</div>
        <div className={styles.sum}>{currencyFormatter(sum)}</div>
        <hr className={styles.line} />
        <div className={styles.row}>
          <div className={styles.head2}>Maturity Value</div>
          <div className={styles.head2}>{maturityValue}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.head2}>Maturity Date</div>
          <div className={styles.head2}>{maturityDate}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.head2}>Interest Rate</div>
          <div className={styles.head2}>{rate}</div>
        </div>
      </div>
    </Card>
  );
};
export default FixedDepositCard;
