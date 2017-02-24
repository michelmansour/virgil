import React, { PropTypes } from 'react';
import Sortable from 'sortablejs';
import { requestWithAuth } from './auth';
import PoemList from './PoemList';

class PoemListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      intervalId: -1,
    };
  }

  componentDidMount = () => {
    this.loadPoems();
    this.state.intervalId = setInterval(this.loadPoems, this.props.route.pollInterval);
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

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  }

  loadPoems = () => {
    requestWithAuth({
      url: `${this.props.route.url}/poem`,
      dataType: 'json',
      cache: false,
      success: (data) => {
        this.setState({ data });
      },
      error: (xhr, status, err) => {
        console.error(this.props.route.url, status, err.toString());
      },
    });
  }

  savePoems = () => {
    requestWithAuth({
      url: `${this.props.route.url}/poem`,
      dataType: 'json',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ poems: this.state.data }),
      success: (data) => {
        this.setState({ data });
      },
      error: (xhr, status, err) => {
        console.error(this.props.route.url, status, err.toString());
      },
    });
  }

  render = () => (
    <div className="poemBox">
      <PoemList data={this.state.data} />
    </div>
  )
}

PoemListContainer.propTypes = {
  route: PropTypes.shape({
    pollInterval: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default PoemListContainer;
