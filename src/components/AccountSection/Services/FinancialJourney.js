import styles from './FinancialJourney.module.css';
import { Link } from 'react-router-dom';
import { financialData } from '../../../store/promotional-data';

const FinancialJourney = props => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.cards}>
        {financialData.map(el => (
          <Link key={el.id} to={`/account/financial-journey/products/${el.id}`}>
            <div className={styles.card} key={el.id}>
              <div className={styles.head2}>{el.subtitle}</div>
              <div className={styles.head0}>{el.title}</div>
              <div className={styles.head2}>{el.text}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default FinancialJourney;
