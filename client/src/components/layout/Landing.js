import React, { Fragment } from 'react';
import Navbar from '../layout/Navbar';

const Landing = () => {
  return (
    <Fragment>
      <Navbar />
      <section className='showcase'>
        <div className='dark-overlay'>
          <div className='showcase-inner container'>
            <h1 className='display-4'>Find a Door That Belongs To You</h1>
            <p className='lead'>
              Simple & Intuitional API for doors management with admin panel.
            </p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
export default Landing;
