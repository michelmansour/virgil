import React, { PropTypes } from 'react';

class AddPoemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      collection: '',
      text: '',
    };
  }

  handleTitleChange = (evt) => {
    this.setState({ title: evt.target.value });
  }

  handlePoetChange = (evt) => {
    this.setState({ author: evt.target.value });
  }

  handleCollectionChange = (evt) => {
    this.setState({ collection: evt.target.value });
  }

  handleTextChange = (evt) => {
    this.setState({ text: evt.target.value });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const title = this.state.title.trim();
    const author = this.state.author.trim();
    const text = this.state.text;
    const collection = this.state.collection.trim();
    if (!title || !author || !text) {
      return;
    }
    this.props.onPoemSubmit({ title, author, collection, text });
    this.setState({ title: '', author: '', collection: '', text: '' });
  }

  render = () => (
    <form className="poemForm" onSubmit={this.handleSubmit}>
      <input type="text" placeholder="Title..." value={this.state.title} onChange={this.handleTitleChange} />
      <input type="text" placeholder="Poet..." value={this.state.author} onChange={this.handlePoetChange} />
      <input
        type="text"
        placeholder="Collection..."
        value={this.state.collection}
        onChange={this.handleCollectionChange}
      />
      <div className="poemTextArea">
        <textarea rows="10" placeholder="Begin..." value={this.state.text} onChange={this.handleTextChange} />
      </div>
      <input type="submit" value="Post" />
    </form>
  )
}

AddPoemForm.propTypes = {
  onPoemSubmit: PropTypes.func.isRequired,
};

export default AddPoemForm;
