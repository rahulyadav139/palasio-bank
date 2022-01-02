import styles from './AccountDetails.module.css';
import Card from '../../UI/Card';
import { useSelector } from 'react-redux';

const AccountDetails = props => {
  const profile = useSelector(state => state.bank.profile);

  return (
    <Card>
      <h2 className={styles.title}>Account Details</h2>
      <div className={styles.wrapper}>
        <div className={styles.row}>
          <label>Name</label>
          <div>{profile.personalDetails.name}</div>
        </div>
        <div className={styles.row}>
          <label>Email</label>
          <div>{profile.personalDetails.email}</div>
        </div>
        <div className={styles.row}>
          <label>Account Number</label>
          <div>{profile.bankAccountDetails.accountNumber}</div>
        </div>
        <div className={styles.row}>
          <label>Account Type</label>
          <div>{profile.bankAccountDetails.accountType}</div>
        </div>
        <div className={styles.row}>
          <label>Branch</label>
          <div>{profile.bankAccountDetails.branch}</div>
        </div>
        <div className={styles.row}>
          <label>IFSC Code</label>
          <div>{profile.bankAccountDetails.ifsc}</div>
        </div>
        <div className={styles.row}>
          <label>Address</label>
          <div className={styles.filled}>{profile.personalDetails.address}</div>
        </div>
        <div className={styles.row}>
          <label>Nominee</label>
          <div className={styles.filled}>
            {profile.bankAccountDetails.nominee}
          </div>
        </div>
      </div>
    </Card>
  );
};
export default AccountDetails;
