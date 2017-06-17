import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const PoemSummary = ({ poem }) => (
  <li data-id={poem.id}>
    <span className="poemSummaryItem">
      <Link to={`/poem/${poem.id}`}>{poem.title}</Link> <em>by</em> {poem.author}
    </span>
  </li>
);

PoemSummary.propTypes = {
  poem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
};

export default PoemSummary;
