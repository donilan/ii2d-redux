import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import { routerMiddleware } from 'react-router-redux';
import reducer from '../reducers';

export default function configureStore(history, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = [reduxRouterMiddleware, thunkMiddleware];

  let finalCreateStore;
  if (process.env.NODE_ENV !== 'production') {
    const loggerMiddleware = createLogger({
      level: 'info',
      collapsed: true
    });
    middleware.push(loggerMiddleware);

    finalCreateStore = compose(
      applyMiddleware(...middleware)
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const store = finalCreateStore(reducer, data);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'));
    });
  }

  return store;
}
