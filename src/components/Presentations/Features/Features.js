import styles from './Features.module.css';
import { Fragment } from 'react';
import { LaptopIcon, GrowIcon, CardIcon } from '../../UI/icons';

const Features = props => {
  return (
    <Fragment>
      <section id="features" className={styles.features}>
        <div className={styles.heading}>
          <h3 className={styles.title}>FEATURES</h3>
          <h1 className={styles.introtext}>
            Everything you need in a modern bank and more.
          </h1>
        </div>
        <div className={styles.card}>
          <div className={styles.image}>
            <img
              src={require('../../../Assets/online-banking.jpg')}
              alt="online-banking"
            />
          </div>
          <div className={styles.details}>
            <div className={styles.icons}>
              <LaptopIcon />
            </div>
            <h3 className={styles.cardtitle}>100% digital bank</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              alias sint quos? Accusantium a fugiat porro reiciendis saepe
              quibusdam debitis ducimus.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.details}>
            <div className={styles.icons}>
              <GrowIcon />
            </div>
            <h3 className={styles.cardtitle}>Watch your money grow</h3>
            <p>
              Nesciunt quos autem dolorum voluptates cum dolores dicta fuga
              inventore ab? Nulla incidunt eius numquam sequi iste pariatur
              quibusdam!
            </p>
          </div>
          <div className={styles.image}>
            <img
              src={require('../../../Assets/money-tree-image.jpg')}
              alt="money-tree"
            />
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.image}>
            <img
              src={require('../../../Assets/debit-card-image.jpg')}
              alt="debit-card"
            />
          </div>
          <div>
            <div className={styles.icons}>
              <CardIcon />
            </div>
            <h3 className={styles.cardtitle}>Free debit card included</h3>
            <p>
              Quasi, fugit in cumque cupiditate reprehenderit debitis animi enim
              eveniet consequatur odit quam quos possimus assumenda dicta fuga
              inventore ab.
            </p>
          </div>
        </div>
      </section>
      <hr />
    </Fragment>
  );
};
export default Features;
