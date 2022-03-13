import styles from '../../Forms/UpdateForm.module.css';

import Card from '../../UI/Card';
import sampleDebitCardImage from '../../../Assets/sample-debit-card.jpg';
import useInput from '../../../hooks/use-input';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Fragment, useState } from 'react';
import { ModalActions } from '../../../store/modal-slice';
import { useFetch } from '../../../hooks/use-fetch';
import { useSend } from '../../../hooks/use-send';

const GenerateCardPIN = props => {
  const [card, setCard] = useState('');
  const [cardNumber, setCardNumber] = useState(0);
  const [isSelected, setIsSelected] = useState(true);
  const [cardType, setCardType] = useState('');
  const dispatch = useDispatch();
  const { sendData } = useSend();

  const { loading, profile } = useFetch(
    'https://palasio-bank.herokuapp.com/admin/cards'
  );

  const {
    value: cvv,
    setIsTouched: cvvIsTouched,
    isValid: cvvIsValid,
    isInvalid: cvvIsInvalid,
    changeHandler: cvvChangeHandler,
    blurHandler: cvvBlurHandler,
  } = useInput(value => value.trim().length === 3);
  const {
    value: newPin,
    setIsTouched: newPinIsTouched,
    isValid: newPinIsValid,
    isInvalid: newPinIsInvalid,
    changeHandler: newPinChangeHandler,
    blurHandler: newPinBlurHandler,
  } = useInput(value => value.trim().length !== 0);
  const {
    value: confirmPin,
    setIsTouched: confirmPinIsTouched,
    isValid: confirmPinIsValid,
    isInvalid: confirmPinIsInvalid,
    changeHandler: confirmPinChangeHandler,
    blurHandler: confirmPinBlurHandler,
  } = useInput(value => value.trim().length !== 0);
  const {
    value: password,
    setIsTouched: passwordIsTouched,
    isValid: passwordIsValid,
    isInvalid: passwordIsInvalid,
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
  } = useInput(value => value.trim().length !== 0);

  const cvvClasses = cvvIsInvalid ? styles.invalid : '';
  const newPinClasses = newPinIsInvalid ? styles.invalid : '';
  const confirmPinClasses = confirmPinIsInvalid ? styles.invalid : '';
  const passwordClasses = passwordIsInvalid ? styles.invalid : '';

  const submitHandler = async e => {
    e.preventDefault();

    if (!cvvIsValid) cvvIsTouched(true);
    if (!newPinIsValid) newPinIsTouched(true);
    if (!confirmPinIsValid) confirmPinIsTouched(true);
    if (!passwordIsValid) passwordIsTouched(true);
    if (cardNumber === 'unselected') setIsSelected(false);

    if (
      !cvvIsValid ||
      !newPinIsValid ||
      !confirmPinIsValid ||
      !passwordIsValid ||
      cardNumber === 'unselected'
    )
      return;

    if (card === 'debit') {
      if (Number(cvv) !== profile.debitCardDetails.cvv) {
        dispatch(
          ModalActions.confirmModalHandler({
            isModal: true,
            message: 'Incorrect CVV code!',
            redirect: false,
          })
        );
        return;
      }
    } else {
      if (Number(cvv) !== profile.creditCardDetails.cvv) {
        dispatch(
          ModalActions.confirmModalHandler({
            isModal: true,
            message: 'Incorrect CVV code!',
            redirect: false,
          })
        );
        return;
      }
    }
    if (newPin !== confirmPin) {
      dispatch(
        ModalActions.confirmModalHandler({
          isModal: true,
          message: 'PIN does not match!',
          redirect: true,
        })
      );
    }

    const { error, status} = await sendData(
      'https://palasio-bank.herokuapp.com/service/update-pin',
      { newPin, cardType: card, password }
    );

    if (status == 401) {
      dispatch(
        ModalActions.confirmModalHandler({
          isModal: true,
          message: 'Incorrect password!',
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

  const optionChangeHandler = e => {
    setCardNumber(e.target.value);
    if (e.target.value === profile.debitCardDetails.cardNumber) {
      setCardType(profile.debitCardDetails.cardType);
      setCard('debit');
    } else {
      setCardType(profile.creditCardDetails.cardType);
      setCard('credit');
    }

    if (e.target.value !== 'unselected') setIsSelected(true);
    else setIsSelected(false);
  };
  return (
    <Fragment>
      {!loading && (
        <Card>
          <div className={styles.box}>
            <div className={styles.image}>
              <img src={sampleDebitCardImage} alt="sample-debit-card" />
            </div>
          </div>

          <h2 className={styles.title}>Generate Card PIN</h2>

          <form onSubmit={submitHandler} className={styles.form}>
            <div className={styles.wrapper}>
              <div className={styles.inputs}>
                <label>Debit Card</label>
                <select value={cardNumber} onChange={optionChangeHandler}>
                  <option value="unselected">--select card--</option>
                  <option value={profile.debitCardDetails.cardNumber}>
                    {profile.debitCardDetails.cardNumber}
                  </option>
                  <option value={profile.creditCardDetails.cardNumber}>
                    {profile.creditCardDetails.cardNumber}
                  </option>
                </select>
              </div>
              {!isSelected && <p className={styles.error}>Invalid entry</p>}
            </div>
            <div className={styles.wrapper}>
              <div className={styles.inputs}>
                <label>Card Name</label>
                <div className={styles.filled}>{cardType}</div>
              </div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.inputs}>
                <label>CVV Number</label>
                <input
                  value={cvv}
                  className={cvvClasses}
                  onChange={cvvChangeHandler}
                  onBlur={cvvBlurHandler}
                  type="text"
                />
              </div>
              {cvvIsInvalid && <p className={styles.error}>Invalid entry</p>}
            </div>
            <div className={styles.wrapper}>
              <div className={styles.inputs}>
                <label>New PIN</label>
                <input
                  value={newPin}
                  className={newPinClasses}
                  onChange={newPinChangeHandler}
                  onBlur={newPinBlurHandler}
                  type="number"
                />
              </div>
              {newPinIsInvalid && <p className={styles.error}>Invalid entry</p>}
            </div>

            <div className={styles.wrapper}>
              <div className={styles.inputs}>
                <label>Confirm PIN</label>
                <input
                  value={confirmPin}
                  className={confirmPinClasses}
                  onChange={confirmPinChangeHandler}
                  onBlur={confirmPinBlurHandler}
                  type="text"
                />
              </div>
              {confirmPinIsInvalid && (
                <p className={styles.error}>Invalid entry</p>
              )}
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
              {passwordIsInvalid && (
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
      )}
    </Fragment>
  );
};
export default GenerateCardPIN;
