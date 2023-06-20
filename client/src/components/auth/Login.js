import React, { Fragment, useState } from 'react';
import Navbar from '../layout/Navbar';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { login } from '../../actions/auth';
import Alert from '../layout/Alert';

const Login = ({ login, isAuthenticated, alerts }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Navigate to='/dashboard'></Navigate>;
  }

  return (
    <Fragment>
      <Navbar bgClass='bg-dark' />

      <section className='form mt-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 m-auto'>
              <div className='card bg-white p-4 mb-4'>
                <div className='card-body'>
                  <h1>
                    <i className='fas fa-sign-in-alt'></i> Login
                  </h1>
                  <p>Login with your account to checkout the doors API!</p>
                  <form onSubmit={(e) => onSubmit(e)}>
                    <div className='form-group'>
                      <label htmlFor='email'>Email Address</label>
                      <input
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                        className='form-control'
                        placeholder='Enter email'
                        required
                      />
                    </div>
                    <div className='form-group mb-4'>
                      <label htmlFor='password'>Password</label>
                      <input
                        type='password'
                        name='password'
                        value={password}
                        onChange={(e) => onChange(e)}
                        className='form-control'
                        placeholder='Enter password'
                        required
                      />
                    </div>
                    {alerts !== null &&
                      alerts.length > 0 &&
                      alerts.map((alert) => (
                        <Alert
                          key={alert.id}
                          alertType={alert.alertType}
                          msg={alert.msg}
                        />
                      ))}
                    <div className='form-group'>
                      <input
                        type='submit'
                        value='Login'
                        className='btn btn-dark btn-block'
                      />
                    </div>
                  </form>
                  <p>
                    Forgot Password?{' '}
                    <Link to='#' className='text-secondary'>
                      Reset Password
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  alerts: state.alert,
});

export default connect(mapStateToProps, { login })(Login);
