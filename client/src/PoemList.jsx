import React, { PropTypes } from 'react';
import PoemSummary from './PoemSummary';

const PoemList = ({ listId, data }) => {
  const poemNodes = data.map(poem => (
    <PoemSummary poem={poem} key={poem.id} />
  ));
  return (
    <div className="poemList" id={listId}>
      {poemNodes}
    </div>
  );
};

PoemList.propTypes = {
  listId: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PoemSummary.propTypes.poem).isRequired,
};

export default PoemList;
