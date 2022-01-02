import { Fragment } from 'react';
import Header from '../components/Header/Header';
import Operations from '../components/Presentations/Operations/Operations';
import Testimonials from '../components/Presentations/Testimonials/Testimonials';
import Features from '../components/Presentations/Features/Features';
import Footer from '../components/Footer/Footer';

const Welcome = props => {
  return (
    <Fragment>
      <Header />
      <Features />
      <Operations />
      <Testimonials />
      <Footer />
    </Fragment>
  );
};
export default Welcome;
