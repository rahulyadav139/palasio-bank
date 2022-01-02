import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import { Fragment } from 'react';

const BackDrop = props => {
  return <div onClick={props.onCancel} className={styles.backdrop}></div>;
};
const overlay = document.getElementById('overlay');

const Modal = props => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<BackDrop onCancel={props.onCancel} />, overlay)}
      {ReactDOM.createPortal(
        <div className={styles.card}>{props.children}</div>,
        overlay
      )}
    </Fragment>
  );
};
export default Modal;
