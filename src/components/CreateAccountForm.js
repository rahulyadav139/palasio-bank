import styles from './Form.module.css';
const CreateAccountForm = props => {
  return (
    <form className={styles.form}>
      <div className={styles.inputs}>
        <label>First Name</label>
        <input type="text" />
      </div>
      <div className={styles.inputs}>
        <label>Last Name</label>
        <input type="text" />
      </div>
      <div className={styles.inputs}>
        <label>Email</label>
        <input type="text" />
      </div>
      <div className={styles.inputs}>
        <label>Create Username</label>
        <input type="text" />
      </div>
      <div className={styles.inputs}>
        <label>Create Password</label>
        <input type="text" />
      </div>
      <div className={styles.inputs}>
        <label>Confirm Password</label>
        <input type="text" />
      </div>
      <div className={styles.buttons}>
        <button onClick={props.onCancel}>Cancel</button>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default CreateAccountForm;
