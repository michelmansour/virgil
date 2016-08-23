import React, { PropTypes } from 'react';
import $ from 'jquery';
import AddCommentForm from './AddCommentForm';
import CommentList from './CommentList';

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount = () => {
    this.loadComments();
    setInterval(this.loadComments, this.props.pollInterval);
  }

  loadComments = () => {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: (data) => {
        this.setState({ data });
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      },
    });
  }

  handleCommentSubmit = (comment) => {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(comment),
      success: (data) => {
        this.setState({ data });
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      },
    });
  }

  render = () => (
    <div className="commentBox">
      <h2>Comments</h2>
      <CommentList data={this.state.data} />
      <AddCommentForm onCommentSubmit={this.handleCommentSubmit} />
    </div>
  )
}

CommentBox.propTypes = {
  pollInterval: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};

export default CommentBox;
