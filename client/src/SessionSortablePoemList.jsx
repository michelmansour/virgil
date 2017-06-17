import React, { PropTypes } from 'react';
import PoemSummary from './PoemSummary';

const SessionSortablePoemList = ({ session, poems }) => {
  const poemNodes = session.poems.map((poemId) => {
    const poem = poems.filter(p => p.id === poemId)[0];
    if (poem) {
      return <PoemSummary poem={poem} key={poem.id} />;
    }
    return null;
  });
  return (
    <div className="poemList" id="activeSessionPoemList">
      {poemNodes}
    </div>
  );
};

SessionSortablePoemList.propTypes = {
  session: PropTypes.shape({
    poems: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  poems: PropTypes.arrayOf(PoemSummary.propTypes.poem).isRequired,
};

export default SessionSortablePoemList;
