import styles from './TestimonialSlides.module.css';
import { NextIcon } from './icons';
import { PrevIcon } from './icons';

const TestimonialSlides = props => {
  const { title, text, name, address } = props;
  const classes = `${styles.slide} ${styles[props.className]}`;

  return (
    <div className={classes}>
      <h3>{title}</h3>
      <p>{text}</p>
      <div className={styles.personal}>
        <div className={styles.image}>
          <img src={props.img} />
        </div>
        <div>
          <h4>{name}</h4>
          <h5>{address}</h5>
        </div>
      </div>
      <button onClick={props.onPrev} className={`${styles.btn} ${styles.prev}`}>
        <PrevIcon />
      </button>
      <button onClick={props.onNext} className={`${styles.btn} ${styles.next}`}>
        <NextIcon />
      </button>
    </div>
  );
};

export default TestimonialSlides;
