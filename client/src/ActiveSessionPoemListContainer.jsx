import React, { PropTypes } from 'react';
import Sortable from 'sortablejs';
import { requestWithAuth } from './auth';
import SessionSortablePoemList from './SessionSortablePoemList';

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
    const el = document.getElementById('activeSessionPoemList');
    Sortable.create(el, {
      onUpdate: (evt) => {
        const reordering = this.state.session.poems.slice();
        const movedPoem = reordering.splice(evt.oldIndex, 1);
        reordering.splice(evt.newIndex, 0, ...movedPoem);
        this.setState({
          session: {
            ...this.state.session,
            poems: reordering,
          },
        });
        this.saveSession();
      },
    });
  }

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  }

  loadActiveSession = () => {
    requestWithAuth({
      url: `${this.props.route.url}/session/active`,
      dataType: 'json',
      cache: false,
      success: (data) => this.setState({ session: data }),
      error: (xhr, status, err) => console.error(`${this.props.route.url}/session/active`, status, err.toString()),
    });
  }

  saveSession = () => {
    requestWithAuth({
      url: `${this.props.route.url}/session`,
      dataType: 'json',
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({
        session: {
          ...this.state.session,
          poems: this.state.session.poems.map((p) => p.id),
        },
      }),
      success: this.loadActiveSession,
      error: (xhr, status, err) => console.error(`${this.props.route.url}/session`, status, err.toString()),
    });
  }

  render = () => (
    <div className="activeSessionPoemListContainer">
      <SessionSortablePoemList session={this.state.session} poems={this.state.session.poems} />
    </div>
  )
}

ActiveSessionPoemListContainer.propTypes = {
  route: PropTypes.shape({
    pollInterval: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
  }),
};

export default ActiveSessionPoemListContainer;
