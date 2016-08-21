import React, { PropTypes } from 'react';

const PoemLine = ({ line }) => (
  <div className="poemLine">
    {line}
  </div>
);

const Poem = ({ poem }) => {
  var poemLineNodes = poem.text.split(/\n/).map(function (line, index) {
    return (
      <PoemLine line={line} key={index} />
    );
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
    </div>
  );
};

Poem.propTypes = {
  poem: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  })
}

export default Poem;
