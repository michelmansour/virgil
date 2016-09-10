import React, { PropTypes } from 'react';
import PoemSummary from './PoemSummary';

const SessionSortablePoemList = ({ poems }) => {
  if (poems) {
    const poemNodes = poems.map((poem) => <PoemSummary poem={poem} key={poem.id} />);
    return (
      <div className="poemList" id="activeSessionPoemList">
        {poemNodes}
      </div>
    );
  }
  return null;
};

SessionSortablePoemList.propTypes = {
  session: PropTypes.object.isRequired,
  poems: PropTypes.arrayOf(PoemSummary.propTypes.poem).isRequired,
};

export default SessionSortablePoemList;
