import React, { PropTypes } from 'react';
import { requestWithAuth } from './auth';
import PoemQueuesContainer from './PoemQueuesContainer';
import AddPoemForm from './AddPoemForm';

class Home extends React.Component {
  handlePoemSubmit = (poem) => {
    requestWithAuth({
      url: `${this.props.route.url}/poem`,
      dataType: 'json',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(poem),
      success: (data) => {
        this.setState({ data });
      },
      error: (xhr, status, err) => {
        console.error(`${this.props.route.url}/poem`, status, err.toString());
      },
    });
  }

  render = () => (
    <div className="home">
      <PoemQueuesContainer route={this.props.route} />
      <h1>Contribute a Poem</h1>
      <AddPoemForm onPoemSubmit={this.handlePoemSubmit} />
    </div>
  )
}

Home.propTypes = {
  route: PropTypes.shape({
    pollInterval: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Home;
