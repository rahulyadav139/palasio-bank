import styles from './SectionLeft.module.css';
import { Link, NavLink } from 'react-router-dom';

const SectionLeft = props => {
  return (
    <section className={styles.left}>
      <Link to="/account/financial-journey">
        <div className={`${styles.card} ${styles.journey}`}>
          <div className={styles.head2}>Your Financial Journey</div>
          <p>Here are your next steps avail benefits here.</p>
          <div className={`${styles.link} ${styles.btn}`}>Explore now</div>
        </div>
      </Link>
      <div className={styles.card}>
        <ul className={styles.links}>
          <div className={styles.head2}>Services</div>
          <li>
            <NavLink
              to="services/change-address"
              className={navData => (navData.isActive ? styles.active : '')}
            >
              Change Address
            </NavLink>
          </li>
          <li>
            <NavLink
              to="services/generate-pin"
              className={navData => (navData.isActive ? styles.active : '')}
            >
              Generate Card PIN
            </NavLink>
          </li>

          <li>
            <NavLink
              to="services/account-upgrade"
              className={navData => (navData.isActive ? styles.active : '')}
            >
              Upgrade Your Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to="services/update-nominee"
              className={navData => (navData.isActive ? styles.active : '')}
            >
              Update Nominee
            </NavLink>
          </li>
          <li>
            <NavLink
              to="services/debit-card-upgrade"
              className={navData => (navData.isActive ? styles.active : '')}
            >
              Upgrade Your Debit Card
            </NavLink>
          </li>

          <li>
            <NavLink
              to="services/link-loan-account"
              className={navData => (navData.isActive ? styles.active : '')}
            >
              Link Your Loan Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to="services/credit-card-upgrade"
              className={navData => (navData.isActive ? styles.active : '')}
            >
              Upgrade Your Credit Card
            </NavLink>
          </li>
          <li>
            <NavLink
              to="services/change-password"
              className={navData => (navData.isActive ? styles.active : '')}
            >
              Change Password
            </NavLink>
          </li>
        </ul>
      </div>

      <div className={`${styles.card} ${styles.travel}`}>
        <div className={`${styles.link} ${styles.btn}`}>Travel card</div>
        <p>Buy Forex Online.</p>
      </div>
    </section>
  );
};
export default SectionLeft;
