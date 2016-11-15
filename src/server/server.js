import express from 'express';
import path from 'path';

import React from 'react';
import {renderToString} from 'react-dom/server';

import { RouterContext, match, memoryHistory } from 'react-router';
import { Provider } from 'react-redux';

import createRoutes from '../common/routes';
import configureStore from '../common/store/configureStore';

const app = express();
app.set('views', path.join(__dirname, '../client'));
app.set('view engine', 'pug');

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../')));
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
          state: JSON.stringify(store.getState()),
          js: '/dist/app.js',
          css: '/dist/app.css',
        });
      } else {
        res.status(404).send('Not found')
      }
    });
  } else {
    res.render('index', {
      content: '', state: JSON.stringify({}),
      js: 'http://localhost:3001/dist/app.js'
    });
  }
})

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
