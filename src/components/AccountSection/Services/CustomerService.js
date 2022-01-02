import styles from './AccountDetails.module.css';
import Card from '../../UI/Card';
const CustomerService = props => {
  return (
    <Card>
      <h2 className={styles.title}>Contact Us</h2>
      <div className={styles.wrapper}>
        <div className={styles.row}>
          <label>Email Address</label>
          <div>contact@palasio.com</div>
        </div>
        <div className={styles.row}>
          <label>Toll Free Number</label>
          <div>1800-180-1800</div>
        </div>
      </div>
    </Card>
  );
};
export default CustomerService;
