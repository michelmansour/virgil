import React, { PropTypes } from 'react';
import { requestWithAuth } from './auth';
import PoemSummaryFetcher from './PoemSummaryFetcher';

class ActiveSessionPoemListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: {
        poems: [],
      },
      intervalId: -1,
    };
  }

  componentDidMount = () => {
    this.loadActiveSession();
    this.state.intervalId = setInterval(this.loadActiveSession, this.props.route.pollInterval);
  }

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
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

  saveSession = (poems) => {
    requestWithAuth({
      url: `${this.props.route.url}/session`,
      dataType: 'json',
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({
        session: {
          ...this.state.session,
          poems,
        },
      }),
      success: (data) => {
        this.setState({ session: data });
      },
      error: (xhr, status, err) => {
        console.error(this.props.route.url, status, err.toString());
      },
    });
  }

  render = () => (
    <PoemSummaryFetcher
      listId="sessionList"
      queue={this.state.session.poems}
      saveQueue={this.saveSession}
      route={this.props.route}
    />
  )
}

ActiveSessionPoemListContainer.propTypes = {
  route: PropTypes.shape({
    pollInterval: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ActiveSessionPoemListContainer;
