import styles from './Form.module.css';

const LoginForm = props => {
  const submitHandler = e => {
    e.preventDefault();
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={styles.inputs}>
        <label>Username</label>
        <input type="text" />
      </div>
      <div className={styles.inputs}>
        <label>Password</label>
        <input type="text" />
      </div>
      <div className={styles.buttons}>
        <button onClick={props.onCancel}>Cancel</button>
        <button type="submit">Login</button>
      </div>
      <p onClick={props.onSwitch}>New to Palasio! Create an account now.</p>
    </form>
  );
};
export default LoginForm;
