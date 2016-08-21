import React, { PropTypes } from 'react';
import PoemBox from './PoemBox';

const App = React.createClass({
  render () {
    return <PoemBox url="/api/poem" pollInterval={2000} />;
  }
});

export default App;
