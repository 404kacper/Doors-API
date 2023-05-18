import React, { Fragment, useState } from 'react';
import Navbar from '../layout/Navbar';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

import PropTypes from 'prop-types';
import Alert from '../layout/Alert';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    role: 'guest', // for checked property in radio buttons - default role
  });
  const roleOptions = [
    { value: 'guest', label: 'Guest' },
    { value: 'employee', label: 'Employee' },
    { value: 'admin', label: 'Admin' },
  ];

  const { name, email, password, password2, role } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({name, email, password, role});
    }
  };

  const navigate = useNavigate(); // navigate hook for redirection

  if (isAuthenticated) {
    navigate('/dashboard');
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
                    <i className='fas fa-user-plus'></i> Register
                  </h1>
                  <p>Register to gain different access levels to doors API.</p>
                  <form onSubmit={(e) => onSubmit(e)}>
                    <div className='form-group'>
                      <label htmlFor='name'>Name</label>
                      <input
                        type='text'
                        name='name'
                        value={name}
                        onChange={(e) => onChange(e)}
                        className='form-control'
                        placeholder='Enter your name'
                        required
                      />
                    </div>
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
                    <div className='form-group'>
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
                    <div className='form-group mb-4'>
                      <label htmlFor='password2'>Confirm Password</label>
                      <input
                        type='password'
                        name='password2'
                        value={password2}
                        onChange={(e) => onChange(e)}
                        className='form-control'
                        placeholder='Confirm password'
                        required
                      />
                    </div>

                    <div className='card card-body mb-3'>
                      <h5>User Role</h5>

                      {roleOptions.map((option) => (
                        <div className='form-check' key={option.value}>
                          <input
                            className='form-check-input'
                            type='radio'
                            name='role'
                            value={option.value}
                            checked={role === option.value}
                            onChange={(e) => onChange(e)}
                          />
                          <label className='form-check-label'>
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                    <Alert />

                    <div className='form-group'>
                      <input
                        type='submit'
                        value='Register'
                        className='btn btn-dark btn-block'
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);