import React, { PropTypes } from 'react';
import CommentBox from './CommentBox';

const PoemLine = ({ line }) => (
  <div className="poemLine">
    {line}
  </div>
);

PoemLine.propTypes = {
  line: PropTypes.string,
};

const Poem = ({ poem }) => {
  const poemLineNodes = poem.text.split(/\n/).map((line, index) => {
    const NBSP = '\u00A0'; // Unicode value for non-breaking space
    return <PoemLine line={(line.trim().length === 0) ? NBSP : line} key={index} />;
  });
  return (
    <div className="poem">
      <h2 className="poemTitle">
        {poem.title}
      </h2>
      <p><em>by</em> {poem.author}</p>
      <div className="poemText">
        {poemLineNodes}
      </div>
      <CommentBox url={`/api/comments/${poem.id}`} pollInterval={2000} />
      <hr />
    </div>
  );
};

Poem.propTypes = {
  poem: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
};

export default Poem;
