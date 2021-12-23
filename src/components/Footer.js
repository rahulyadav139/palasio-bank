import styles from './Footer.module.css';
import { LogoIcon } from './icons';
import { useDispatch } from 'react-redux';
import { AuthActions } from '../store/store';

const Footer = props => {
  const dispatch = useDispatch();

  const openAccountHandler = () => {
    dispatch(
      AuthActions.modalHandler({
        modal: true,
        loginForm: false,
      })
    );
  };
  return (
    <footer className={styles.footer}>
      <div className={styles.contents}>
        <h1>
          The best day to join Palasio was one year ago. The second best is
          today!
        </h1>
        <button onClick={openAccountHandler}>
          Open your free account today!
        </button>
        <hr />
        <div>
          <ul className={styles.items}>
            <li>About</li>
            <li>Pricing</li>
            <li>Term of Use</li>
            <li>Privacy Policy</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className={styles.logo}>
          <LogoIcon />
        </div>
        <p>© Copyright by Rahul Yadav.</p>
      </div>
    </footer>
  );
};
export default Footer;
