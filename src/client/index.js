import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';


import configureStore from '../common/store/configureStore';
import createRoutes from '../common/routes';
import "bootstrap-sass/assets/stylesheets/_bootstrap.scss";
import '../common/style/app.scss';

const store = configureStore(window.__INITIAL_STATE__);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    {createRoutes(history)}
  </Provider>,
  document.getElementById('root')
);
