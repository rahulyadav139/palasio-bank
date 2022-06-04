import styles from './FixedDeposits.module.css';

import Card from '../../UI/Card';

import FixedDepositCard from './FixedDepositCard';
import { useFetch } from '../../../hooks/use-fetch';
import { Fragment } from 'react';

const FixedDeposits = props => {
  const { loading, error, profile } = useFetch(
    process.env.REACT_APP_BACKEND_URL + '/admin/deposits'
  );

  return (
    <Fragment>
      {!loading && (
        <Card>
          <h2 className={styles.title}>Fixed Deposits</h2>

          <div className={styles.wrapper}>
            {!profile.depositDetails.length ? (
              <p>No fixed deposits</p>
            ) : (
              profile.depositDetails.map((el, i) => (
                <FixedDepositCard key={i + 1} fixedDeposit={el} />
              ))
            )}
          </div>
        </Card>
      )}
    </Fragment>
  );
};
export default FixedDeposits;
