import styles from './SectionRight.module.css';
import { Link } from 'react-router-dom';

const SectionRight = props => {
  return (
    <section>
      <div className={styles.card}>
        <div className={styles.head2}>Your Cibil Score Range</div>
        <div className={styles.head1}>725-780</div>
        <div className={styles.head2}>Get Score Now</div>
      </div>
      <div className={styles.card}>
        <Link to="/account/my-loans">
          <div className={styles.head2}>My Loans</div>
          <div>
            <div className={styles.head2}>Personal Loan</div>
            <div className={styles.head3}>Starting @11.25% p.a</div>
          </div>
          <div>
            <div className={styles.head2}>Buy your Dream Home</div>
            <div className={styles.head3}>Higher Eligibility and lower EMI</div>
          </div>
        </Link>
      </div>
      <div className={styles.card}>
        <Link to="/account/my-investment">
          <div className={styles.head2}>My Investments</div>
          <div>
            <div className={styles.head2}>Mutual Funds</div>
            <div className={styles.head3}>
              Investment in Mutual Funds simple and hassle free.
            </div>
          </div>
          <div>
            <div className={styles.head2}>PPF</div>
            <div className={styles.head3}>
              Opening a PPF account is simple and hassle-free.
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};
export default SectionRight;
