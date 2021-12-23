import styles from './Header.module.css';
import { LogoIcon } from './icons';
import { useState, useCallback } from 'react';
import Main from './Main';
import Modal from './Modal';
import { AuthActions } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';

const Header = props => {
  const [height, setHeight] = useState(0);
  const [stickyNav, setStickyNav] = useState(true);
  const modalState = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const navRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);
  const headerRef = useCallback(node => {
    if (node !== null) {
      const stickyNav = ([entry]) => {
        setStickyNav(entry.isIntersecting);
      };
      const headerObserver = new IntersectionObserver(stickyNav, {
        root: null,
        threshold: 0,
        rootMargin: `-${height}px`,
      });
      headerObserver.observe(node);
    }
  });

  const navClass = stickyNav ? styles.nav : `${styles.nav} ${styles.sticky}`;

  const loginButtonHandler = () => {
    dispatch(
      AuthActions.modalHandler({
        modal: true,
        loginForm: true,
      })
    );
  };
  const cancelHandler = () => {
    dispatch(
      AuthActions.modalHandler({
        modal: false,
        loginForm: true,
      })
    );
  };
  const formSwitchHandler = () => {
    dispatch(
      AuthActions.modalHandler({
        modal: true,
        loginForm: false,
      })
    );
  };

  return (
    <header ref={headerRef} className={styles.header}>
      <nav ref={navRef} className={navClass}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <LogoIcon />
          </div>
          <div className={styles.name}>Palasio</div>
        </div>

        <div className={styles.links}>
          <ul className={styles.items}>
            <li>Features</li>
            <li>Operations</li>
            <li>Testimonials</li>
            <li onClick={loginButtonHandler} className={styles.open}>
              Log In
            </li>
          </ul>
        </div>
      </nav>
      <Main />
      {modalState.modal && (
        <Modal
          loginState={modalState.loginForm}
          onSwitch={formSwitchHandler}
          onCancel={cancelHandler}
        />
      )}
    </header>
  );
};
export default Header;
