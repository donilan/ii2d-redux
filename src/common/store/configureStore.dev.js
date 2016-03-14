import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';
import DevTools from '../containers/DevTools';
import rootReducer from '../reducers';


const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true
});

const finalCreateStore = compose(
  applyMiddleware(thunkMiddleware, promiseMiddleware, loggerMiddleware),
  DevTools.instrument()
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
