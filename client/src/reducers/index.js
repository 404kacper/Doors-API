import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import dashboard from './dashboard';
import forms from './forms';

export default combineReducers({ alert, auth, dashboard, forms });
