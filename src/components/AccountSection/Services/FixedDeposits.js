import styles from './FixedDeposits.module.css';

import Card from '../../UI/Card';
import { useSelector } from 'react-redux';
import FixedDepositCard from './FixedDepositCard';

const FixedDeposits = props => {
  const fixedDeposits = useSelector(
    state => state.bank.profile.depositDetails
  );

  const fixedDepositElements = fixedDeposits.map((el, i) => (
    <FixedDepositCard key={i + 1} fixedDeposit={el} />
  ));
  return (
    <Card>
      <h2 className={styles.title}>Fixed Deposits</h2>

      <div className={styles.wrapper}>
        {!fixedDeposits.length ? (
          <p>No fixed deposits</p>
        ) : (
          fixedDepositElements
        )}
      </div>
    </Card>
  );
};
export default FixedDeposits;
