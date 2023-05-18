import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './style.css';
import './bootstrap.css';

import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const App = () => (
  <Router>
    <Routes>
      <Route exact path='/' element={<Landing />} />
      <Route exact path='/register' element={<Register />} />
      <Route exact path='/login' element={<Login />} />
    </Routes>
  </Router>
);

export default App;
