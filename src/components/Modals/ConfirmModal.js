import styles from './ConfirmModal.module.css';
import Modal from '../UI/Modal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ModalActions } from '../../store/modal-slice';

const ConfirmModal = props => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modal = useSelector(state => state.modal);

  const confirmModalHandler = () => {
    if (modal.redirect) {
      navigate('/account/overview');
    }

    dispatch(
      ModalActions.confirmModalHandler({
        isModal: false,
        message: '',
        redirect: '',
      })
    );
  };
  return (
    <Modal>
      <div className={styles.wrapper}>
        <p>{modal.message}</p>
        <div className={styles.button}>
          <button onClick={confirmModalHandler}>Ok</button>
        </div>
      </div>
    </Modal>
  );
};
export default ConfirmModal;
