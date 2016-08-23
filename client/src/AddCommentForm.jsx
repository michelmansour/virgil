import React, { PropTypes } from 'react';

class AddCommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      text: '',
    };
  }

  handleAuthorChange = (evt) => {
    this.setState({ author: evt.target.value });
  }

  handleTextChange = (evt) => {
    this.setState({ text: evt.target.value });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const author = this.state.author.trim();
    const text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({ author, text });
    this.setState({ author: '', text: '' });
  }

  render = () => (
    <form className="commentForm" onSubmit={this.handleSubmit}>
      <input
        type="text"
        placeholder="Your name..."
        value={this.state.author}
        onChange={this.handleAuthorChange}
      />
      <div className="commentTextArea">
        <textarea
          rows="10"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
      </div>
      <input type="submit" value="Post" />
    </form>
  );
}

AddCommentForm.propTypes = {
  onCommentSubmit: PropTypes.func.isRequired,
};

export default AddCommentForm;
