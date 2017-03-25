import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import Routes from '../routes/routes';

const store = configureStore();
render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app'),
);
