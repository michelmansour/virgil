import React, { PropTypes } from 'react';
import Comment from './Comment';

const CommentList = ({ data }) => {
  const commentNodes = data.map((comment) => (
    <Comment comment={comment} key={comment.id} />
  ));
  return (
    <div className="commentList">
      {commentNodes}
    </div>
  );
};

CommentList.propTypes = {
  data: PropTypes.arrayOf(Comment.propTypes.comment).isRequired,
};

export default CommentList;
