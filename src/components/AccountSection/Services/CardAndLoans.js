import styles from './CardAndLoans.module.css';
import Card from '../../UI/Card';
import Loans from '../Services/Loans';
import PaymentCards from './PaymentCards';

import { useFetch } from '../../../hooks/use-fetch';

const CardAndLoans = props => {
  const { loading, profile } = useFetch(
    process.env.REACT_APP_BACKEND_URL + '/admin/loans'
  );

  const loans = profile.loanAccountDetails;

  const loanCards = loans?.map((el, i) => (
    <Loans key={el.loanAccountNumber} loan={el} index={i + 1} />
  ));
  return (
    <Card>
      <PaymentCards />
      <div>
        <h2 className={styles.title}>Loans</h2>
        {loans && loans.length ? loanCards : <p>No Active Loan</p>}
      </div>
    </Card>
  );
};
export default CardAndLoans;
