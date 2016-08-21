import React from 'react';
import Sortable from 'sortablejs';
import $ from 'jquery';
import PoemList from './PoemList';
import AddPoemForm from './AddPoemForm';

var PoemBox = React.createClass({
  getInitialState: function () {
    return {data: []};
  },
  loadPoems: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  },
  handlePoemSubmit: function (poem) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: poem,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  savePoems: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: {poems: this.state.data},
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function () {
    this.loadPoems();
    setInterval(this.loadPoems, this.props.pollInterval);
    var el = document.getElementById('mainPoemList');
    Sortable.create(el, {
      onUpdate: function (evt) {
        let reordering = this.state.data.slice();
        let movedPoem = reordering.splice(evt.oldIndex, 1);
        reordering.splice(evt.newIndex, 0, ...movedPoem);
        this.setState({data: reordering});
        this.savePoems();
      }.bind(this)
    });
  },
  render: function () {
    return (
      <div className="poemBox">
        <h1>Poem List</h1>
        <PoemList data={this.state.data} />
        <AddPoemForm onPoemSubmit={this.handlePoemSubmit} />
      </div>
    );
  }
});

export default PoemBox;
