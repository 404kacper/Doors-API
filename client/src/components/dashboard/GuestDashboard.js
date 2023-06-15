import React from 'react';
import { connect } from 'react-redux';

const GuestDashboard = () => {
  return <div className='container'>Guest dashboard</div>;
};

GuestDashboard.propTypes = {};

const mapStateToProps = (state) => ({});

// export default connect(mapStateToProps, { login })(Login);
export default connect(mapStateToProps)(GuestDashboard);
