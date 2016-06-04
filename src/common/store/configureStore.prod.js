import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';

const finalCreateStore = compose(
  applyMiddleware(thunkMiddleware)
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}