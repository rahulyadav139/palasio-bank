import styles from './InvestmentAndInsurance.module.css';
import Card from '../../UI/Card';
import { Link } from 'react-router-dom';

const InvestmentAndInsurance = props => {
  return (
    <Card>
      <h2 className={styles.title}>Investment & Insurance</h2>
      <h3>No such investment and insurance found...</h3>
      <h5 className={styles.start}>
        <Link to={`/account/financial-journey`}>
          {`Start your financial journey now ->`}
        </Link>
      </h5>
    </Card>
  );
};
export default InvestmentAndInsurance;
