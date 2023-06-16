import React, { Fragment } from 'react';
import Navbar from '../layout/Navbar';

const Landing = () => {
  return (
    <Fragment>
      <Navbar positionClass='fixed-top'/>
      <section className='showcase'>
        <div className='dark-overlay'>
          <div className='showcase-inner container'>
            <h1 className='display-4'>Find a Door That Belongs To You</h1>
            <p className='lead'>
              Documented, Simple & Intuitional API for doors management.
              <br />
              Available 3 access role panels.
              <br />
              Remember to supply 3 example login credentials before hosting.
            </p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
export default Landing;
