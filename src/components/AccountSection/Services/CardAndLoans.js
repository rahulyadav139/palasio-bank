import styles from './CardAndLoans.module.css';
import Card from '../../UI/Card';
import Loans from '../Services/Loans';
import PaymentCards from './PaymentCards';
import { useSelector } from 'react-redux';

const CardAndLoans = props => {
  const loans = useSelector(state => state.bank.profile.loanAccountDetails);

  const loanCards = loans.map((el, i) => (
    <Loans key={el.loanAccountNumber} loan={el} index={i + 1} />
  ));
  return (
    <Card>
      <PaymentCards />
      <div>
        <h2 className={styles.title}>Loans</h2>
        {loans.length ? loanCards : <p>No Active Loan</p>}
      </div>
    </Card>
  );
};
export default CardAndLoans;
