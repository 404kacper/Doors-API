import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Docs from './components/layout/Docs';
import PrivateRoute from './components/routing/PrivateRoute';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { LOGOUT } from './actions/types';

// Css and bootstrap js
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route
            path='dashboard'
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='docs' element={<Docs />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
