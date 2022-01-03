import styles from './Header.module.css';
import { LogoIcon, NotificationIcon, ProfileIcon } from '../../UI/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions } from '../../../store/auth-slice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = props => {
  const [time, setTime] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fullName = useSelector(
    state => state.bank.profile.personalDetails.name
  );

  const login = useSelector(state => state.auth.login);

  useEffect(() => {
    return () => {
      if (!login) navigate('/');
    };
  }, [login, navigate]);

  const logoutHandler = () => {
    dispatch(AuthActions.authHandler(false));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const timeNow = new Date(Date.now());
      const log = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: 'numeric',
      }).format(timeNow);
      setTime(log);
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.logo}>
          <LogoIcon />
        </div>
        <h2 className={styles.name}>Palasio</h2>
      </div>
      <div className={styles.left}>
        <div>
          <div className={styles.profile}>
            <div className={styles.icon}>
              <ProfileIcon />
            </div>
            <div className={styles.head1}>{fullName}</div>
            <div className={styles.icon}>
              <NotificationIcon />
            </div>
          </div>
          <div className={`${styles.head3} ${styles.date}`}>{time}</div>
        </div>
        <button onClick={logoutHandler} className={styles.btn}>
          Logout
        </button>
      </div>
    </header>
  );
};
export default Header;
