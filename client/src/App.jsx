import React, { PropTypes } from 'react';
import { IndexLink } from 'react-router';

const App = ({ children }) => (
  <div>
    <h1>Virgil</h1>
    <ul>
      <li><IndexLink to="/">Home</IndexLink></li>
    </ul>

    {children}

  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
