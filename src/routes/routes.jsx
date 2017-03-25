import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import Home from '../components/Home';
import BookDetail from '../components/BookDetail/BookDetail';

const Routes = () => (
  <Router history={hashHistory}>
    <Route path='/' component={Home} />
    <Route path='/book-detail' component={BookDetail} />
  </Router>
);

export default Routes;
