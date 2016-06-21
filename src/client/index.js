import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from '../common/store/configureStore';
import createRoutes from '../common/routes';
import "bootstrap-sass/assets/stylesheets/_bootstrap.scss";
import '../common/style/app.scss';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    {createRoutes(browserHistory)}
  </Provider>,
  document.getElementById('root')
);
