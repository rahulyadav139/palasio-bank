import styles from './UpgradeProducts.module.css';
import UpgradeAvailable from './UpgradeAvailable';
import UpgradeForm from './UpgradeForm';
import { useState } from 'react';
import Card from '../../UI/Card';
import { creditCards } from '../../../store/promotional-data';

const UpgradeCreditCard = props => {
  const [showProducts, setShowProducts] = useState(true);
  const [product, setProduct] = useState('');

  const switchHandler = productName => {
    setShowProducts(false);
    setProduct(productName);
  };

  const productsAvailable = creditCards.map(el => (
    <UpgradeAvailable
      onSwitch={switchHandler}
      key={el.id}
      title={el.title}
      benefits={el.benefits}
    />
  ));
  return (
    <Card>
      {showProducts ? (
        <div className={styles.wrapper}>{productsAvailable} </div>
      ) : (
        <UpgradeForm title={product} />
      )}
    </Card>
  );
};
export default UpgradeCreditCard;
