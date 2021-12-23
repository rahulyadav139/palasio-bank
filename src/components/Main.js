import styles from './Main.module.css';

const Main = () => {
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.intro}>
          <h1>
            When <span className={styles.highlight}> banking </span> meets
            <br />
            <span className={styles.highlight}>minimalist</span>
          </h1>
          <h2 className={styles.subtitle}>
            A simpler banking experience for a simpler life.
          </h2>
          <button>Learn more ↓</button>
        </div>
        <div className={styles.images}>
          <div className={styles.img2}>
            <img
              src={require('../Assets/wallet-image.jpg')}
              alt="money-tree-image.jpg"
            />
          </div>
          <div className={styles.img3}>
            <img
              src={require('../Assets/piggie-bank-image.jpg')}
              alt="piggie-bank-image.jpg"
            />
          </div>
        </div>
      </div>
      <hr />
    </main>
  );
};
export default Main;
