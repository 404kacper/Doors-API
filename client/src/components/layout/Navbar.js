import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({
  auth: { isAuthenticated, user },
  logout,
  bgClass = '',
  positionClass = '',
}) => {
  let role = ''; // default value for role - it can't be destructure directly from props as it can be null
  if (user) {
    role = user.data.role;
  }

  const unauthenticatedLinks = (
    <ul className='navbar-nav ml-auto'>
      <li className='nav-item'>
        <Link className='nav-link' to='/login'>
          <i className='fas fa-sign-in-alt'></i> Login
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/register'>
          <i className='fas fa-user-plus'></i> Register
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <button
          onClick={logout}
          className='nav-link'
          style={{ background: 'none', border: 'none' }}
        >
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </button>
      </li>
    </Fragment>
  );

  const employeeLinks = (
    <Fragment>
      <li className='nav-item dropdown'>
        <button
          className='nav-link dropdown-toggle'
          id='navbarDropdown'
          data-bs-toggle='dropdown'
        >
          <i className='fas fa-user'></i> Account
        </button>
        <div className='dropdown-menu'>
          <Link className='dropdown-item' to='/create-card'>
            Create Card - comming soon
          </Link>
          <div className='dropdown-divider'></div>
          <button onClick={logout} className='dropdown-item'>
            <i className='fas fa-sign-out-alt'></i> Logout
          </button>
        </div>
      </li>
    </Fragment>
  );

  const adminLinks = (
    <Fragment>
      <li className='nav-item dropdown'>
        <button
          className='nav-link dropdown-toggle'
          id='navbarDropdown'
          data-bs-toggle='dropdown'
        >
          <i className='fas fa-user'></i> Account
        </button>
        <div className='dropdown-menu'>
          <Link className='dropdown-item' to='/manage-bootcamp'>
            Manage Bootcamp
          </Link>
          <Link className='dropdown-item' to='/manage-reviews'>
            Manage Reviews
          </Link>
          <Link className='dropdown-item' to='/manage-account'>
            Manage Account
          </Link>
          <div className='dropdown-divider'></div>
          <button onClick={logout} className='dropdown-item'>
            <i className='fas fa-sign-out-alt'></i> Logout
          </button>
        </div>
      </li>
    </Fragment>
  );

  return (
    <nav
      className={`navbar navbar-expand-md navbar-dark ${bgClass} ${positionClass}`}
    >
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          <i className='fas fa-door-open'></i> DoorManager
        </Link>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav ms-auto'>
            {isAuthenticated
              ? (() => {
                  switch (role) {
                    case 'guest':
                      return guestLinks;
                    case 'employee':
                      return employeeLinks;
                    case 'admin':
                      return adminLinks;
                    default:
                      return guestLinks;
                  }
                })()
              : unauthenticatedLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
  }).isRequired,
  bgClass: PropTypes.string,
  positionClass: PropTypes.string,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
