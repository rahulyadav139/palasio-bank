import LoginForm from './LoginForm';
import CreateAccountForm from './CreateAccountForm';
import { Fragment } from 'react';

import ReactDOM from 'react-dom';
import styles from './Form.module.css';

const BackDrop = () => {
  return <div className={styles.backdrop}></div>;
};
const overlay = document.getElementById('overlay');

const Modal = props => {
  const modalView = props.loginState ? (
    <LoginForm onSwitch={props.onSwitch} onCancel={props.onCancel} />
  ) : (
    <CreateAccountForm onCancel={props.onCancel} />
  );

  return (
    <Fragment>
      {ReactDOM.createPortal(<BackDrop />, overlay)}
      {ReactDOM.createPortal(modalView, overlay)}
    </Fragment>
  );
};
export default Modal;
