import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const App = ({ children }) => (
  <div>
    <h1>Virgil</h1>
    <ul>
      <li><IndexLink to="/">Home</IndexLink></li>
      <li><Link to="/logout">Log out</Link></li>
    </ul>

    {children}

  </div>
);

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
