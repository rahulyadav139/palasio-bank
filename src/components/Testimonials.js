import styles from './Testimonials.module.css';
import TestimonialSlides from './TestimonialSlides';
import { TestimonialData } from './TestimonialData';
import { useState, useEffect } from 'react';

const Testimonials = props => {
  const [sliderIndex, setSliderIndex] = useState(1);

  const data = TestimonialData;

  const nextSlideHandler = () => {
    if (sliderIndex === data.length) {
      setSliderIndex(1);
    } else if (sliderIndex !== data.length) {
      setSliderIndex(prev => prev + 1);
    }
  };
  const prevSlideHandler = () => {
    if (sliderIndex === 1) {
      setSliderIndex(data.length);
    } else if (sliderIndex !== 1) {
      setSliderIndex(prev => prev - 1);
    }
  };
  const activeDotHandler = i => {
    setSliderIndex(i + 1);
  };

  useEffect(() => {
    const timer = setTimeout(nextSlideHandler, 4000);
    return () => clearTimeout(timer);
  }, [sliderIndex]);
  return (
    <div id="features" className={styles.features}>
      <div className={styles.heading}>
        <h3 className={styles.title}>NOT SURE YET?</h3>
        <h1 className={styles.introtext}>
          Millions of Bankists are already making their lifes simpler.
        </h1>
      </div>
      <div className={styles.card}>
        {data.map((el, i) => (
          <div>
            <TestimonialSlides
              onNext={nextSlideHandler}
              onPrev={prevSlideHandler}
              img={require(`../Assets/testimonial's-image/testimonial-${
                i + 1
              }.jpg`)}
              className={sliderIndex === i + 1 ? 'active' : ''}
              title={el.title}
              text={el.text}
              name={el.name}
              address={el.address}
            />
          </div>
        ))}
        <div className={styles.dots}>
          {data.map((el, i) => (
            <div
              key={i}
              onClick={() => activeDotHandler(i)}
              className={
                sliderIndex === i + 1
                  ? `${styles.dot} ${styles['active-dot']}`
                  : styles.dot
              }
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Testimonials;
