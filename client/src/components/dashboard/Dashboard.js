import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import Navbar from '../layout/Navbar';

// po skończeniu tego dodać logout do navbara - renderowanie w zalezności od isAuthenticated
// dobra co dalej - navbar w zaleznosci od authenticated / not - to samo co u góry tylko wywalić login/register
// ew zastanowić się co zrobić z redirectem na DoorManager - isAuthenticated ? dashboard : landing
const Dasbhoard = ({ auth: { user } }) => {
  const renderRole = () => {
    if (!user || !user.data) {
      return <div>User is waiting please wait a few seconds...</div>
    }
    
    switch(user.data.role) {
      case 'guest':
        return <div>Guest logged in.</div>
      case 'employee':
        return <div>Employee logged in.</div>
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
