import styles from './MainSection.module.css';
import { PieChart } from 'react-minimal-pie-chart';
import {
  SliderIcon,
  RechargeIcon,
  SendMoneyIcon,
  FixedDepositIcon,
  LighteningIcon,
  MobileIcon,
  CardIcon,
  LaptopIcon,
  USBIcon,
  ToggleOffIcon,
  ToggleOnIcon,
} from '../../UI/icons';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { currencyFormatter } from '../../../store/helper-functions';
import { useState, useEffect } from 'react';

const MainSection = props => {
  const [showBalance, setShowBalance] = useState(false);
  const [balance, setBalance] = useState({
    savingAccountBalance: 0,
    depositAccountBalance: 0,
    totalBalance: 0,
  });
  const activeProfile = useSelector(state => state.bank.profile);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    (async () => {
      const res = await fetch('https://palasio-bank.herokuapp.com/admin/balance', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      const data = await res.json();

      setBalance({
        savingAccountBalance: data.savingAccountBalance,
        depositAccountBalance: data.depositAccountBalance,
        totalBalance: data.savingAccountBalance + data.depositAccountBalance,
      });
    })();
  }, [token]);

  const showSavingAccountBalance = showBalance
    ? currencyFormatter(balance.savingAccountBalance)
    : ''.padStart(balance.savingAccountBalance.toString().length, '*');

  const showDepositAccountBalance = showBalance
    ? currencyFormatter(balance.depositAccountBalance)
    : ''.padStart(balance.depositAccountBalance.toString().length, '*');

  const showTotalBalance = showBalance
    ? currencyFormatter(balance.totalBalance)
    : ''.padStart(balance.totalBalance.toString().length, '*');

  const showBalanceHandler = () => {
    setShowBalance(prev => !prev);
  };

  return (
    <section className={styles.middle}>
      <div className={styles.card}>
        <div className={styles.heading}>
          <div className={styles.head1}>Accounts</div>
          <button
            onClick={showBalanceHandler}
            className={`${styles.btn} ${styles.head2}`}
          >
            Show Balance
            {showBalance ? <ToggleOnIcon /> : <ToggleOffIcon />}
          </button>
        </div>
        <div className={styles.cards}>
          <div className={`${styles.card} ${styles.subcard}`}>
            <div className={styles.wrapper1}>
              <div className={styles.head2}>Total Balance</div>
              <div className={styles.head1}>{showTotalBalance}</div>
              <div className={styles.amounts}>
                {!!balance.totalBalance && (
                  <div className={styles.chart}>
                    <PieChart
                      data={[
                        {
                          title: 'One',
                          value: balance.savingAccountBalance,
                          color: '#7CD1B8',
                        },
                        {
                          title: 'Two',
                          value: balance.depositAccountBalance,
                          color: '#FABB51',
                        },
                      ]}
                    />
                  </div>
                )}
                <div>
                  <div>
                    <div className={styles.head3}>Savings</div>
                    <div className={styles.head2}>
                      {showSavingAccountBalance}
                    </div>
                  </div>
                  <div>
                    <div className={styles.head3}>Deposits</div>
                    <div className={styles.head2}>
                      {showDepositAccountBalance}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.card} ${styles.subcard}`}>
            <div className={styles.wrapper2}>
              <div className={styles.head2}>Savings</div>
              <div className={styles.head1}>{showSavingAccountBalance}</div>
              <div className={styles.head1}>
                {activeProfile.accountNumber.slice(-4).padStart(12, '*')}
              </div>
              <Link to="/account/statement">
                <div className={`${styles.head1} ${styles['text-colored']}`}>
                  View Statement
                </div>
              </Link>
            </div>
          </div>
          <div className={`${styles.card} ${styles.subcard} ${styles.colored}`}>
            <div className={styles.wrapper3}>
              <div className={styles.head2}>Deposits</div>
              <p className={styles.head3}>
                Get flexible Fixed Deposit tenures with amount starting as low
                as ₹10,000
              </p>
              <Link to="/account/open-fixed-deposits">
                <div className={styles.head1}>Apply Now</div>
              </Link>
            </div>
          </div>
        </div>
        <div className={`${styles.card} ${styles.horizontal}`}>
          <Link to="/account/manage-limits">
            <div className={styles.actions}>
              <div className={styles.icon}>
                <SliderIcon />
              </div>
              <div className={styles.head1}>Limits</div>
            </div>
          </Link>
          <Link to="/account/bill-payment/recharge">
            <div className={styles.actions}>
              <div className={styles.icon}>
                <RechargeIcon />
              </div>
              <div className={styles.head1}>Recharge</div>
            </div>
          </Link>
          <Link to="/account/fund-transfer/imps">
            <div className={styles.actions}>
              <div className={styles.icon}>
                <SendMoneyIcon />
              </div>
              <div className={styles.head1}>Transfer</div>
            </div>
          </Link>
          <Link to="/account/fixed-deposits">
            <div className={styles.actions}>
              <div className={styles.icon}>
                <FixedDepositIcon />
              </div>
              <div className={styles.head1}>Deposits</div>
            </div>
          </Link>
          <Link to="/account/payment-cards">
            <div className={styles.actions}>
              <div className={styles.icon}>
                <CardIcon />
              </div>
              <div className={styles.head1}>Cards</div>
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.card}>
        <nav>
          <ul className={styles.items}>
            <li className={styles.head1}>Bill Payments</li>
          </ul>
        </nav>
        <div className={styles.slides}>
          <Link to="/account/bill-payment/electricity">
            <div className={styles.slide}>
              <div className={styles.icon}>
                <LighteningIcon />
              </div>
              <div className={styles.head1}>Electricity</div>
            </div>
          </Link>
          <Link to="/account/bill-payment/postpaid">
            <div className={styles.slide}>
              <div className={styles.icon}>
                <MobileIcon />
              </div>
              <div className={styles.head1}>PostPaid</div>
            </div>
          </Link>
          <Link to="/account/bill-payment/television">
            <div className={styles.slide}>
              <div className={styles.icon}>
                <LaptopIcon />
              </div>
              <div className={styles.head1}>Television</div>
            </div>
          </Link>
          <Link to="/account/bill-payment/data-card">
            <div className={styles.slide}>
              <div className={styles.icon}>
                <USBIcon />
              </div>
              <div className={styles.head1}>Data Card</div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default MainSection;
