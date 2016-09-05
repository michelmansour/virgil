import React, { PropTypes } from 'react';
import { requestWithAuth } from './auth';
import AddCommentForm from './AddCommentForm';
import CommentList from './CommentList';

class CommentListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      intervalId: -1,
    };
  }

  componentDidMount = () => {
    this.loadComments();
    this.state.intervalId = setInterval(this.loadComments, this.props.pollInterval);
  };

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  };

  loadComments = () => {
    requestWithAuth({
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
  };

  handleCommentSubmit = (comment) => {
    requestWithAuth({
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

CommentListContainer.propTypes = {
  pollInterval: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};

export default CommentListContainer;
