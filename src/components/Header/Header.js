import { useState, useCallback } from 'react';
import LoginModal from '../Modals/LoginModal';

import { useSelector, useDispatch } from 'react-redux';
import Navigation from './Navigation';
import styles from './Header.module.css';
import { ModalActions } from '../../store/modal-slice';

const Header = props => {
  const [height, setHeight] = useState(0);
  const [stickyNav, setStickyNav] = useState(true);
  const modal = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const getNavHeight = useCallback(
    value => {
      setHeight(value);
    },
    [setHeight]
  );
  const headerRef = useCallback(
    node => {
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
    },
    [height]
  );

  const cancelHandler = () => {
    dispatch(
      ModalActions.loginModalHandler({
        isModal: false,
        loginForm: true,
      })
    );
  };
  const formSwitchHandler = () => {
    dispatch(
      ModalActions.loginModalHandler({
        isModal: true,
        loginForm: false,
      })
    );
  };

  return (
    <header ref={headerRef} id="home">
      <Navigation onHeight={getNavHeight} stickyNav={stickyNav} />
      <main>
        <div className={styles.container}>
          <div className={styles.intro}>
            <h1>
              When <span className={styles.highlight}>banking</span>
              <br />
              meets <span className={styles.highlight}> you</span>
            </h1>
            <h2 className={styles.subtitle}>
              A simpler banking experience for a simpler life.
            </h2>
          </div>
          <div className={styles.images}>
            <div className={styles.img2}>
              <img
                src={require('../../Assets/wallet-image.jpg')}
                alt="money-tree"
              />
            </div>
            <div className={styles.img3}>
              <img
                src={require('../../Assets/piggie-bank-image.jpg')}
                alt="piggie-bank"
              />
            </div>
          </div>
        </div>
        <hr />
      </main>
      {modal.isModal && (
        <LoginModal
          loginFormState={modal.loginForm}
          onSwitch={formSwitchHandler}
          onCancel={cancelHandler}
        />
      )}
    </header>
  );
};
export default Header;
