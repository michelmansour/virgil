import React, { PropTypes } from 'react';
import { requestWithAuth } from './auth';
import PoemSummaryFetcher from './PoemSummaryFetcher';

class PoemListQueueFetcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: [],
      intervalId: -1,
    };
  }

  componentDidMount = () => {
    this.loadQueue();
    this.state.intervalId = setInterval(this.loadQueue, this.props.route.pollInterval);
  }

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  }

  loadQueue = () => {
    requestWithAuth({
      url: `${this.props.route.url}/queue`,
      dataType: 'json',
      cache: false,
      success: (data) => {
        this.setState({ queue: data[0].queue });
      },
      error: (xhr, status, err) => {
        console.error(this.props.route.url, status, err.toString());
      },

    });
  }

  saveQueue = (queue) => {
    requestWithAuth({
      url: `${this.props.route.url}/queue`,
      dataType: 'json',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ queue }),
      success: (data) => {
        this.setState({ queue: data });
      },
      error: (xhr, status, err) => {
        console.error(this.props.route.url, status, err.toString());
      },
    });
  }

  render = () => (
    <PoemSummaryFetcher
      listId="queueList"
      queue={this.state.queue}
      saveQueue={this.saveQueue}
      route={this.props.route}
    />
  )
}

PoemListQueueFetcher.propTypes = {
  route: PropTypes.shape({
    pollInterval: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default PoemListQueueFetcher;
