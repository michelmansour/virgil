import React, { PropTypes } from 'react';

const Comment = ({ comment }) => (
  <div className="comment">
    <h3 className="commentAuthor">
      {comment.author}
    </h3>
    {comment.text}
  </div>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isrequired,
  }).isRequired,
};

export default Comment;
