import { Route, Redirect, IndexRoute, Router } from "react-router";
import React from "react";

import App from "./containers/App";
import Home from './containers/Home';
import NoMatch from './containers/NoMatch';

export default function(history) {
  return (
    <Router history={history} >
      <Route path="/" component={App}>
        <IndexRoute name="home" component={Home} />
        <Route path="*" component={NoMatch} />
      </Route>
    </Router>
  );
}
