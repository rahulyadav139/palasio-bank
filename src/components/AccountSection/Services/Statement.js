import styles from './Statement.module.css';
import Card from '../../UI/Card';
import Movement from './Movement';
import { formatter, timeFormatter } from '../../../store/helper-functions';
import { useState } from 'react';
import { ResetIcon, SortDownIcon, SortUpIcon } from '../../UI/icons';
import { useSelector } from 'react-redux';
import { currencyFormatter } from '../../../store/helper-functions';

const Statement = props => {
  const movements = useSelector(state => state.bank.profile.movements);
  const [isAscending, setIsAscending] = useState(false);
  const [sortedMovements, setSortedMovements] = useState(movements);
  const accountBalance = useSelector(
    state => state.bank.profile.bankAccountDetails.accountBalance
  );

  const sortingHandler = () => {
    setIsAscending(prev => !prev);
    let sorted;

    if (isAscending) {
      sorted = movements
        .slice()
        .sort((a, b) => Math.abs(a.amount) - Math.abs(b.amount));
      setSortedMovements(sorted);
    } else {
      sorted = movements
        .slice()
        .sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
      setSortedMovements(sorted);
    }
  };
  const resetHandler = () => {
    setIsAscending(false);
    setSortedMovements(movements);
  };

  return (
    <Card>
      <h2 className={styles.title}>Statement</h2>
      <div className={styles.action}>
        <h3>{`Balance: ${currencyFormatter(accountBalance)}`}</h3>
        <div>
          <button onClick={sortingHandler}>
            {isAscending ? <SortUpIcon /> : <SortDownIcon />}
          </button>
          <button onClick={resetHandler}>
            <ResetIcon />
          </button>
        </div>
      </div>
      <div className={styles.movements}>
        {(sortedMovements || movements).map((el, i) => (
          <Movement
            remark={formatter(el.remark)}
            time={timeFormatter(el.time)}
            amount={el.amount}
            index={i + 1}
          />
        ))}
      </div>
    </Card>
  );
};
export default Statement;
