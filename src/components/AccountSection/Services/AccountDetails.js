import styles from './AccountDetails.module.css';
import Card from '../../UI/Card';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const AccountDetails = props => {
  const [profile, setProfile] = useState({
    fullName: '',
    accountNumber: '',
    accountType: '',
    ifsc: '',
    email: '',
    address: '',
    branch: '',
    nominee: '',
  });

  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    (async () => {
      const res = await fetch('https://palasio-bank.herokuapp.com/admin/account', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      const data = await res.json();
      setProfile(data);
    })();
  }, [token]);

  return (
    <Card>
      <h2 className={styles.title}>Account Details</h2>
      <div className={styles.wrapper}>
        <div className={styles.row}>
          <label>Name</label>
          <div>{profile.fullName}</div>
        </div>
        <div className={styles.row}>
          <label>Email</label>
          <div>{profile.email}</div>
        </div>
        <div className={styles.row}>
          <label>Account Number</label>
          <div>{profile.accountNumber}</div>
        </div>
        <div className={styles.row}>
          <label>Account Type</label>
          <div>{profile.accountType}</div>
        </div>
        <div className={styles.row}>
          <label>Branch</label>
          <div>{profile.branch}</div>
        </div>
        <div className={styles.row}>
          <label>IFSC Code</label>
          <div>{profile.ifsc}</div>
        </div>
        <div className={styles.row}>
          <label>Address</label>
          <div className={styles.filled}>{profile.address}</div>
        </div>
        <div className={styles.row}>
          <label>Nominee</label>
          <div className={styles.filled}>{profile.nominee}</div>
        </div>
      </div>
    </Card>
  );
};
export default AccountDetails;
