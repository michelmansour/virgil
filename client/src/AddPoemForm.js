import React from 'react';

var AddPoemForm = React.createClass({
  getInitialState: function () {
    return {
      title: '',
      author: '',
      collection: '',
      text: ''
    };
  },
  handleTitleChange: function (e) {
    this.setState({title: e.target.value});
  },
  handlePoetChange: function (e) {
    this.setState({author: e.target.value});
  },
  handleCollectionChange: function (e) {
    this.setState({collection: e.target.value});
  },
  handleTextChange: function (e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var title = this.state.title.trim();
    var author = this.state.author.trim();
    var text = this.state.text;
    var collection = this.state.collection.trim();
    if (!title || !author || !text) {
      return;
    }
    this.props.onPoemSubmit({title: title, author: author, collection: collection, text: text});
    this.setState({title: '', author: '', collection: '', text: ''});
  },
  render: function () {
    return (
      <div className="poemFormDiv">
        <h2>Contribute a Poem</h2>
        <form className="poemForm" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Title..." value={this.state.title} onChange={this.handleTitleChange} />
          <input type="text" placeholder="Poet..." value={this.state.author} onChange={this.handlePoetChange} />
          <input type="text" placeholder="Collection..." value={this.state.collection} onChange={this.handleCollectionChange} />
          <div className="poemTextArea">
            <textarea rows="10" placeholder="Begin..." value={this.state.text} onChange={this.handleTextChange} />
          </div>
          <input type="submit" value="Post" />
        </form>
      </div>
    );
  }
});

export default AddPoemForm;
