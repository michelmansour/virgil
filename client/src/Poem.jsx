import React, { PropTypes } from 'react';

const PoemLine = ({ line }) => (
  <div className="poemLine">
    {line}
  </div>
);

PoemLine.propTypes = {
  line: PropTypes.string,
};

const NBSP = '\u00A0'; // Unicode value for non-breaking space

PoemLine.defaultProps = {
  line: NBSP,
};

const Poem = ({ poem }) => {
  const poemLineNodes = poem.text.split(/\n/).map((line, index) =>
    // Poem lines will have database IDs. Until then, re-use index.
    // eslint-disable-next-line react/no-array-index-key
    <PoemLine line={(line.trim().length === 0) ? NBSP : line} key={index} />
  );
  return (
    <div className="poem">
      <h2 className="poemTitle">
        {poem.title}
      </h2>
      <p className="byLine"><em>by</em> {poem.author}</p>
      <div className="poemText">
        {poemLineNodes}
      </div>
    </div>
  );
};

Poem.propTypes = {
  poem: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Poem;
