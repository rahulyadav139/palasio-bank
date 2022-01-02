import styles from '../../Forms/UpdateForm.module.css';
import Card from '../../UI/Card';
import { Link } from 'react-router-dom';
import useInput from '../../../hooks/use-input';
import { BankActions } from '../../../store/bank-slice';
import { formatter } from '../../../store/helper-functions';
import { useDispatch, useSelector } from 'react-redux';
import { ModalActions } from '../../../store/modal-slice';

const UpdateNominee = props => {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.bank.profile);
  const {
    value: nominee,
    setIsTouched: nomineeIsTouched,
    isValid: nomineeIsValid,
    isInvalid: nomineeIsInvalid,
    changeHandler: nomineeChangeHandler,
    blurHandler: nomineeBlurHandler,
  } = useInput(value => value.trim().length !== 0);
  const {
    value: relation,
    setIsTouched: relationIsTouched,
    isValid: relationIsValid,
    isInvalid: relationIsInvalid,
    changeHandler: relationChangeHandler,
    blurHandler: relationBlurHandler,
  } = useInput(value => value.trim().length !== 0);
  const {
    value: password,
    setIsTouched: passwordIsTouched,
    isValid: passwordIsValid,
    isInvalid: passwordIsInvalid,
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
  } = useInput(value => value.trim().length !== 0);

  const nomineeClasses = nomineeIsInvalid ? styles.invalid : '';
  const relationClasses = relationIsInvalid ? styles.invalid : '';
  const passwordClasses = passwordIsInvalid ? styles.invalid : '';

  const submitHandler = e => {
    e.preventDefault();

    if (!nomineeIsValid) nomineeIsTouched(true);
    if (!relationIsValid) relationIsTouched(true);
    if (!passwordIsValid) passwordIsTouched(true);

    if (!nomineeIsValid || !relationIsValid || !passwordIsValid) return;

    if (password !== profile.authDetails.password) {
      dispatch(
        ModalActions.confirmModalHandler({
          isModal: true,
          message: 'Incorrect password!',
          redirect: false,
        })
      );
      return;
    }
    const nomineeDetails = `${formatter(nominee)} (${formatter(relation)})`;

    dispatch(BankActions.updateNominee(nomineeDetails));
    dispatch(
      ModalActions.confirmModalHandler({
        isModal: true,
        message: 'Information has been updated!',
        redirect: true,
      })
    );
    dispatch(BankActions.saveToLocal());
  };

  return (
    <Card>
      <h2 className={styles.title}>Update Nominee Details</h2>
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.wrapper}>
          <div className={styles.inputs}>
            <label>Account Number</label>
            <select>
              <option value="selected">1234 5678 1234 5678</option>
            </select>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.inputs}>
            <label>Nominee Name</label>
            <input
              value={nominee}
              className={nomineeClasses}
              onChange={nomineeChangeHandler}
              onBlur={nomineeBlurHandler}
              type="text"
            />
          </div>
          {nomineeIsInvalid && <p className={styles.error}>Invalid entry</p>}
        </div>
        <div className={styles.wrapper}>
          <div className={styles.inputs}>
            <label>Relationship</label>
            <input
              value={relation}
              className={relationClasses}
              onChange={relationChangeHandler}
              onBlur={relationBlurHandler}
              type="text"
            />
          </div>
          {relationIsInvalid && <p className={styles.error}>Invalid entry</p>}
        </div>
        <div className={styles.wrapper}>
          <div className={styles.inputs}>
            <label>Password</label>
            <input
              value={password}
              className={passwordClasses}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              type="password"
            />
          </div>
          {passwordIsInvalid && <p className={styles.error}>Invalid entry</p>}
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
export default UpdateNominee;
