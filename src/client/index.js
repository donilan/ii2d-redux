import { AppContainer } from 'react-hot-loader';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';


let rootEl = document.getElementById('root');
ReactDOM.render(
  <AppContainer>
    <Root />
  </AppContainer>,
  rootEl
);


if (module.hot) {
  module.hot.accept('./Root', () => {
    const NextApp = require('./Root').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      rootEl
    );
  });
}
