import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { requireAuth } from './auth';
import App from './App';
import Login from './Login';
import Logout from './Logout';
import PoemListContainer from './PoemListContainer';
import PoemContainer from './PoemContainer';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={PoemListContainer} url="/api/poem" pollInterval={2000} onEnter={requireAuth} />
      <Route path="/poem/:poemId" component={PoemContainer} onEnter={requireAuth} />
    </Route>
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} onEnter={requireAuth} />
  </Router>
  ), document.getElementById('app')
);
