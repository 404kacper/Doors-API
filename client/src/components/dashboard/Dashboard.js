import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import Navbar from '../layout/Navbar';
import GuestDashboard from './GuestDashboard';
import EmployeeDashboard from './EmployeeDashboard';
import AdminDashboard from './AdminDashboard';

const Dasbhoard = ({ auth: { user } }) => {
  const renderRole = () => {
    if (!user || !user.data) {
      return <div>User is loading please wait a few seconds...</div>;
    }

    switch (user.data.role) {
      case 'guest':
        return <GuestDashboard />;
      case 'employee':
        return <EmployeeDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <div>Unkown role logged in, please contact customer support for more information.</div>;
    }
  };

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

export default connect(mapStateToProps)(Dasbhoard);
