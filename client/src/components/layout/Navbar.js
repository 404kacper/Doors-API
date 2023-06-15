import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({
  auth: { isAuthenticated, role },
  logout,
  bgClass = '',
  positionClass = '',
}) => {
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
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const adminLinks = (
    <Fragment>
      <li class='nav-item dropdown'>
        <button
          class='nav-link dropdown-toggle'
          href='#'
          id='navbarDropdown'
          data-toggle='dropdown'
        >
          <i class='fas fa-user'></i> Account
        </button>
        <div class='dropdown-menu'>
          <a class='dropdown-item' href='manage-bootcamp.html'>
            Manage Bootcamp
          </a>
          <a class='dropdown-item' href='manage-reviews.html'>
            Manage Reviews
          </a>
          <a class='dropdown-item' href='manage-account.html'>
            Manage Account
          </a>
          <div class='dropdown-divider'></div>
          <a class='dropdown-item' href='login.html'>
            <i class='fas fa-sign-out-alt'></i> Logout
          </a>
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
        {/* Toggler for responsive navbar */}
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

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
  auth: PropTypes.object.isRequired,
  bgClass: PropTypes.string,
  positionClass: PropTypes.string,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
