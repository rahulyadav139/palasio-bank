import styles from './Statement.module.css';
import Card from '../../UI/Card';
import Movement from './Movement';
import { formatter, timeFormatter } from '../../../store/helper-functions';
import { Fragment, useState } from 'react';
import { ResetIcon, SortDownIcon, SortUpIcon } from '../../UI/icons';

import { currencyFormatter } from '../../../store/helper-functions';
import { useFetch } from '../../../hooks/use-fetch';

const Statement = props => {
  const { loading,  profile } = useFetch(
    'https://palasio-bank.herokuapp.com/admin/statement'
  );

  const [isAscending, setIsAscending] = useState(false);
  const [sortedMovements, setSortedMovements] = useState(
    profile.movements ?? []
  );

  const sortingHandler = () => {
    setIsAscending(prev => !prev);
    let sorted;

    if (isAscending) {
      sorted = profile.movements
        .slice()
        .sort((a, b) => Math.abs(a.amount) - Math.abs(b.amount));
      setSortedMovements(sorted);
    } else {
      sorted = profile.movements
        .slice()
        .sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
      setSortedMovements(sorted);
    }
  };
  const resetHandler = () => {
    setIsAscending(false);
    setSortedMovements(profile.movements);
  };

  const getMovements = () => {
    return !sortedMovements.length ? profile.movements : sortedMovements;
  };

  return (
    <Fragment>
      {!loading && (
        <Card>
          <h2 className={styles.title}>Statement</h2>
          <div className={styles.action}>
            <h3>{`Balance: ${currencyFormatter(profile.accountBalance)}`}</h3>
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
            {getMovements().map((el, i) => (
              <Movement
                remark={formatter(el.remark)}
                time={timeFormatter(el.time)}
                amount={el.amount}
                index={i + 1}
              />
            ))}
          </div>
        </Card>
      )}
    </Fragment>
  );
};
export default Statement;
