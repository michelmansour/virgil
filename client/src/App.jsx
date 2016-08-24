import React from 'react';
import PoemBox from './PoemBox';

const App = () => (
  <PoemBox url="/api/poem" pollInterval={2000} />
);

export default App;
