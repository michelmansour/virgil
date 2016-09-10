import React, { PropTypes } from 'react';
import Sortable from 'react-sortablejs';
import { requestWithAuth } from './auth';
import PoemSummary from './PoemSummary';

class PoemListContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      poemSummaries: [],
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

  loadPoemSummaries = () => {
    Promise.all(this.props.poems.map(poemId =>
      requestWithAuth({
        url: `${this.props.route.url}/poem/${poemId}`,
        dataType: 'json',
        cache: false,
        success: data => data,
        error: (xhr, status, err) => {
          console.error(`${this.props.route.url}/poem/${poemId}`, status, err.toString());
        },
      }))).then(poemSummaries => this.setState({ poemSummaries }));
  }

  render = () => {
    const poemNodes = this.state.poemSummaries.map(poem => (
      <PoemSummary poem={poem} key={poem.id} data-id={poem.id} />
    ));
    return (
      <div className="poemBox">
        <Sortable
          options={{
            group: 'poem-target',
          }}
          onChange={(order) => {
            const orderMap = {};
            order.forEach((poemId, i) => {
              orderMap[poemId] = i;
            });
            this.props.saveQueue(orderMap);
          }}
        >
          {poemNodes}
        </Sortable>
      </div>
    );
  }
}

PoemListContainer.propTypes = {
  poems: PropTypes.arrayOf(PropTypes.number).isRequired,
  saveQueue: PropTypes.func.isRequired,
  route: PropTypes.shape({
    pollInterval: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default PoemListContainer;
