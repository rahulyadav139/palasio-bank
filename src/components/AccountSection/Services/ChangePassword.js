import { Link } from 'react-router-dom';
import styles from '../../Forms/UpdateForm.module.css';
import Card from '../../UI/Card';
import useInput from '../../../hooks/use-input';
import { useDispatch } from 'react-redux';
import { ModalActions } from '../../../store/modal-slice';
import { useSend } from '../../../hooks/use-send';

const ChangePassword = props => {
  const dispatch = useDispatch();
  const { sendData } = useSend();

  const {
    value: oldPassword,
    setIsTouched: oldPasswordIsTouched,
    isValid: oldPasswordIsValid,
    isInvalid: oldPasswordIsInvalid,
    changeHandler: oldPasswordChangeHandler,
    blurHandler: oldPasswordBlurHandler,
  } = useInput(value => value.trim().length !== 0);
  const {
    value: newPassword,
    setIsTouched: newPasswordIsTouched,
    isValid: newPasswordIsValid,
    isInvalid: newPasswordIsInvalid,
    changeHandler: newPasswordChangeHandler,
    blurHandler: newPasswordBlurHandler,
  } = useInput(value => value.trim().length >= 6);
  const {
    value: confirmPassword,
    setIsTouched: confirmPasswordIsTouched,
    isValid: confirmPasswordIsValid,
    isInvalid: confirmPasswordIsInvalid,
    changeHandler: confirmPasswordChangeHandler,
    blurHandler: confirmPasswordBlurHandler,
  } = useInput(value => value.trim().length !== 0);

  const oldPasswordClasses = oldPasswordIsInvalid ? styles.invalid : '';
  const newPasswordClasses = newPasswordIsInvalid ? styles.invalid : '';
  const confirmPasswordClasses = confirmPasswordIsInvalid ? styles.invalid : '';

  const submitHandler = async e => {
    e.preventDefault();

    if (!oldPasswordIsValid) oldPasswordIsTouched(true);
    if (!newPasswordIsValid) newPasswordIsTouched(true);
    if (!confirmPasswordIsValid) confirmPasswordIsTouched(true);

    if (!oldPasswordIsValid || !newPasswordIsValid || !confirmPasswordIsValid)
      return;

    if (newPassword !== confirmPassword) {
      dispatch(
        ModalActions.confirmModalHandler({
          isModal: true,
          message: 'Password does not match!',
          redirect: false,
        })
      );
      return;
    }

    const { data, error, status } = await sendData(
      process.env.REACT_APP_BACKEND_URL + '/service/change-password',
      { oldPassword, newPassword }
    );

    if (status === 401) {
      dispatch(
        ModalActions.confirmModalHandler({
          isModal: true,
          message: data.message,
          redirect: false,
        })
      );
      return;
    }

    if (error) return;

    dispatch(
      ModalActions.confirmModalHandler({
        isModal: true,
        message: 'Information has been updated!',
        redirect: true,
      })
    );
  };

  return (
    <Card>
      <h2 className={styles.title}>Change Your Account Password</h2>
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.wrapper}>
          <div className={styles.inputs}>
            <label>Old Password</label>
            <input
              value={oldPassword}
              className={oldPasswordClasses}
              onChange={oldPasswordChangeHandler}
              onBlur={oldPasswordBlurHandler}
              type="text"
            />
          </div>
          {oldPasswordIsInvalid && (
            <p className={styles.error}>Invalid entry</p>
          )}
        </div>
        <div className={styles.wrapper}>
          <div className={styles.inputs}>
            <label>New Password</label>
            <input
              value={newPassword}
              className={newPasswordClasses}
              onChange={newPasswordChangeHandler}
              onBlur={newPasswordBlurHandler}
              type="text"
            />
          </div>
          {newPasswordIsInvalid && (
            <p className={styles.error}>Invalid entry</p>
          )}
        </div>
        <div className={styles.wrapper}>
          <div className={styles.inputs}>
            <label>Confirm Password</label>
            <input
              value={confirmPassword}
              className={confirmPasswordClasses}
              onChange={confirmPasswordChangeHandler}
              onBlur={confirmPasswordBlurHandler}
              type="text"
            />
          </div>
          {confirmPasswordIsInvalid && (
            <p className={styles.error}>Invalid entry</p>
          )}
        </div>
        <div className={styles.buttons}>
          <Link to="/account/overview">
            <button type="button">Cancel</button>
          </Link>
          <button type="submit">Submit</button>
        </div>
      </form>
    </Card>
  );
};
export default ChangePassword;
