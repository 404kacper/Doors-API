import React from 'react';

const Landing = () => {
  return (
    <nav className='navbar navbar-expand-md navbar-dark bg-primary fixed-top'>
      <div className='container'>
        <a className='navbar-brand' href='index.html'>
          <i className='fas fa-laptop-code'></i> DoorManager
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <a className='nav-link' href='login.html'>
                <i className='fas fa-sign-in-alt'></i> Login
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='register.html'>
                <i className='fas fa-user-plus'></i> Register
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Landing;