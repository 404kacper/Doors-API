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
  let role = ''; // default value for role - it can't be destructured directly from props as it can be null
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

      <li className='nav-item symbol text-white'>
        <span className='nav-link px-0'>|</span>
      </li>

      <li className='nav-item dropdown'>
        <button
          className='nav-link dropdown-toggle'
          id='navbarDropdown'
          data-bs-toggle='dropdown'
        >
          <i className='fas fa-file-alt'></i> Docs
        </button>
        <div className='dropdown-menu'>
          <Link className='dropdown-item' to='/docs'>
            DocGen
          </Link>
          <div className='dropdown-divider'></div>
          <a
            className='dropdown-item'
            href='https://documenter.getpostman.com/view/7914536/2s93shzVEj'
            target='blank'
          >
            Postman
          </a>
        </div>
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
          <Link className='dropdown-item' to='/form-create-door'>
            Create Door
          </Link>
          <Link className='dropdown-item' to='/form-assign-card'>
            Assign Card
          </Link>
          <Link className='dropdown-item' to='/form-create-user'>
            Create User
          </Link>
          <Link className='dropdown-item' to='/form-update-user'>
            Update User
          </Link>
          <Link className='dropdown-item' to='/form-delete-user'>
            Delete User
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
