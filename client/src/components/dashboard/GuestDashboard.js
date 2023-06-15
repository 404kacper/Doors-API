import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { loadDoors } from '../../actions/dashboard';

const GuestDashboard = ({ loadDoors, doors }) => {
  useEffect(() => {
    loadDoors();
  }, [loadDoors]);
  return <div className='container'>Guest dashboard</div>;
};

GuestDashboard.propTypes = {
  loadDoors: PropTypes.func.isRequired,
  doors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  doors: state.dashboard.doors,
});

export default connect(mapStateToProps, { loadDoors })(GuestDashboard);
