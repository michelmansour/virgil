import React, { PropTypes } from 'react';
import Sortable from 'sortablejs';
import $ from 'jquery';
import PoemList from './PoemList';
import AddPoemForm from './AddPoemForm';

class PoemBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount = () => {
    this.loadPoems();
    setInterval(this.loadPoems, this.props.pollInterval);
    const el = document.getElementById('mainPoemList');
    Sortable.create(el, {
      onUpdate: (evt) => {
        const reordering = this.state.data.slice();
        const movedPoem = reordering.splice(evt.oldIndex, 1);
        reordering.splice(evt.newIndex, 0, ...movedPoem);
        this.setState({ data: reordering });
        this.savePoems();
      },
    });
  }

  loadPoems = () => {
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

  handlePoemSubmit = (poem) => {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(poem),
      success: (data) => {
        this.setState({ data });
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      },
    });
  }

  savePoems = () => {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ poems: this.state.data }),
      success: (data) => {
        this.setState({ data });
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      },
    });
  }

  render = () => (
    <div className="poemBox">
      <h1>Poem List</h1>
      <PoemList data={this.state.data} />
      <AddPoemForm onPoemSubmit={this.handlePoemSubmit} />
    </div>
  )
}

PoemBox.propTypes = {
  pollInterval: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};

export default PoemBox;
