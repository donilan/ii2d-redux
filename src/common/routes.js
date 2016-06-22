import { Route, Redirect, IndexRoute, Router } from "react-router";
import React from "react";

import App from "./containers/App";
import Home from './containers/Home';
import Counter from './containers/Counter';
import NoMatch from './containers/NoMatch';

export default function(history) {
  return (
    <Router history={history} >
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="counter" component={Counter} />
        <Route path="*" component={NoMatch} />
      </Route>
    </Router>
  );
}
