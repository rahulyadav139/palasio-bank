import NoPageFoundImg from '../Assets/no-page-found.png';
import styles from './NoPageFound.module.css';

const NoPageFound = props => {
  return (
    <div>
      <div className={styles.image}>
        <img src={NoPageFoundImg} alt="no-page-found" />
      </div>
      <h1 className={styles.title}>No Page Found!</h1>
    </div>
  );
};
export default NoPageFound;
