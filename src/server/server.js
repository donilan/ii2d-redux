import express from 'express';
import path from 'path';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../../webpack.config';
import React from 'react';
import {renderToString} from 'react-dom/server';

import { RouterContext, match, memoryHistory } from 'react-router';
import { Provider } from 'react-redux';

import createRoutes from '../common/routes';
import configureStore from '../common/store/configureStore';

const app = express();
app.set('views', path.join(__dirname, '../client'));
app.set('view engine', 'jade');

if(process.env.NODE_ENV !== 'production'){
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
    stats: {
      colors: true
    }
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.get('/*', function (req, res) {
  if(process.env.NODE_ENV === 'production' || process.env.SERVER_RENDERING){
    let routes = createRoutes(memoryHistory);
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        const store = configureStore();
        const InitialView = (
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        res.render('index', {
          content: renderToString(InitialView),
          state: JSON.stringify(store.getState())
        });
      } else {
        res.status(404).send('Not found')
      }
    });
  } else {
    res.render('index', {content: '', state: JSON.stringify({})});
  }
})

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
