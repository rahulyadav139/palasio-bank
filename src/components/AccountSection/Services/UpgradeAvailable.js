import styles from './UpgradeAvailable.module.css';
import Card from '../../UI/Card';

const UpgradeAvailable = props => {
  return (
    <Card>
      <div className={styles.card}>
        <div className={styles.head1}>{props.title}</div>
        <hr />
        <ul className={styles.items}>
          {props.benefits.map((el, i) => (
            <li className={`${styles.item} ${styles.head2}`} key={i + 1}>
              {el}
            </li>
          ))}
        </ul>
        <button
          className={styles.button}
          onClick={() => props.onSwitch(props.title)}
        >
          choose
        </button>
      </div>
    </Card>
  );
};
export default UpgradeAvailable;
