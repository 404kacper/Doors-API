import api from '../utils/axiosProductionInterface';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types';

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/api/auth/me');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const res = await api.post('/api/auth/register', body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (error) {
      const errorResponseMessage = error.response.data.error;

      console.log(errorResponseMessage);

      if (errorResponseMessage) {
        dispatch(setAlert(errorResponseMessage, 'danger'));
      } else {
        dispatch(
          setAlert(
            'Undefined error encountered, check console for more information.',
            'danger'
          )
        );
      }

      dispatch({ type: REGISTER_FAIL });
    }
  };

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await api.post('/api/auth/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    const errorResponseMessage = error.response.data.error;

    console.log(errorResponseMessage);

    if (errorResponseMessage) {
      dispatch(setAlert(errorResponseMessage, 'danger'));
    } else {
      dispatch(
        setAlert(
          'Undefined error encountered, check console for more information.',
          'danger'
        )
      );
    }

    dispatch({ type: LOGIN_FAIL });
  }
};

// Logout User
export const logout = () => ({ type: LOGOUT });
