import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from '../common/store/configureStore';
import createRoutes from '../common/routes';

import "bootstrap-sass/assets/stylesheets/_bootstrap.scss";
import '../common/style/app.scss';


const store = configureStore(browserHistory, window.__INITIAL_STATE__);
const history = syncHistoryWithStore(browserHistory, store);

export default function(props) {
  return (
    <Provider store={store}>
      {createRoutes(history)}
    </Provider>
  );
}
