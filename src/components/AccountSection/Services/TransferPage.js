import styles from './TransferPage.module.css';
import {
  CardIcon,
  WalletIcon,
  NeftIcon,
  RtgsIcon,
  PolicyIcon,
} from '../../UI/icons';
import { Link } from 'react-router-dom';

import Card from '../../UI/Card';

const TransferPage = props => {
  return (
    <Card>
      <h2 className={styles.title}>Money Transfer</h2>
      <div className={styles.slides}>
        <Link to="/account/fund-transfer/imps">
          <div className={styles.slide}>
            <div className={styles.icon}>
              <WalletIcon />
            </div>
            <div className={styles.head1}>IMPS</div>
          </div>
        </Link>
        <Link to="/account/fund-transfer/neft">
          <div className={styles.slide}>
            <div className={styles.icon}>
              <NeftIcon />
            </div>
            <div className={styles.head1}>NEFT</div>
          </div>
        </Link>
        <Link to="/account/fund-transfer/rtgs">
          <div className={styles.slide}>
            <div className={styles.icon}>
              <RtgsIcon />
            </div>
            <div className={styles.head1}>RTGS</div>
          </div>
        </Link>
      </div>
      <h2 className={styles.title}>Payment</h2>
      <div className={styles.slides}>
        <Link to="/account/payment">
          <div className={styles.slide}>
            <div className={styles.icon}>
              <CardIcon />
            </div>
            <div className={styles.head1}>Credit Card Payment</div>
          </div>
        </Link>
        <Link to="/account/payment">
          <div className={styles.slide}>
            <div className={styles.icon}>
              <PolicyIcon />
            </div>
            <div className={styles.head1}>Policy Premium</div>
          </div>
        </Link>
      </div>
    </Card>
  );
};
export default TransferPage;
