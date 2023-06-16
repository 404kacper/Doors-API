import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import Navbar from '../layout/Navbar';
import GuestDashboard from './GuestDashboard';
import EmployeeDashboard from './EmployeeDashboard';


const Dasbhoard = ({ auth: { user } }) => {
  const renderRole = () => {
    if (!user || !user.data) {
      return <div>User is loading please wait a few seconds...</div>
    }
    
    switch(user.data.role) {
      case 'guest':
        return <GuestDashboard/>
      case 'employee':
        return <EmployeeDashboard/>
      case 'admin':
        return <div>Admin logged in.</div>
        default:
          return <div>Unkown role logged in.</div>
    }
  }

  return (
    <Fragment>
      <Navbar bgClass='bg-dark' />
      {renderRole()}
    </Fragment>
  );
};

Dasbhoard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

// export default connect(mapStateToProps, { login })(Login);
export default connect(mapStateToProps)(Dasbhoard);
