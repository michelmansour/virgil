import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './App';
import PoemListContainer from './PoemListContainer';
import PoemContainer from './PoemContainer';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={PoemListContainer} url="/api/poem" pollInterval={2000} />
      <Route path="/poem/:poemId" component={PoemContainer} />
    </Route>
  </Router>
  ), document.getElementById('app')
);
