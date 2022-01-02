import styles from './Navigation.module.css';
import { LogoIcon } from '../UI/icons';
import { useDispatch } from 'react-redux';

import { useCallback } from 'react';
import { HashLink } from 'react-router-hash-link';
import { ModalActions } from '../../store/modal-slice';

const Navigation = props => {
  const dispatch = useDispatch();
  const getNavHeight = props.onHeight;
  const navRef = useCallback(
    node => {
      if (node !== null) {
        getNavHeight(node.getBoundingClientRect().height);
      }
    },
    [getNavHeight]
  );

  const loginButtonHandler = () => {
    dispatch(
      ModalActions.loginModalHandler({
        isModal: true,
        loginForm: true,
      })
    );
  };

  const navClass = props.stickyNav
    ? styles.nav
    : `${styles.nav} ${styles.sticky}`;
  return (
    <nav ref={navRef} className={navClass}>
      <HashLink smooth to="/welcome#home">
        <div className={styles.brand}>
          <div className={styles.logo}>
            <LogoIcon />
          </div>
          <div className={styles.name}>Palasio</div>
        </div>
      </HashLink>

      <div className={styles.links}>
        <ul className={styles.items}>
          <li>
            <HashLink smooth to="/welcome#features">
              Features
            </HashLink>
          </li>
          <li>
            <HashLink smooth to="/welcome#operations">
              Operations
            </HashLink>{' '}
          </li>
          <li>
            <HashLink smooth to="/welcome#testimonials">
              Testimonials
            </HashLink>
          </li>
          <li onClick={loginButtonHandler} className={styles.action}>
            Log In
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navigation;
