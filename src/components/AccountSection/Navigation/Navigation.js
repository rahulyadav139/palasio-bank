import styles from './Navigation.module.css';
import { NavLink } from 'react-router-dom';

const Navigation = props => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.items}>
        <li>
          <NavLink
            className={navData => (navData.isActive ? styles.active : '')}
            to="/account/overview"
          >
            Overview
          </NavLink>
        </li>
        <li>
          <NavLink
            className={navData => (navData.isActive ? styles.active : '')}
            to="/account/bank-accounts"
          >
            Bank Accounts
          </NavLink>
        </li>
        <li>
          <NavLink
            className={navData => (navData.isActive ? styles.active : '')}
            to="/account/payments-and-transfer"
          >
            Payments & Transfer
          </NavLink>
        </li>
        <li>
          <NavLink
            className={navData => (navData.isActive ? styles.active : '')}
            to="/account/card-and-loans"
          >
            Card & Loans
          </NavLink>
        </li>
        <li>
          <NavLink
            className={navData => (navData.isActive ? styles.active : '')}
            to="/account/investment-and-insurance"
          >
            Investment & Insurance
          </NavLink>
        </li>
        <li>
          <NavLink
            className={navData => (navData.isActive ? styles.active : '')}
            to="/account/customer-service"
          >
            Customer Service
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
