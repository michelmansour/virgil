import React, { PropTypes } from 'react';
import { requestWithAuth } from './auth';
import PoemListContainer from './PoemListContainer';

class PoemSummaryFetcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poems: [],
      intervalId: -1,
    };
  }

  componentDidMount = () => {
    this.loadPoemSummaries();
    this.state.intervalId = setInterval(this.loadPoemSummaries, this.props.route.pollInterval);
  }

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  }

  loadPoemSummaries = () =>
    Promise.all(this.props.queue.map(poemId =>
      requestWithAuth({
        url: `${this.props.route.url}/poem/${poemId}`,
        dataType: 'json',
        cache: false,
        success: data => data,
        error: (xhr, status, err) => {
          console.error(`${this.props.route.url}/poem/${poemId}`, status, err.toString());
        },
      }))).then(poems => this.setState({ poems }));

  render = () => (
    <PoemListContainer
      poems={this.state.poems}
      saveQueue={this.props.saveQueue} listId={this.props.listId}
    />
  )
}

PoemSummaryFetcher.propTypes = {
  listId: PropTypes.string.isRequired,
  queue: PropTypes.arrayOf(PropTypes.number).isRequired,
  saveQueue: PropTypes.func.isRequired,
  route: PropTypes.shape({
    pollInterval: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default PoemSummaryFetcher;
