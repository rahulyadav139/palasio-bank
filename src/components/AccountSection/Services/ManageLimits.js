import styles from './ManageLimits.module.css';
import Card from '../../UI/Card';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ModalActions } from '../../../store/modal-slice';
import { useSend } from '../../../hooks/use-send';

const ManageLimits = props => {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const { sendData } = useSend();

  const [dcWithdrawalLimit, setDcWithdrawalLimit] = useState(0);
  const [ccWithdrawalLimit, setCcWithdrawalLimit] = useState(0);
  const [dcPOSLimit, setDcPOSLimit] = useState(0);
  const [ccPOSLimit, setCcPOSLimit] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://palasio-bank.herokuapp.com/service/limits', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        const data = await res.json();

        setDcWithdrawalLimit(data.dcWithdrawalLimit);
        setCcWithdrawalLimit(data.ccWithdrawalLimit);
        setDcPOSLimit(data.dcPOSLimit);
        setCcPOSLimit(data.ccPOSLimit);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [token]);

  const dcWithdrawalLimitChangeHandler = e => {
    if (!e.target.checkValidity()) {
      e.preventDefault();
      setDcWithdrawalLimit(50000);
      return;
    }

    setDcWithdrawalLimit(e.target.value);
  };
  const ccWithdrawalLimitChangeHandler = e => {
    if (!e.target.checkValidity()) {
      e.preventDefault();
      setCcWithdrawalLimit(10000);
      return;
    }

    setCcWithdrawalLimit(e.target.value);
  };
  const dcPOSLimitChangeHandler = e => {
    if (!e.target.checkValidity()) {
      e.preventDefault();
      setDcPOSLimit(100000);
      return;
    }

    setDcPOSLimit(e.target.value);
  };
  const ccPOSLimitChangeHandler = e => {
    if (!e.target.checkValidity()) {
      e.preventDefault();
      setCcPOSLimit(100000);
      return;
    }

    setCcPOSLimit(e.target.value);
  };

  const avoidKeys = e => {
    if (e.key === '.' || e.key === 'e' || e.key === '-') e.preventDefault();
  };

  const submitHandler = async e => {
    e.preventDefault();

    const newLimits = {
      dcWithdrawalLimit,
      ccWithdrawalLimit,
      dcPOSLimit,
      ccPOSLimit,
    };

    const [data, error, status] = await sendData(
      'https://palasio-bank.herokuapp.com/service/limits',
      newLimits
    );

    if (error) return;

    dispatch(
      ModalActions.confirmModalHandler({
        isModal: true,
        message: 'Limits have been updated!',
        redirect: true,
      })
    );
  };
  return (
    <Card>
      <h2 className={styles.title}>Manage Limits</h2>
      <form onSubmit={submitHandler} className={styles.form}>
        <h3 className={styles.subtitle}>Debit Card Limits</h3>
        <div className={styles.row}>
          <div className={styles.card}>
            <div className={styles.input}>
              <label className={styles.label}>Withdrawal Limit</label>
              <div>
                <span>₹</span>
                <input
                  placeholder="0"
                  value={dcWithdrawalLimit}
                  onChange={dcWithdrawalLimitChangeHandler}
                  onKeyDown={avoidKeys}
                  step="1"
                  min="0"
                  max="50000"
                  type="number"
                />
              </div>
            </div>
            <div className={styles.slider}>
              <input
                value={dcWithdrawalLimit}
                onChange={dcWithdrawalLimitChangeHandler}
                step="1"
                min="0"
                max="50000"
                type="range"
              />
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.input}>
              <label className={styles.label}>POS Limit</label>
              <div>
                <span>₹</span>
                <input
                  placeholder="0"
                  value={dcPOSLimit}
                  onChange={dcPOSLimitChangeHandler}
                  onKeyDown={avoidKeys}
                  step="1"
                  min="0"
                  max="100000"
                  type="number"
                />
              </div>
            </div>
            <div className={styles.slider}>
              <input
                value={dcPOSLimit}
                onChange={dcPOSLimitChangeHandler}
                step="1"
                min="0"
                max="100000"
                type="range"
              />
            </div>
          </div>
        </div>
        <hr />
        <h3 className={styles.subtitle}>Credit Card Limits</h3>
        <div className={styles.row}>
          <div className={styles.card}>
            <div className={styles.input}>
              <label className={styles.label}>Cash Limit</label>
              <div>
                <span>₹</span>
                <input
                  placeholder="0"
                  value={ccWithdrawalLimit}
                  onChange={ccWithdrawalLimitChangeHandler}
                  onKeyDown={avoidKeys}
                  step="1"
                  min="0"
                  max="10000"
                  type="number"
                />
              </div>
            </div>
            <div className={styles.slider}>
              <input
                value={ccWithdrawalLimit}
                onChange={ccWithdrawalLimitChangeHandler}
                step="1"
                min="0"
                max="10000"
                type="range"
              />
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.input}>
              <label className={styles.label}>POS Limit</label>
              <div>
                <span>₹</span>
                <input
                  placeholder="0"
                  value={ccPOSLimit}
                  onChange={ccPOSLimitChangeHandler}
                  onKeyDown={avoidKeys}
                  step="1"
                  min="0"
                  max="100000"
                  type="number"
                />
              </div>
            </div>
            <div className={styles.slider}>
              <input
                value={ccPOSLimit}
                onChange={ccPOSLimitChangeHandler}
                step="1"
                min="0"
                max="100000"
                type="range"
              />
            </div>
          </div>
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
export default ManageLimits;
