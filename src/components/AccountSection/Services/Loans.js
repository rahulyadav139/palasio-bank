import styles from './Loans.module.css';

const Loans = props => {
  const { loanAccountNumber, loanType, period, sum, emi } = props.loan;
  return (
    <div className={styles.card}>
      <div>{props.index}</div>
      <div className={styles.title}>
        <div>
          <div className={styles.head1}>{loanAccountNumber}</div>
          <div className={styles.head2}>{loanType}</div>
        </div>

        <div className={styles.head2}>{`EMI: ${emi}`}</div>
      </div>
      <div className={styles.amount}>
        <div className={styles.head2}>{`Sum: ${sum}`}</div>
        <div className={styles.head2}>{`Period: ${period} Years`}</div>
      </div>
    </div>
  );
};
export default Loans;
