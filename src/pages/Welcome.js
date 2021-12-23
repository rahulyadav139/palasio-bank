import { Fragment } from 'react';
import Header from '../components/Header';
import Operations from '../components/Operations';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const Welcome = props => {
  return (
    <Fragment>
      <Header />
      <Operations />
      <Testimonials />
      <Footer />
    </Fragment>
  );
};
export default Welcome;
