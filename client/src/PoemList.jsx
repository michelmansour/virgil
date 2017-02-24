import React, { PropTypes } from 'react';
import PoemSummary from './PoemSummary';

const PoemList = ({ data }) => {
  const poemNodes = data.map(poem => (
    <PoemSummary poem={poem} key={poem.id} />
  ));
  return (
    <div className="poemList" id="mainPoemList">
      {poemNodes}
    </div>
  );
};

PoemList.propTypes = {
  data: PropTypes.arrayOf(PoemSummary.propTypes.poem).isRequired,
};

export default PoemList;
