import React, { PropTypes } from 'react';
import { requestWithAuth } from './auth';
import PoemListContainer from './PoemListContainer';

class PoemQueuesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: {
        poems: [],
      },
      queue: [],
      sessionIntervalId: -1,
      queueIntervalId: -1,
    };
  }

  componentDidMount = () => {
    this.loadActiveSession();
    this.loadQueue();
    this.state.sessionIntervalId = setInterval(this.loadActiveSession, this.props.route.pollInterval);
    this.state.queueIntervalId = setInterval(this.loadQueue, this.props.route.pollInterval);
  }

  componentWillUnmount = () => {
    clearInterval(this.state.sessionIntervalId);
    clearInterval(this.state.queueIntervalId);
  }

  onSessionChange = (order) => {
    const newOrder = this.getNewPoemOrder(order);
    this.setState({
      session: {
        ...this.state.session,
        poems: newOrder,
      },
    });
    this.saveSession();
  }

  onQueueChange = (order) => {
    const newOrder = this.getNewPoemOrder(order);
    this.setState({ queue: newOrder });
    this.saveQueue();
  }

  getNewPoemOrder = (order) => {
    const newOrder = new Array(order.length);
    Object.keys(order).map(x => parseInt(x, 10)).forEach(poemId => (newOrder[order[poemId]] = poemId));
    return newOrder;
  }

  loadActiveSession = () => {
    requestWithAuth({
      url: `${this.props.route.url}/session`,
      dataType: 'json',
      cache: false,
      success: (data) => {
        this.setState({ session: data[0] });
      },
      error: (xhr, status, err) => {
        console.error(`${this.props.route.url}/session`, status, err.toString());
      },
    });
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

  saveSession = () => {
    requestWithAuth({
      url: `${this.props.route.url}/session`,
      dataType: 'json',
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({ session: this.state.session }),
      success: (data) => {
        this.setState({ session: data });
      },
      error: (xhr, status, err) => {
        console.error(this.props.route.url, status, err.toString());
      },
    });
  }

  saveQueue = () => {
    requestWithAuth({
      url: `${this.props.route.url}/queue`,
      dataType: 'json',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ queue: this.state.queue }),
      success: (data) => {
        this.setState({ queue: data });
      },
      error: (xhr, status, err) => {
        console.error(this.props.route.url, status, err.toString());
      },
    });
  }

  render = () => (
    <div className="poemQueuesContainer">
      <h1>Current Session</h1>
      <PoemListContainer
        listId="sessionList"
        poems={this.state.session.poems}
        saveQueue={this.onSessionChange}
        route={this.props.route}
      />
      <h1>Poem Queue</h1>
      <PoemListContainer
        listId="poemQueue"
        poems={this.state.queue}
        saveQueue={this.onQueueChange}
        route={this.props.route}
      />
    </div>
  )
}

PoemQueuesContainer.propTypes = {
  route: PropTypes.shape({
    pollInterval: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default PoemQueuesContainer;
